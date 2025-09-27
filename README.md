# Glaze

Glaze is a color utility library for:

Color conversion (HEX ↔ RGB/HSL)

Color manipulation (lighten, darken, opacity, mix)

Palettes and themes (shades, tints, complementary, triadic)

Color accessibility (contrast, WCAG compliance)

Random color & palette generation


Install

npm install @glaze-artweb/glaze

Usage

import { getColor, Theme } from "@glaze-artweb/glaze";

const primary500 = getColor("primary", 500);
console.log(primary500);

console.log(Theme.LightTheme.primary.DEFAULT);


---

5. Publishing to NPM

1. Make sure the version in package.json is correct (e.g., 1.0.0).


2. First-time publish:



npm publish --access public

3. For subsequent updates (patch/minor/major):



npm version patch   # or minor/major
npm publish

> Note: --access public is required for scoped packages (@glaze-artweb/glaze) to be publicly accessible.




---

6. Importing in Other Projects

ESM (default for Glaze):


import { getColor, Theme } from "@glaze-artweb/glaze";

Browser via CDN (optional)
If you want to use it like Three.js via <script> CDN, you can use unpkg:


<script type="module">
import { getColor } from 'https://unpkg.com/@glaze-artweb/glaze@1.0.0/src/index.js';
console.log(getColor("primary", 500));
</script>
