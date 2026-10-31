import { animate, createAnimatable, createTimeline, splitText, stagger, utils } from 'animejs';

type Tilt = ReturnType<typeof createAnimatable>;

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Fonts and images in, or `max` ms, whichever comes first. */
function pageReady(max: number) {
  const loaded = new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else addEventListener('load', () => resolve(), { once: true });
  });
  return Promise.race([
    Promise.all([document.fonts?.ready, loaded]),
    new Promise((resolve) => setTimeout(resolve, max)),
  ]);
}

/* ── Intro: the print develops, then the ramp becomes the masthead ───────── */
function playIntro(): Promise<void> {
  const overlay = document.querySelector<HTMLElement>('[data-intro-overlay]');
  if (!overlay || root.dataset.intro !== 'play') {
    overlay?.remove();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const bars = Array.from(overlay.querySelectorAll<HTMLElement>('.intro__bar'));
    const labels = bars.map((bar) => bar.querySelector('b')!);
    const ramp = overlay.querySelector<HTMLElement>('[data-intro-ramp]')!;
    const center = overlay.querySelector<HTMLElement>('[data-intro-center]')!;
    const timer = overlay.querySelector<HTMLElement>('[data-intro-timer]')!;
    const name = overlay.querySelector<HTMLElement>('[data-intro-name]')!;
    const skipHint = overlay.querySelector<HTMLElement>('.intro__skip');
    const { chars } = splitText(name, { chars: true });
    const clock = { s: 0 };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.dataset.intro = 'done';
      overlay.remove();
      resolve();
    };
    // the page starts entering as soon as the ramp starts to lift
    const reveal = () => {
      root.dataset.intro = 'lifting';
      resolve();
    };

    const develop = createTimeline({ defaults: { ease: 'outQuad' } })
      .add(chars, { opacity: [0.05, 1], duration: 560, delay: stagger(26) }, 0)
      .add(labels, { opacity: [0, 1], duration: 320, delay: stagger(55) }, 320);
    // each zone develops to its own tone, darkest first
    bars.forEach((bar, i) => develop.add(bar, { backgroundColor: bar.dataset.tone!, duration: 460 }, 140 + i * 55));
    develop
      .add(
        clock,
        {
          s: 8,
          duration: 1080,
          ease: 'linear',
          onUpdate: () => {
            timer.textContent = clock.s.toFixed(1).padStart(4, '0');
          },
        },
        140,
      );

    const collapse = () => {
      if (finished) return;
      reveal();
      const wedge = document.querySelector<HTMLElement>('.wedge');
      const toMasthead = wedge && matchMedia('(min-width: 761px)').matches && scrollY === 0;
      const out = createTimeline({ defaults: { ease: 'outExpo' }, onComplete: finish })
        .add(center, { opacity: 0, translateY: -28, duration: 420 }, 0);
      if (skipHint) out.add(skipHint, { opacity: 0, duration: 200 }, 0);
      if (toMasthead) {
        out
          .add(ramp, { height: wedge!.getBoundingClientRect().height, duration: 760 }, 160)
          .add(overlay, { opacity: 0, duration: 280, ease: 'linear' }, '+=60');
      } else {
        out.add(overlay, { translateY: '-100%', duration: 680 }, 160);
      }
    };

    // never hold the page longer than the print takes to develop + a short wait for assets
    Promise.all([develop.then(), pageReady(900)]).then(collapse);

    const skip = () => {
      if (finished) return;
      develop.pause();
      animate(overlay, { opacity: 0, duration: 220, ease: 'linear', onComplete: finish });
    };
    overlay.addEventListener('click', skip, { once: true });
    addEventListener('keydown', skip, { once: true });
  });
}

