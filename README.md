# Glaze

**Glaze** is a professional color library.  
Supports color conversions, manipulations, gradients, palettes, accessibility checks, random colors, and more.

## Features
- Color conversions: HEX, RGB, HSL, CMYK, LAB, XYZ, HSV
- Color manipulation: lighten, darken, saturate, desaturate, blend, mix, invert
- Accessibility checks: contrast, readability, color blindness friendly
- Gradients: linear, radial, conic
- Palettes: basic, extended, variants, user-defined
- Random generation: colors, palettes, gradients
- Effects: noise, grain, glow, overlay
- Analysis: temperature, harmony, dominant color, contrast map
- I/O: hex, css, json, svg

## Installation
```bash
npm install glaze

Usage

import { Color, Palette } from "glaze";

// Create a color
const red = new Color("#FF0000");

// Manipulate
const lighter = red.lighten(20);

// Use palette
const palette = new Palette([red, lighter]);
console.log(palette.random());

Build

npm run build

Release

Automatic releases via GitHub Actions + Semantic Release.

Commit [patch] → patch release

Commit [minor] → minor release

Commit [major] → major release
