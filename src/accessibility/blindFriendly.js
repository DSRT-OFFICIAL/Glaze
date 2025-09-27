// ==================== blindFriendly.full.js ====================

import { hexToRgb, rgbToHex } from "../conversion/rgb.js";
import { contrastRatio } from "./contrast.js";

/**
 * Simulasi buta warna
 * @param {string} hex - HEX color "#RRGGBB"
 * @param {"protanopia"|"deuteranopia"|"tritanopia"} type
 * @returns {string} HEX hasil simulasi
 */
export function simulateColorBlindness(hex, type) {
  const { r, g, b } = hexToRgb(hex);
  let newR = r, newG = g, newB = b;

  switch (type) {
    case "protanopia":
      newR = 0.56667 * r + 0.43333 * g;
      newG = 0.55833 * r + 0.44167 * g;
      newB = b;
      break;
    case "deuteranopia":
      newR = 0.625 * r + 0.375 * g;
      newG = 0.7 * r + 0.3 * g;
      newB = b;
      break;
    case "tritanopia":
      newR = r;
      newG = 0.95 * g + 0.05 * b;
      newB = 0.43333 * g + 0.56667 * b;
      break;
    default:
      throw new Error(`Unknown color blindness type: ${type}`);
  }

  return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
}

/**
 * Mengecek apakah warna aman untuk pengguna buta warna
 */
export function isBlindFriendly(textHex, bgHex, type, minContrast = 4.5) {
  const simText = simulateColorBlindness(textHex, type);
  const simBg = simulateColorBlindness(bgHex, type);
  return contrastRatio(simText, simBg) >= minContrast;
}

/**
 * Memberikan rekomendasi warna alternatif linear (looping)
 */
export function suggestBlindFriendlyColors(textHex, bgHex, type, minContrast = 4.5, steps = 20) {
  if (isBlindFriendly(textHex, bgHex, type, minContrast)) return [textHex];

  const rgb = Object.values(hexToRgb(textHex));
  const suggestions = [];

  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;

    // Mencerahkan
    const lighter = rgb.map(v => Math.round(Math.min(255, v + (255 - v) * factor)));
    const lighterHex = rgbToHex(lighter[0], lighter[1], lighter[2]);
    if (isBlindFriendly(lighterHex, bgHex, type, minContrast)) suggestions.push(lighterHex);

    // Menggelapkan
    const darker = rgb.map(v => Math.round(Math.max(0, v * (1 - factor))));
    const darkerHex = rgbToHex(darker[0], darker[1], darker[2]);
    if (isBlindFriendly(darkerHex, bgHex, type, minContrast)) suggestions.push(darkerHex);
  }

  return Array.from(new Set(suggestions));
}

/**
 * Memberikan rekomendasi warna alternatif optimized (binary search)
 */
export function suggestBlindFriendlyColorsOptimized(textHex, bgHex, type, minContrast = 4.5) {
  if (isBlindFriendly(textHex, bgHex, type, minContrast)) return [textHex];

  const rgb = Object.values(hexToRgb(textHex));
  const results = [];

  // Helper: ubah brightness dengan faktor (0..1)
  const applyFactor = (rgb, factor) => rgb.map(v => Math.round(Math.min(255, Math.max(0, v * factor + 255 * (1 - factor)))));

  // Binary search terang
  let low = 1, high = 2, bestBright = null;
  while (high - low > 0.01) {
    const mid = (low + high) / 2;
    const candidate = rgbToHex(...applyFactor(rgb, mid));
    if (isBlindFriendly(candidate, bgHex, type, minContrast)) {
      bestBright = candidate;
      high = mid;
    } else {
      low = mid;
    }
  }
  if (bestBright) results.push(bestBright);

  // Binary search gelap
  low = 0; high = 1; let bestDark = null;
  while (high - low > 0.01) {
    const mid = (low + high) / 2;
    const candidate = rgbToHex(...rgb.map(v => Math.round(v * mid)));
    if (isBlindFriendly(candidate, bgHex, type, minContrast)) {
      bestDark = candidate;
      low = mid;
    } else {
      high = mid;
    }
  }
  if (bestDark) results.push(bestDark);

  return Array.from(new Set(results));
}

/**
 * Mengevaluasi batch untuk semua tipe buta warna
 */
export function blindFriendlyBatch(textColors, bgHex, types = ["protanopia", "deuteranopia", "tritanopia"], minContrast = 4.5) {
  return textColors.flatMap(color =>
    types.map(type => ({
      textColor: color,
      type,
      blindFriendly: isBlindFriendly(color, bgHex, type, minContrast)
    }))
  );
}