/* ── Home: the pile settles, notes slide in, the readout meters up ───────── */
function enterHome() {
  const deck = document.querySelector<HTMLElement>('[data-deck]');
  if (!deck) {
    root.dataset.motion = 'ready';
    return;
  }

  const front = deck.querySelector<HTMLElement>('.card[data-pos="0"] .card__paper');
  const behind = Array.from(deck.querySelectorAll<HTMLElement>('.card[data-pos="1"] .card__paper, .card[data-pos="2"] .card__paper'));
  const notes = Array.from(document.querySelectorAll<HTMLElement>('.side .notes li, .side__more'));
  const meters = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));

  // pin the opening state inline before the CSS hold (html[data-motion="on"]) is released
  if (behind.length) utils.set(behind, { translateY: -46, opacity: 0 });
  if (front) utils.set(front, { translateX: 22, translateY: 38, rotate: -1.4, opacity: 0 });
  if (notes.length) utils.set(notes, { translateX: 18, opacity: 0 });
  meters.forEach((el) => (el.textContent = '0'));
  root.dataset.motion = 'ready';

  const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } });
  if (behind.length) tl.add(behind, { translateY: 0, opacity: 1, delay: stagger(90) }, 0);
  if (front) {
    tl.add(front, { opacity: 1, duration: 360, ease: 'outQuad' }, 80);
    tl.add(front, { translateX: 0, translateY: 0, rotate: 0, ease: 'outBack(1.15)', duration: 1000 }, 80);
  }
  if (notes.length) tl.add(notes, { translateX: 0, opacity: 1, delay: stagger(70), duration: 700 }, 200);

  meters.forEach((el, i) => {
    const target = Number(el.dataset.countTo);
    const decimals = (el.dataset.countTo!.split('.')[1] ?? '').length;
    const suffix = el.dataset.suffix ?? '';
    const meter = { v: 0 };
    tl.add(
      meter,
      {
        v: target,
        duration: 900,
        ease: 'outCubic',
        onUpdate: () => {
          el.textContent = meter.v.toFixed(decimals) + suffix;
        },
      },
      380 + i * 80,
    );
  });
}

/* ── The top sheet tips toward the pointer, lit by the table lamp ────────── */
function tiltTopSheet() {
  const deck = document.querySelector<HTMLElement>('[data-deck]');
  if (!deck || !finePointer) return;

  const springs = new WeakMap<HTMLElement, Tilt>();
  const springFor = (paper: HTMLElement) => {
    let tilt = springs.get(paper);
    if (!tilt) {
      tilt = createAnimatable(paper, { rotateX: 600, rotateY: 600, ease: 'out(3)' });
      springs.set(paper, tilt);
    }
    return tilt;
  };

  let lit: HTMLElement | null = null;
  const settle = () => {
    if (!lit) return;
    const tilt = springFor(lit);
    tilt.rotateX(0, 900, 'outElastic(1, .6)');
    tilt.rotateY(0, 900, 'outElastic(1, .6)');
    lit.classList.remove('is-lit');
    lit = null;
  };

  deck.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const paper = (e.target as HTMLElement).closest<HTMLElement>('.card[data-pos="0"] .card__paper');
    if (!paper || deck.classList.contains('is-dragging')) {
      settle();
      return;
    }
    if (lit && lit !== paper) settle();
    lit = paper;
    const r = paper.getBoundingClientRect();
    const x = utils.clamp((e.clientX - r.left) / r.width, 0, 1);
    const y = utils.clamp((e.clientY - r.top) / r.height, 0, 1);
    const tilt = springFor(paper);
    tilt.rotateY((x - 0.5) * 6);
    tilt.rotateX((0.5 - y) * 4);
    paper.style.setProperty('--gx', `${x * 100}%`);
    paper.style.setProperty('--gy', `${y * 100}%`);
    paper.classList.add('is-lit');
  });
  deck.addEventListener('pointerleave', settle);
  deck.addEventListener('pointerdown', settle);
}

/* ── Rows and lists develop as they scroll into view ─────────────────────── */
function revealOnScroll() {
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!groups.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const items = (entry.target as HTMLElement & { _items?: HTMLElement[] })._items ?? [];
        animate(items, { opacity: [0, 1], translateY: [16, 0], duration: 760, delay: stagger(70), ease: 'outExpo' });
      });
    },
    { threshold: 0.12 },
  );

  groups.forEach((group) => {
    // only what is still below the fold waits; never hide what is already on screen
    if (group.getBoundingClientRect().top < innerHeight * 0.92) return;
    const items = Array.from(group.querySelectorAll<HTMLElement>(group.dataset.reveal || ':scope > *'));
    utils.set(items, { opacity: 0, translateY: 16 });
    (group as HTMLElement & { _items?: HTMLElement[] })._items = items;
    io.observe(group);
  });
}

if (reduceMotion) {
  document.querySelector('[data-intro-overlay]')?.remove();
  delete root.dataset.intro;
  root.dataset.motion = 'ready';
} else {
  revealOnScroll();
  tiltTopSheet();
  playIntro().then(enterHome);
}
