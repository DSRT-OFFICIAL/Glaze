// ==================== blindFriendly.js ====================

import { hexToRgb, rgbToHex } from "../conversion/rgb.js";
import { contrastRatio } from "./contrast.js";

/**
 * Simulasi buta warna (protanopia, deuteranopia, tritanopia)
 * @param {string} hex - Warna HEX asli
 * @param {string} type - "protanopia", "deuteranopia", "tritanopia"
 * @returns {string} - HEX hasil simulasi
 */
export function simulateColorBlindness(hex, type) {
  const { r, g, b } = hexToRgb(hex);

  let newR = r, newG = g, newB = b;

  switch (type) {
    case "protanopia": // merah lemah
      newR = 0.56667 * r + 0.43333 * g;
      newG = 0.55833 * r + 0.44167 * g;
      newB = b;
      break;

    case "deuteranopia": // hijau lemah
      newR = 0.625 * r + 0.375 * g;
      newG = 0.7 * r + 0.3 * g;
      newB = b;
      break;

    case "tritanopia": // biru lemah
      newR = r;
      newG = 0.95 * g + 0.05 * b;
      newB = 0.43333 * g + 0.56667 * b;
      break;

    default:
      throw new Error("Unknown color blindness type");
  }

  return rgbToHex(newR, newG, newB);
}

/**
 * Mengecek apakah warna aman untuk pengguna buta warna
 * @param {string} textHex - Warna teks
 * @param {string} bgHex - Warna background
 * @param {string} type - Tipe buta warna
 * @param {number} minContrast - rasio minimal
 * @returns {boolean} - true jika aman
 */
export function isBlindFriendly(textHex, bgHex, type, minContrast = 4.5) {
  const simText = simulateColorBlindness(textHex, type);
  const simBg = simulateColorBlindness(bgHex, type);
  const ratio = contrastRatio(simText, simBg);
  return ratio >= minContrast;
}

/**
 * Memberikan rekomendasi warna alternatif yang aman untuk buta warna
 * @param {string} textHex - Warna teks
 * @param {string} bgHex - Warna background
 * @param {string} type - Tipe buta warna
 * @param {number} minContrast - rasio minimal
 * @returns {string} - HEX alternatif
 */
export function suggestBlindFriendlyColor(textHex, bgHex, type, minContrast = 4.5) {
  if (isBlindFriendly(textHex, bgHex, type, minContrast)) return textHex;

  const steps = 20;
  let rgb = Object.values(hexToRgb(textHex));

  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;

    // Coba mencerahkan
    const lighter = rgb.map((v) => Math.min(255, v + (255 - v) * factor));
    const lighterHex = rgbToHex(lighter[0], lighter[1], lighter[2]);
    if (isBlindFriendly(lighterHex, bgHex, type, minContrast)) return lighterHex;

    // Coba menggelapkan
    const darker = rgb.map((v) => Math.max(0, v * (1 - factor)));
    const darkerHex = rgbToHex(darker[0], darker[1], darker[2]);
    if (isBlindFriendly(darkerHex, bgHex, type, minContrast)) return darkerHex;
  }

  return textHex; // fallback
}

/**
 * Mengevaluasi array warna teks terhadap background untuk semua tipe buta warna
 * @param {Array} textColors - Array HEX teks
 * @param {string} bgHex - Warna background
 * @param {Array} types - Array tipe buta warna ["protanopia", "deuteranopia", "tritanopia"]
 * @returns {Array} - Array { textColor, type, blindFriendly: boolean }
 */
export function blindFriendlyBatch(textColors, bgHex, types = ["protanopia", "deuteranopia", "tritanopia"]) {
  const results = [];
  textColors.forEach((color) => {
    types.forEach((type) => {
      results.push({
        textColor: color,
        type,
        blindFriendly: isBlindFriendly(color, bgHex, type),
      });
    });
  });
  return results;
}
