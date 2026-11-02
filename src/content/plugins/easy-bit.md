---
title: Easy Bit
summary: Turns any clip into low-res pixel art in one Fusion macro, with crisp blocks, 4-color palettes, a retro screen look and a choppy low frame-rate feel.
type: fusion-macro
version: 2.0.0
released: 2026-10-31
updated: 2026-11-02
compatibility:
  resolve: "21"
  edition: free
access:
  kind: free
  download: https://github.com/MatheusFrazatto/TheEditingLair/releases/download/easy-bit-v2.0.0/Easy-Bit-v2.0.0.zip
  fileName: Easy-Bit-v2.0.0.zip
  fileSize: 8 KB
features:
  - Crisp blocks at 1080p and 4K
  - 4-color palettes from Lospec
  - Pixel grid and RGB shift
  - The choppy motion of old games
cover: ./images/easy-bit.jpg
coverOriginal: ./images/easy-bit-original.jpg
coverBrightness: 1
coverAlt: The words EASY BIT and BY CADENZY in pale pixel letters over a town square seen from above, reduced to coral and cream pixels on dark teal.
preview:
  video: media/easy-bit/preview.mp4
  poster: ./images/easy-bit-preview.jpg
  credit: "Footage: Sly Cooper trailer."
tags: [pixel, 8-bit, retro, palette]
changelog:
  - version: 2.0.0
    date: 2026-11-02
    notes: "New Screen section with pixel grid, RGB shift, glow and block glitch. Sixteen 4-color palettes from Lospec replace CGA, NES and PICO-8 (projects that used those three will change). Palettes now leave transparent areas empty, so titles keep their alpha. Frame Repeat now defaults to 2."
  - version: 1.0.0
    date: 2026-10-31
    notes: First public release.
---

Easy Bit turns footage into low-resolution pixel art. It shrinks the frame to one pixel per block, reduces the colors, optionally maps them to a 4-color palette, then scales the result back up with hard, crisp edges. A Screen section adds the look of an old display on top, and a frame repeat finishes it with the choppy motion of old games. Everything lives on a single Controls page, grouped in collapsible sections ordered by how often you will touch them.

All the color work happens on the small image, so palette matching stays fast. Pixel Size is scaled to the frame size and always lands on whole pixels, so every block is the same size at 1080p and at 4K.

It also works on titles and other layers with transparency: empty areas stay empty.

## Palettes

Pick **None** to keep your clip's own colors, posterized with Color Steps. Every other option is a 4-color palette. The palettes map tones, not hues: each block's brightness picks one of the four colors, from darkest to lightest, so any clip reads cleanly in any palette. The Tone section is the best way to steer which color lands where.

The 16 new palettes are among the most downloaded 4-color palettes on [Lospec](https://lospec.com/palette-list), credited to their authors where Lospec names one:

| Palette | Credit |
|---|---|
| 2-bit Grayscale | Plain 2-bit grays |
| 2bit Demichrome | Space Sandwich |
| AYY4 | Polyducks |
| BLK AQU4 | BurakoIRL |
| Crimson | WildLeoKnight |
| Game Boy | The 4 greens of the original Game Boy screen |
| Hollow | Poltergasm |
| Ice Cream GB | Kerrie Lake |
| Kirokaze Gameboy | Kirokaze |
| Lava-GB | Aero |
| Mist GB | Kerrie Lake |
| Moonlight GB | Tofu |
| Nostalgia | WildLeoKnight |
| Pokemon (SGB) | The Super Game Boy colors of Pokémon |
| Rustic GB | Kerrie Lake |
| SpaceHaze | WildLeoKnight |
| Velvet Cherry GB | Klafooty |

Game Boy works a little differently: each block takes the nearest of its four greens instead of following brightness.

## Screen

The Screen section adds an old-display look on top of the pixels. Every option is off until you turn it up.

- **Pixel Grid** draws thin dark lines between the blocks, like the gaps between the pixels of an old LCD.
- **RGB Shift** pulls red and blue apart by whole pixels for a color fringe.
- **Glow** makes the bright blocks bleed light.
- **Glitch** makes bands of rows jump sideways now and then. It moves whole blocks, so the image stays crisp, and follows Frame Repeat.

## Texture

**Clean** averages every block, for smooth, even areas of color. **Gritty** takes the color from the center of each block instead, which keeps more contrast and noise, closer to a raw, punchy pixel look.

## Controls

| Section | Control | What it does | Default |
|---|---|---|---|
| | Mix | Blends the pixel look with the clean image | 1 |
| Pixel | Pixel Size | Size of each block | 6 |
| Pixel | Texture | Clean (averaged blocks) or Gritty (sampled blocks) | Clean |
| Pixel | Smoothness | Blur applied before pixelating | 0 |
| Color | Palette | None, or one of the 17 palettes above | None |
| Color | Color Steps | Number of color levels when Palette is None | 3 |
| Color | Color Mix | How much of the clip's original color returns after posterizing | 1 |
| Screen | Pixel Grid | Turns the grid between blocks on | Off |
| Screen | Grid Thickness | Width of the grid lines, as a share of the block | 0.2 |
| Screen | Grid Darkness | How dark the grid lines are | 1 |
| Screen | RGB Shift | Distance between the red and blue channels | 0 |
| Screen | Glow | Strength of the glow around bright blocks | 0 |
| Screen | Glow Size | How far the glow spreads | 10 |
| Screen | Glitch | How often and how far bands jump | 0 |
| Screen | Glitch Size | Height of each band, in blocks | 2 |
| Motion | Frame Repeat | Holds each frame for this many frames | 2 |
| Tone | Brightness, Contrast, Gamma, Saturation | Grade applied before pixelating | 0, 0, 1, 1 |

Tone starts collapsed; click a section name in the Inspector to open it. Set Frame Repeat to 1 to keep the original motion.

## Performance

Easy Bit is heavy at 4K, more so with the Screen options on. While you edit, turn on **Render Cache Fusion Output** for the clip (right-click it on the timeline), or lower **Playback → Timeline Proxy Resolution**. The final render still uses full resolution.

## Install

1. Download the zip and unzip it to get `Easy Bit.setting`.
2. Copy it into your Fusion Macros folder:
   - Windows: `%AppData%\Blackmagic Design\DaVinci Resolve\Support\Fusion\Macros`
   - macOS: `~/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Macros`
   - Linux: `~/.local/share/DaVinciResolve/Fusion/Macros`
3. To use it on the Edit page too, also copy it into the Edit effects folder:
   - Windows: `%AppData%\Blackmagic Design\DaVinci Resolve\Support\Fusion\Templates\Edit\Effects`
   - macOS: `~/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Templates/Edit/Effects`
   - Linux: `~/.local/share/DaVinciResolve/Fusion/Templates/Edit/Effects`
4. Restart DaVinci Resolve.

Updating from 1.0.0: replace the old file in both folders. Clips that already use Easy Bit keep the version they were made with; add the effect again to get the new one.

## Use

On the Fusion page, press **Shift + Space**, type **Easy Bit** and add it between your MediaIn and MediaOut nodes. You can also find it under **Effects → Macros**.

On the Edit page, search for **Easy Bit** in the Effects library and drag it onto a clip.

Start with **Pixel Size**, then try the palettes and both textures. Turn on **Pixel Grid** for an instant handheld-console look.
