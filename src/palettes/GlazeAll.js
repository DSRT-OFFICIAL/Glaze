// ==================== GlazeAll.js ====================
// All-in-one Glaze bundle: Colors + Palettes + Themes + Accessibility + Utils + Gradients

import { GlazeExpertColors } from "./GlazeExpertColors.js";
import { GlazePalettes } from "./GlazePalettes.js";
import { GlazeThemes } from "./GlazeThemes.js";
import * as GlazeAccessibility from "./GlazeAccessibility.js";
import * as GlazeUtils from "./GlazeUtils.js";
import { GlazeGradients, generateGradient } from "./GlazeGradients.js";

// ===== Merge semua warna dari GlazeExpertColors =====
function mergeColorSets(...sets) {
  const merged = {};
  for (const set of sets) {
    for (const [color, hex] of Object.entries(set)) {
      merged[color] = hex;
    }
  }
  return merged;
}

const allHexColors = mergeColorSets(GlazeExpertColors);

// ===== Generate semua format warna =====
export const GlazeNamedColors = {};
for (const [name, hex] of Object.entries(allHexColors)) {
  const rgb = GlazeUtils.hexToRgb(hex);
  GlazeNamedColors[name] = {
    hex,
    rgb,
    rgba: [...rgb, 1],
    rgbaString: `rgba(${rgb.join(", ")}, 1)`,
    rgbFloat: rgb.map((v) => v / 255),
    hsv: GlazeUtils.rgbToHSV ? GlazeUtils.rgbToHSV(rgb) : null,
    hsl: GlazeUtils.rgbToHSL ? GlazeUtils.rgbToHSL(rgb) : null,
    cmyk: GlazeUtils.rgbToCMYK ? GlazeUtils.rgbToCMYK(rgb) : null,
  };
}

// ===== Gradients =====
export const GlazeNamedGradients = {
  ...GlazeGradients,
  redToBlue: generateGradient("#EF4444", "#3B82F6", 90),
  greenToCyan: generateGradient("#22C55E", "#06B6D4", 135),
  orangeToPink: generateGradient("#F97316", "#EC4899", 45),
};

// ===== Export all-in-one Glaze bundle =====
export const GlazeAll = {
  // Colors
  GlazeExpertColors,
  GlazeNamedColors,

  // Palettes & Themes
  GlazePalettes,
  GlazeThemes,

  // Accessibility
  GlazeAccessibility,

  // Utilities
  GlazeUtils,
  GlazeGradients,
  GlazeNamedGradients,
  generateGradient,
};
