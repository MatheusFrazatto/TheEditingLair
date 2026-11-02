---
title: Easy Bit
summary: Turns any clip into low-res pixel art in one Fusion macro, with crisp blocks, console palettes and a choppy low frame-rate look.
type: fusion-macro
version: 1.0.0
released: 2026-10-31
compatibility:
  resolve: "21"
  edition: free
access:
  kind: free
  download: https://github.com/MatheusFrazatto/TheEditingLair/releases/download/easy-bit-v1.0.0/Easy-Bit-v1.0.0.zip
  fileName: Easy-Bit-v1.0.0.zip
  fileSize: 7 KB
controls:
  - { name: Pixel Size, default: "6" }
  - { name: Texture, default: "Clean" }
  - { name: Palette, default: "None" }
  - { name: Color Steps, default: "3" }
  - { name: Frame Repeat, default: "5" }
cover: ./images/easy-bit.jpg
coverOriginal: ./images/easy-bit-original.jpg
coverBrightness: 1.4
coverAlt: The words EASY BIT in white over a pixel-art raccoon mask in dark blue, on a black background.
preview:
  video: media/easy-bit/preview.mp4
  poster: ./images/easy-bit-preview.jpg
  credit: "Footage: Sly Cooper trailer."
tags: [pixel, 8-bit, retro, palette]
changelog:
  - version: 1.0.0
    date: 2026-10-31
    notes: First public release.
---

Easy Bit turns footage into low-resolution pixel art. It shrinks the frame to one pixel per block, reduces the colors, optionally snaps them to a classic console palette, then scales the result back up with hard, crisp edges. A frame repeat finishes the look with the choppy motion of old games. Everything lives on a single Controls page, grouped in collapsible sections ordered by how often you will touch them.

All the color work happens on the small image, so palette matching stays fast. Pixel Size is scaled to the frame size and always lands on whole pixels, so every block is the same size at 1080p and at 4K.

## Palettes

| Palette | Colors |
|---|---|
| None (default) | Your clip's own colors, posterized with Color Steps |
| CGA | The 4-color high-intensity palette: black, cyan, magenta and white |
| Game Boy | The 4 greens of the original Game Boy screen |
| NES | The 55 colors of the Nintendo Entertainment System |
| PICO-8 | The 16 colors of the PICO-8 fantasy console |

Each block takes the nearest color in the palette, so the Tone section is the best way to steer which colors get picked.

## Texture

**Clean** averages every block, for smooth, even areas of color. **Gritty** takes the color from the center of each block instead, which keeps more contrast and noise, closer to a raw, punchy pixel look.

## Controls

| Section | Control | What it does | Default |
|---|---|---|---|
| | Mix | Blends the pixel look with the clean image | 1 |
| Pixel | Pixel Size | Size of each block | 6 |
| Pixel | Texture | Clean (averaged blocks) or Gritty (sampled blocks) | Clean |
| Pixel | Smoothness | Blur applied before pixelating | 0 |
| Color | Palette | None, CGA, Game Boy, NES or PICO-8 | None |
| Color | Color Steps | Number of color levels when Palette is None | 3 |
| Color | Color Mix | How much of the clip's original color returns after posterizing | 1 |
| Motion | Frame Repeat | Holds each frame for this many frames | 5 |
| Tone | Brightness, Contrast, Gamma, Saturation | Grade applied before pixelating | 0, 0, 1, 1 |

Tone starts collapsed; click a section name in the Inspector to open it. Set Frame Repeat to 1 to keep the original motion.

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

## Use

On the Fusion page, press **Shift + Space**, type **Easy Bit** and add it between your MediaIn and MediaOut nodes. You can also find it under **Effects → Macros**.

On the Edit page, search for **Easy Bit** in the Effects library and drag it onto a clip.

Start with **Pixel Size**, then try the palettes and both textures.
