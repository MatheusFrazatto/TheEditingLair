---
title: Kinetic
summary: A Fusion script for easing keyframes. Drag bezier handles on a graph, pick an easing preset, or bake elastic springs and real bounces into the curve.
type: script
compatibility:
  resolve: "21"
  edition: free
  os: [windows]
  note: Tested in Studio so far
access:
  kind: soon
features:
  - Drag bezier handles on a graph
  - 27 presets, or paste a cubic-bezier
  - Elastic springs and real bounces
  - Eases Center and other paths too
  - One Ctrl+Z undoes the whole apply
cover: ./images/kinetic.jpg
coverBrightness: 0.7
coverAlt: The Kinetic window in DaVinci Resolve. An ease-in-out curve on a graph with two handles, preset buttons for In, Out and In-Out, Influence and Height sliders for each key, and a red Apply button.
tags: [easing, keyframes, animation, spline editor, script]
---

Kinetic shapes the motion between keyframes in Fusion, so you don't have to drag handles in the Spline Editor one by one. Select the animated tools in the Flow, open Kinetic from Workspace › Scripts › Comp on the Fusion page, choose a curve, and press Apply. It works on every animated parameter of the selected tools, including position animation that runs along a path. A single Ctrl+Z undoes the whole apply.

## Controls

**Curve** sets the ease as a cubic-bezier. You can shape it three ways:
- Drag the two handles on the graph.
- Use the Influence and Height sliders for each key.
- Start from a preset: choose a family (Sine, Cubic, Expo, Back and more) and a direction (In, Out or In-Out).

A `cubic-bezier(…)` copied from After Effects or CSS can be pasted in, and the ease of keys you already have can be read back into the graph. Curves you make can be saved as your own presets. Double-click a control's name to reset it.

**Elastic** is a damped spring that overshoots and settles. It can launch at full speed or start from rest.

**Bounce** drops the value onto its target like a ball, and each bounce loses height and time. Both Elastic and Bounce are baked into keys every few frames, and the handles follow the curve so motion blur stays smooth between frames.

**Apply to** chooses which keys to shape: every key pair, only the pair under the playhead, or only the pairs inside the render range.

## Before it ships

Kinetic runs today in DaVinci Resolve Studio 21 on Windows. Before it is released, it still needs testing in Resolve Free, on macOS and on Linux. It will land on this shelf with its version, the Resolve it needs, install steps and a download.
