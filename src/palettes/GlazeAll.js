// ==================== GlazeAll.js ====================
// All-in-one: Colors + Gradients + Utils + auto TypeScript .d.ts
import { GlazeBasicColors } from "./GlazeBasicColors.js";
import { GlazeExtendedColors } from "./GlazeExtendedColors.js";
import { GlazeVariantsColors } from "./GlazeVariantsColors.js";
import { GlazeGradients } from "./GlazeGradients.js";

// ===== Utils =====
export const GlazeUtils = {
  hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  },
  rgbToRGBA({ r, g, b }, a = 1) {
    return { r, g, b, a };
  },
  rgbToRGBAString({ r, g, b }, a = 1) {
    return `rgba(${r},${g},${b},${a})`;
  },
  rgbToFloat({ r, g, b }) {
    return { r: r / 255, g: g / 255, b: b / 255 };
  },
  rgbToHSV({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max, d = max - min;
    s = max === 0 ? 0 : d / max;
    if (d === 0) h = 0;
    else if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60); if (h < 0) h += 360;
    return { h, s, v };
  },
  rgbToHSL({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2, d = max - min;
    s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    if (d === 0) h = 0;
    else if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60); if (h < 0) h += 360;
    return { h, s, l };
  },
  rgbToCMYK({ r, g, b }) {
    let c = 1 - r / 255, m = 1 - g / 255, y = 1 - b / 255;
    let k = Math.min(c, m, y);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 1 };
    c = (c - k) / (1 - k); m = (m - k) / (1 - k); y = (y - k) / (1 - k);
    return { c, m, y, k };
  },
  generateGradient(hex1, hex2, deg = 90) {
    return `linear-gradient(${deg}deg, ${hex1}, ${hex2})`;
  }
};

// ===== Merge semua warna =====
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

// ===== Generate semua format =====
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
    cmyk: GlazeUtils.rgbToCMYK(rgb)
  };
}

// ===== Gradients =====
export const GlazeNamedGradients = GlazeGradients;
