# Glaze

**Glaze** is a modern, modular, and professional JavaScript color utility library. Inspired by the flexibility of libraries like Three.js, Glaze provides everything you need to create, manipulate, convert, and analyze colors, palettes, and gradients.

---

## Features

- **Core Classes**
  - `Color`: Class for handling color objects and transformations.
  - `Palette`: Manage and manipulate color palettes easily.
  - `Utils`: General helpers (clamp, lerp, random, etc.).

- **Color Conversions**
  - HEX, RGB, HSL, CMYK, LAB, XYZ, HSV
  - Bidirectional conversion functions for professional color workflows.

- **Manipulation**
  - Lighten, Darken, Saturate, Desaturate, Blend, Mix, Invert
  - Powerful, modular utilities to adjust colors dynamically.

- **Accessibility**
  - Contrast calculations, readability checks, and color blindness-friendly palettes.

- **Gradients**
  - Linear, Radial, Conic
  - Generate gradients programmatically or blend existing palettes.

- **Palettes**
  - `GlazeBasicColors`, `GlazeExtendedColors`, `GlazeVariantsColors`
  - Support for user-defined palettes.

- **Randomization**
  - Random colors, random palettes, and gradient generation.

- **Effects**
  - Noise, Grain, Glow, Overlay
  - Procedural effects for creative color generation.

- **Analysis (Pro Features)**
  - Color temperature detection (warm/cool)
  - Harmony analysis (complementary, analogous, triadic, tetradic)
  - Dominant color extraction
  - Automatic contrast mapping

- **IO**
  - Import/export colors in HEX, CSS, JSON, and SVG.

---

## Installation

```bash
npm install glaze

or via CDN:

<script src="https://cdn.jsdelivr.net/npm/glaze/dist/glaze.min.js"></script>


---

Usage

import { Color, Palette, GlazeBasicColors } from "glaze";

// Create a new color
const red = new Color("#FF0000");

// Lighten a color
const lightRed = red.lighten(20);

// Convert color to HSL
const hsl = red.toHSL();

// Create a palette
const palette = new Palette([GlazeBasicColors.red[500], GlazeBasicColors.blue[500]]);
palette.addColor("#00FF00");

// Generate random color
import { randomColor } from "glaze/random";
const random = randomColor();


---

File Structure

Glaze/
 └── src/
     ├── core/
     ├── conversion/
     ├── manipulation/
     ├── accessibility/
     ├── gradients/
     ├── palettes/
     ├── random/
     ├── effects/
     ├── analysis/
     ├── io/
     └── index.js


---

Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository


2. Create a new branch (git checkout -b feature-name)


3. Commit your changes (git commit -m 'Add new feature')


4. Push to the branch (git push origin feature-name)


5. Open a Pull Request




---

License

MIT License © 2025 Glaze Library.
See LICENSE for details.


---

Contact

GitHub: DSRT-OFFICIAL/Glaze

Email: fengbayu@gmail.com
