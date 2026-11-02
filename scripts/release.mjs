// Publish a plugin version as a GitHub Release and point its page at it.
//
//   npm run release -- easy-crt             (add --dry-run to only build the zip)
//   npm run release -- easy-complete        (rebuild the all-plugins bundle on its own)
//
// Takes the single .setting in public/downloads/<slug>/, zips it under its own
// name (Release assets cannot keep spaces, a zip can), creates the release
// <slug>-v<version> with that version's changelog notes, then rewrites the
// download, fileName and fileSize lines of src/content/plugins/<slug>.md.
// GitHub counts each download of the zip; the plugin page shows the total.
//
// Every plugin release then rebuilds Easy Complete, the zip of every free
// plugin, as the next numbered release, and records it in
// src/data/easy-complete.json for the plugins page (--no-bundle skips that).

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { crc32, deflateRawSync } from 'node:zlib';
import { parse } from 'yaml';

const REPO = 'MatheusFrazatto/TheEditingLair';
const SITE = 'https://matheusfrazatto.github.io/TheEditingLair';
const BUNDLE = { slug: 'easy-complete', title: 'Easy Complete', data: 'src/data/easy-complete.json' };
const PLUGINS = 'src/content/plugins';

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
if (!slug) {
  console.error('Usage: npm run release -- <plugin-slug> [--dry-run] [--no-bundle]');
  process.exit(1);
}

if (slug === BUNDLE.slug) {
  releaseBundle();
} else {
  releasePlugin(slug);
  if (!args.includes('--no-bundle')) releaseBundle();
}

function releasePlugin(slug) {
  const pagePath = join(PLUGINS, `${slug}.md`);
  const page = readFileSync(pagePath, 'utf8');
  const { title, version, changelog = [] } = frontmatter(page);
  const settingName = settingOf(slug);

  const tag = `${slug}-v${version}`;
  const zipName = `${title.replace(/\s+/g, '-')}-v${version}.zip`;
  const zipPath = writeZip(zipName, [{ name: settingName, data: readFileSync(join('public/downloads', slug, settingName)) }]);

  const entry = changelog.find((c) => String(c.version) === String(version));
  const notes = `${entry?.notes ?? `${title} ${version}.`}\n\nUnzip it to get \`${settingName}\`, then follow the install steps on ${SITE}/plugins/${slug}/`;

  if (!publish(tag, zipPath, `${title} ${version}`, notes)) return;

  const kb = sizeKb(zipPath);
  const updated = page
    .replace(/^(\s+download:).*$/m, `$1 ${assetUrl(tag, zipName)}`)
    .replace(/^(\s+fileName:).*$/m, `$1 ${zipName}`)
    .replace(/^(\s+fileSize:).*$/m, `$1 ${kb} KB`);
  writeFileSync(pagePath, updated);
  console.log(`\n${pagePath} now downloads ${zipName} (${kb} KB) from ${tag}.`);
}

function releaseBundle() {
  // every published free plugin; paid files never leave their store
  const plugins = readdirSync(PLUGINS)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ id: f.slice(0, -3), ...frontmatter(readFileSync(join(PLUGINS, f), 'utf8')) }))
    .filter((p) => !p.draft && p.access?.kind === 'free')
    .sort((a, b) => new Date(a.released) - new Date(b.released));

  const previous = existsSync(BUNDLE.data) ? JSON.parse(readFileSync(BUNDLE.data, 'utf8')) : null;
  const version = (previous?.version ?? 0) + 1;
  const tag = `${BUNDLE.slug}-v${version}`;
  const zipName = `${BUNDLE.title.replace(/\s+/g, '-')}-v${version}.zip`;
  const files = plugins.map((p) => {
    const name = settingOf(p.id);
    return { name, data: readFileSync(join('public/downloads', p.id, name)) };
  });
  const zipPath = writeZip(zipName, files);

  const studio = plugins.filter((p) => p.compatibility?.edition === 'studio').map((p) => p.title);
  const notes = [
    'Every free plugin on The Editing Lair in one zip:',
    '',
    ...plugins.map((p) => `- ${p.title} ${p.version}${p.compatibility?.edition === 'studio' ? ' (needs Resolve Studio)' : ''}`),
    '',
    `Unzip it to get the .setting files, then follow ${SITE}/notes/how-to-install-fusion-macros/`,
  ].join('\n');

  if (!publish(tag, zipPath, `${BUNDLE.title} ${version}`, notes)) return;

  const record = {
    title: BUNDLE.title,
    version,
    released: new Date().toISOString().slice(0, 10),
    download: assetUrl(tag, zipName),
    fileName: zipName,
    fileSize: `${sizeKb(zipPath)} KB`,
    studio,
    contents: plugins.map((p) => ({ id: p.id, title: p.title, version: String(p.version) })),
  };
  writeFileSync(BUNDLE.data, `${JSON.stringify(record, null, 2)}\n`);
  console.log(`\n${BUNDLE.data} now points at ${zipName} (${record.fileSize}) from ${tag}.`);
}

/** Creates the release; false on a dry run. */
function publish(tag, zipPath, title, notes) {
  if (dryRun) {
    console.log(`Dry run: ${zipPath}\nWould create ${tag} with notes:\n${notes}\n`);
    return false;
  }
  execFileSync('gh', ['release', 'create', tag, zipPath, '-R', REPO, '--target', 'main', '--title', title, '--notes', notes], {
    stdio: 'inherit',
  });
  return true;
}

function frontmatter(page) {
  return parse(page.split(/^---\s*$/m)[1]);
}

function settingOf(slug) {
  const dir = join('public/downloads', slug);
  const settings = readdirSync(dir).filter((f) => f.endsWith('.setting'));
  if (settings.length !== 1) {
    console.error(`Expected exactly one .setting in ${dir}, found ${settings.length}.`);
    process.exit(1);
  }
  return settings[0];
}

function writeZip(zipName, files) {
  const zipPath = join(mkdtempSync(join(tmpdir(), 'tel-release-')), zipName);
  writeFileSync(zipPath, zip(files));
  return zipPath;
}

function assetUrl(tag, name) {
  return `https://github.com/${REPO}/releases/download/${tag}/${name}`;
}
function sizeKb(path) {
  return Math.max(1, Math.round(statSync(path).size / 1024));
}

/** A zip archive of the given files, deflated, at the archive root. */
function zip(files) {
  // DOS date/time for the archive entries: now
  const d = new Date();
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  const UTF8 = 0x0800;

  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const { name, data } of files) {
    const nameBuf = Buffer.from(name, 'utf8');
    const body = deflateRawSync(data, { level: 9 });
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(UTF8, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(UTF8, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(date, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);

    locals.push(local, nameBuf, body);
    centrals.push(central, nameBuf);
    offset += local.length + nameBuf.length + body.length;
  }

  const centralBuf = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, centralBuf, end]);
}
