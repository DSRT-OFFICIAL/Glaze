// ==================== examples/Colorsdemo.js ====================

// Import dari build-mu
import {
  Conversion,
  Manipulation,
  Theme,
  Palette,
  Accessibility,
  Random,
  Alias,
  Basic,
  Extended,
  Variants,
} from "../src/index.js";

// ---- Conversion ----
console.log("HEX -> RGB:", Conversion.hexToRgb("#FF5733"));
console.log("RGB -> HEX:", Conversion.rgbToHex(255, 87, 51));

// ---- Manipulation ----
console.log("Lighten:", Manipulation.lighten("#3B82F6", 0.2));
console.log("Darken:", Manipulation.darken("#3B82F6", 0.2));

// ---- Palette Utils ----
console.log("Analogous:", Palette.generateAnalogous("#3B82F6"));
console.log("Triadic:", Palette.generateTriadic("#3B82F6"));

// ---- Theme ----
const theme = Theme.generateTheme({ primary: "#3B82F6" });
console.log("Theme Light:", theme.light.primary);
console.log("Theme Dark:", theme.dark.primary);

// ---- Accessibility ----
console.log("Contrast Ratio:", Accessibility.contrastRatio("#000000", "#FFFFFF"));
console.log("Check Contrast (AA small):", Accessibility.checkContrast("#000000", "#FFFFFF"));

// ---- Random ----
console.log("Random Color:", Random.getRandomColor());

// ---- Alias ----
console.log("Alias Primary 500:", Alias.getColor("primary", 500));

// ---- Predefined Colors ----
console.log("Basic Red 500:", Basic.GlazeBasicColors.red[500]);
console.log("Extended Teal 400:", Extended.GlazeExtendedColors.teal[400]);
console.log("Variant Indigo 600:", Variants.GlazeVariantsColors.indigo[600]);
