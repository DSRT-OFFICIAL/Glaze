// ==================== ColorsAlias.js ====================
import { GlazeBasicColors } from "./GlazeBasicColors.js";
import { GlazeExtendedColors } from "./GlazeExtendedColors.js";
import { GlazeVariantsColors } from "./GlazeVariantsColors.js";

const ColorMaps = {
  ...GlazeBasicColors,
  ...GlazeExtendedColors,
  ...GlazeVariantsColors,
};

// Ambil warna konsisten
export function getColor(name, shade = 500) {
  if (!ColorMaps[name]) {
    throw new Error(`Color '${name}' not found in palettes`);
  }
  if (!ColorMaps[name][shade]) {
    throw new Error(`Shade '${shade}' not found for color '${name}'`);
  }
  return ColorMaps[name][shade];
}

// List semua warna yang tersedia
export function listColors() {
  return Object.keys(ColorMaps);
}

// List semua shade untuk 1 warna
export function listShades(name) {
  return Object.keys(ColorMaps[name] || {});
}
