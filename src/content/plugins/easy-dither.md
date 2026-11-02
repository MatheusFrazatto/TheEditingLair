---
title: Easy Dither
summary: Ordered dithering for any clip in one Fusion macro, with six patterns, posterized color and twelve duotone presets.
type: fusion-macro
version: 1.1.0
released: 2026-10-31
updated: 2026-10-31
compatibility:
  resolve: "21"
  edition: free
access:
  kind: free
  download: https://github.com/MatheusFrazatto/TheEditingLair/releases/download/easy-dither-v1.1.0/Easy-Dither-v1.1.0.zip
  fileName: Easy-Dither-v1.1.0.zip
  fileSize: 5 KB
controls:
  - { name: Dither Size, default: "5" }
  - { name: Pattern, default: "Bayer 2x2" }
  - { name: Dither Strength, default: "1" }
  - { name: Posterize Steps, default: "3" }
  - { name: Color Mode, default: "Original" }
cover: ./images/easy-dither.jpg
coverOriginal: ./images/easy-dither-original.jpg
coverBrightness: 1.4
coverAlt: The words EASY DITHER in blue over a dithered, dimly lit figure wearing a spiked crown, on a black background.
preview:
  video: media/easy-dither/preview.mp4
  poster: ./images/easy-dither-preview.jpg
  credit: "Footage generated with Gemini."
tags: [dither, retro, pixel, duotone]
changelog:
  - version: 1.1.0
    date: 2026-10-31
    notes: The Made by Cadenzy and The Editing Lair buttons at the top of the Inspector now open this site.
  - version: 1.0.0
    date: 2026-10-31
    notes: First public release.
---

Easy Dither gives any clip the look of early computer graphics and printed halftone. It pixelates the frame, lays an ordered dither pattern over it and reduces the image to a few tone steps, then brings the original colors back or remaps everything to two colors. Everything lives on a single Controls page, grouped in collapsible sections ordered by how often you will touch them.

The pattern is generated inside the macro, so there is no image file to install next to it. Dither Size is scaled to the frame size and always lands on whole pixels, so the grid stays clean at 1080p and at 4K.

Easy Dither is based on [Simple Dither by skapecreates](https://youtube.com/@skapecreates), a free macro whose pipeline it builds on.

## Patterns

| Pattern | Look |
|---|---|
| Bayer 2x2 (default) | Coarse checkerboard, the classic dither |
| Bayer 4x4 | Finer cross-hatched texture with more in-between tones |
| Bayer 8x8 | The smoothest gradients of the Bayer family |
| Lines | Parallel scan lines |
| Diagonal | Diagonal stripes |
| Dots | Round halftone dots |

**Direction** switches the pattern between vertical and horizontal.

## Color

**Original** keeps the colors of your clip on top of the dithered tones. **Posterized** flattens the colors into a few bands that follow Posterize Steps, for a limited-palette look.

The Duotone section remaps the result to two colors. Raise **Blend** to turn it on, then pick a preset or choose your own Highlight and Shadow colors with **Custom**. Presets: Cyan Night, Hot Pink, Indigo & Coral, Magenta & Sky, Navy & Blush, Navy & Lilac, Plum & Mint, Plum & Pink, Red & Cream, Teal & Mint, Violet & Mint and Wine & Peach.

## Controls

| Section | Control | What it does | Default |
|---|---|---|---|
| | Mix | Blends the dithered look with the clean image | 1 |
| Dither | Dither Size | Size of each dither cell | 5 |
| Dither | Pattern | Shape of the dither pattern | Bayer 2x2 |
| Dither | Direction | Orientation of the pattern | Vertical |
| Dither | Dither Strength | How strongly the pattern cuts into the image | 1 |
| Color | Posterize Steps | Number of tone steps | 3 |
| Color | Color Mode | Original or Posterized colors | Original |
| Duotone | Blend | How much of the duotone is applied | 0 |
| Duotone | Preset | Ready-made color pair, or Custom | Custom |
| Duotone | Highlight / Shadow | Colors used by the Custom preset | white / black |
| Tone | Contrast, Brightness | Levels before posterizing | 0, 0 |
| Tone | Lift, Gamma, Gain | Shadows, midtones and highlights before posterizing | 0, 1, 1 |
| Tone | Low / High | Black and white points | 0 / 1 |

Duotone and Tone start collapsed; click a section name in the Inspector to open it.

## Install

1. Download the zip and unzip it to get `Easy Dither.setting`.
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

On the Fusion page, press **Shift + Space**, type **Easy Dither** and add it between your MediaIn and MediaOut nodes. You can also find it under **Effects → Macros**.

On the Edit page, search for **Easy Dither** in the Effects library and drag it onto a clip.

Start with **Dither Size** and **Pattern**, then use **Posterize Steps** and **Dither Strength** to set how hard the effect looks.
