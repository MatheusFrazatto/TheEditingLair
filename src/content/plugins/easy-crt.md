---
title: Easy CRT
summary: A complete CRT screen look in one Fusion macro, with tube curvature, RGB phosphor mask, glow and bloom, halation, grain, color fringe and flicker.
type: fusion-macro
version: 2.2.0
released: 2026-10-31
updated: 2026-10-31
compatibility:
  resolve: "21"
  edition: studio
access:
  kind: free
  download: https://github.com/MatheusFrazatto/TheEditingLair/releases/download/easy-crt-v2.2.0/Easy-CRT-v2.2.0.zip
  fileName: Easy-CRT-v2.2.0.zip
  fileSize: 4 KB
features:
  - Curved tube and RGB phosphor mask
  - Glow, bloom and halation
  - Grain and color fringing
  - A flickering signal
cover: ./images/easy-crt.jpg
coverOriginal: ./images/easy-crt-original.jpg
coverBrightness: 0.8
coverAlt: The words EASY CRT and BY CADENZY in red over a Las Vegas casino street with a tall yellow kiosk, seen through CRT scanlines and a soft glow.
preview:
  video: media/easy-crt/preview.mp4
  poster: ./images/easy-crt-preview.jpg
  credit: "Footage: The Finals trailer."
tags: [crt, retro, screen, glow]
changelog:
  - version: 2.2.0
    date: 2026-10-31
    notes: The Made by Cadenzy and The Editing Lair buttons at the top of the Inspector now open this site.
  - version: 2.1.0
    date: 2026-10-31
    notes: The top of the Inspector now shows the title, version and credits as centered buttons.
  - version: 2.0.0
    date: 2026-10-31
    notes: First public release.
featured: true
---

Easy CRT turns any clip into an old tube screen in one node. It bends the image into a curved tube, lays an RGB phosphor mask over it, adds glow, bloom and halation, and finishes with grain, color fringing and a flickering signal. Everything lives on a single Controls page, grouped in collapsible sections ordered by how often you will touch them.

The phosphor mask is scaled to the frame size, so a setting looks the same at 1080p and at 4K.

## Requirements

Easy CRT needs **DaVinci Resolve Studio**. It is built partly on ResolveFX, and two of them, Lens Distortion and Halation, only ship with Studio. It was tested on DaVinci Resolve Studio 21.

## Controls

| Section | Control | What it does | Default |
|---|---|---|---|
| | Mix | Blends the CRT look with the clean image | 1 |
| Screen | Curvature | How much the tube bends the picture | -0.4 |
| Screen | Overscan | Scales the image to fill the curved frame | 1.25 |
| Screen | Vignette Size / Sharpness | Darkening toward the edges of the tube | 0.25 / 5 |
| Phosphor Mask | Brightness | Brightness of the masked image | 1.75 |
| Phosphor Mask | Mask Size | Size of the RGB subpixel grid | 1 |
| Phosphor Mask | Red / Green / Blue Width | Width of each phosphor stripe | 0.4 |
| Glow | Glow on/off, Threshold | Which highlights glow | on, 0.5 |
| Glow | Glow Amount / Size | Inner glow around bright areas | 0.25 / 15 |
| Glow | Bloom Amount / Size | Wide outer bloom | 1 / 50 |
| Halation & Grain | Halation on/off, Threshold | Red halo around strong highlights | on, 1.5 |
| Halation & Grain | Grain, Grain Amount | Film-like grain over the screen | on, 1 |
| Color Fringe | Fringe on/off, Strength, Distance | Chromatic aberration toward the edges | on, 0.4, 0.01 |
| Signal | Frame Repeat | Holds frames for a choppier, broadcast-like cadence | 2 |
| Signal | Flicker on/off, Type, Amount, Speed | Brightness flicker of the tube | on, gamma, 0.05, 3 |
| Advanced | Curvature Center, Flicker Variation, Color Space | Set-and-forget technical settings | |

Halation & Grain, Color Fringe, Signal and Advanced start collapsed; click a section name in the Inspector to open it.

## Install

1. Download the zip and unzip it to get `Easy CRT.setting`.
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

On the Fusion page, press **Shift + Space**, type **Easy CRT** and add it between your MediaIn and MediaOut nodes. You can also find it under **Effects → Macros**.

On the Edit page, search for **Easy CRT** in the Effects library and drag it onto a clip.

Open the Inspector and start with the Screen and Phosphor Mask sections.
