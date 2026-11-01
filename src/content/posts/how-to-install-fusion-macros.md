---
title: How to install a Fusion macro in DaVinci Resolve
description: Where a .setting file goes, how to make it show up on both the Fusion and Edit pages, and a quick way to try one without installing it.
published: 2026-10-31
category: tutorial
tags: [fusion, macros, install]
relatedPlugins: [easy-crt, easy-ascii, easy-dither, easy-bit]
---

Every plugin on this shelf is a Fusion macro: a single `.setting` file. There is no installer. You copy the file into the right folder, restart Resolve, and it shows up in the effects list.

## 1. Download the file

Each plugin page has a **Download** button that saves a file such as `Easy CRT.setting`. Keep the name as it is; Resolve uses the file name as the effect name.

## 2. Copy it into the Macros folder

This makes the macro available on the **Fusion page**.

- Windows: `%AppData%\Blackmagic Design\DaVinci Resolve\Support\Fusion\Macros`
- macOS: `~/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Macros`
- Linux: `~/.local/share/DaVinciResolve/Fusion/Macros`

These folders are hidden by default. On Windows, press **Win + R**, paste the path and press Enter. On macOS, open Finder, press **Shift + Cmd + G**, paste the path and press Return. If the `Macros` folder does not exist yet, create it.

## 3. Optional: copy it into the Edit effects folder

This makes the same macro available on the **Edit page**, where you can drop it straight onto a clip in the timeline.

- Windows: `%AppData%\Blackmagic Design\DaVinci Resolve\Support\Fusion\Templates\Edit\Effects`
- macOS: `~/Library/Application Support/Blackmagic Design/DaVinci Resolve/Fusion/Templates/Edit/Effects`
- Linux: `~/.local/share/DaVinciResolve/Fusion/Templates/Edit/Effects`

You can keep a copy in both folders. They do not conflict.

## 4. Restart Resolve

Resolve reads these folders when it starts, so close it completely and open it again.

## 5. Find it

- **Fusion page:** press **Shift + Space**, type the macro's name and press Enter to add it to the node graph. It is also listed under **Effects → Macros**.
- **Edit page:** open the **Effects** library, search for the macro's name and drag it onto a clip. Its controls appear in the Inspector.

## Try one without installing

A `.setting` file is plain text describing a group of nodes. Drag it from your file browser into the Fusion node editor, or open it in a text editor, copy everything and paste it into the node editor with **Ctrl + V** (**Cmd + V** on macOS). The macro appears as a node in the current composition only, which is a handy way to test it before you install it.

## Updating or removing a macro

To update, download the new version and replace the old file in the same folders, then restart Resolve. To remove a macro, delete its file from both folders.

## It does not show up

- Check that the file ends in `.setting` and not `.setting.txt`. Windows hides known extensions by default, so a renamed file can carry a hidden `.txt`.
- Check that you restarted Resolve after copying the file.


If the macro shows up but renders with a watermark, check the plugin page's **Edition** line. Some macros need DaVinci Resolve Studio; [this note explains why](../resolve-free-vs-studio-macros/).
