// ==================== GlazeNamedColors.js ====================
// Glaze super final: Hex + RGB + RGBA + RGB float + HSV + HSL + CMYK + Gradients

import { GlazeBasicColors } from "./GlazeBasicColors.js";
import { GlazeExtendedColors } from "./GlazeExtendedColors.js";
import { GlazeVariantsColors } from "./GlazeVariantsColors.js";
import * as GlazeUtils from "./GlazeUtils.js";
import { GlazeGradients, generateGradient } from "./GlazeGradients.js";

// ===== Gabungkan semua warna =====
function mergeColorSets(...sets) {
  const merged = {};
  for (const set of sets) {
    for (const [color, shades] of Object.entries(set)) {
      if (typeof shades === "string") merged[color] = shades;
      else {
        for (const [shade, hex] of Object.entries(shades)) {
          merged[`${color}${shade}`] = hex;
        }
      }
    }
  }
  return merged;
}

const allHexColors = mergeColorSets(GlazeBasicColors, GlazeExtendedColors, GlazeVariantsColors);

// ===== Generate semua format warna =====
export const GlazeNamedColors = {};

for (const [name, hex] of Object.entries(allHexColors)) {
  const rgb = GlazeUtils.hexToRGB(hex);
  GlazeNamedColors[name] = {
    hex,
    rgb,
    rgba: GlazeUtils.rgbToRGBA(rgb),
    rgbaString: GlazeUtils.rgbToRGBAString(rgb),
    rgbFloat: GlazeUtils.rgbToFloat(rgb),
    hsv: GlazeUtils.rgbToHSV(rgb),
    hsl: GlazeUtils.rgbToHSL(rgb),
    cmyk: GlazeUtils.rgbToCMYK(rgb),
  };
}

// ===== Gradients preset tambahan =====
export const GlazeNamedGradients = {
  ...GlazeGradients,
  // contoh gradient otomatis: dari primary colors
  redToBlue: generateGradient("#EF4444", "#3B82F6", 90),
  greenToCyan: generateGradient("#22C55E", "#06B6D4", 135),
  orangeToPink: generateGradient("#F97316", "#EC4899", 45),
};
