---
title: Easy ASCII
summary: Turns any clip into animated ASCII art in one Fusion macro, with 13 character sets, 15 color palettes and full control over grid, tone and type.
type: fusion-macro
version: 2.1.0
released: 2026-10-31
updated: 2026-10-31
compatibility:
  resolve: "21"
  edition: free
access:
  kind: free
  download: downloads/easy-ascii/Easy%20ASCII.setting
  fileName: Easy ASCII.setting
  fileSize: 75 KB
controls:
  - { name: Density, default: "150" }
  - { name: Character Set, default: "Classic" }
  - { name: Palette, default: "Custom" }
  - { name: Glyph Size, default: "1.5" }
  - { name: Contrast, default: "1" }
cover: ./images/easy-ascii.jpg
coverOriginal: ./images/easy-ascii-original.jpg
coverBrightness: 2
coverAlt: The words EASY ASCII in white dot characters over a dark red ASCII-art silhouette of a cloaked figure.
tags: [ascii, text, retro, stylize]
changelog:
  - version: 2.1.0
    date: 2026-10-31
    notes: The Made by Cadenzy and The Editing Lair buttons at the top of the Inspector now open this site.
  - version: 2.0.0
    date: 2026-10-31
    notes: First public release.
---

Easy ASCII rebuilds your image out of text. It splits the frame into a grid, reads the brightness of each cell and swaps it for a character, from a light dot to a dense block, then tints the result with a color palette. It runs on footage, titles and graphics, and it updates every frame, so motion stays alive.

Everything lives on a single Controls page, grouped in collapsible sections ordered by how often you will touch them. It works on both DaVinci Resolve and DaVinci Resolve Studio.

## Character sets

Each set has nine characters, from lightest to densest. Most start with a space, the blank lightest level, which is why some rows below show eight:

| Set | Characters |
|---|---|
| Alphabet | `ilrcoemw` |
| Alphabet Caps | `ITLCOAMW` |
| Binary | `11110000` |
| Classic (default) | `.:-=+*#@` |
| Detailed | `:~*{}%&#@` |
| Diagonal | `>/\zY7XAK` |
| Hatching | `.-/\|\xX#` |
| Minimal | `.,-~:;=!` |
| Number | `17435608` |
| Orthogonal | `_-!=LTHF#` |
| Pattern | `<>\/(){}[]` |
| Round | `.:oqp908@` |
| Sh4rks Linear | `.'^>za6$@` |

Pick **Custom** to type your own nine characters, light to dense. The first one always renders in the background color, so a space works well there.

## Palettes

Amber Terminal, Blueprint, Candy, CGA, Dream, Fire Ocean, Fresh Violet, Game Boy, Green Phosphor, Matrix, Monochrome, Paper, Polar Express, Retro Glow and Video Color, which keeps the colors of your original clip. **Custom** starts as white characters on black and opens a gradient you can edit freely.

## Controls

| Section | Control | What it does | Default |
|---|---|---|---|
| Grid | Density | How many characters fit across the frame | 150 |
| Characters | Character Set | Which glyphs map to the brightness levels | Classic |
| Characters | Custom (9, light to dense) | Your own nine characters | |
| Color | Palette | Gradient that tints the characters | Custom |
| Color | Custom Gradient | Editable gradient for the Custom palette | white on black |
| Tone | Contrast, Lift, Gamma, Gain | Brightness levels fed into the character mapping | 1, 0, 1, 1 |
| Tone | Blend | How much of the tone inversion is applied | 1 |
| Typography | Font, Style | Typeface used for the characters | |
| Typography | Size, Width, Height | Glyph size and proportions inside each cell | 1.5, 1, 1 |
| Color Correction | Color wheel, Hue, Saturation | Final grade on the ASCII result | |

Tone, Typography and Color Correction start collapsed; click a section name in the Inspector to open it.

## Install

1. Download `Easy ASCII.setting`.
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

On the Fusion page, press **Shift + Space**, type **Easy ASCII** and add it between your MediaIn and MediaOut nodes. You can also find it under **Effects → Macros**.

On the Edit page, search for **Easy ASCII** in the Effects library and drag it onto a clip.

Start with **Density** to set how coarse the grid is, then try a few character sets and palettes.
