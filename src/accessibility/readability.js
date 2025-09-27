// ==================== readability.js ====================

import { contrastRatio, meetsContrast, hexToRgb } from "../accessibility/contrast.js";

/**
 * Menilai keterbacaan teks terhadap background
 * @param {string} textColor - Warna teks (HEX)
 * @param {string} bgColor - Warna background (HEX)
 * @param {Object} options - Opsi tambahan
 * @param {string} options.level - "AA" atau "AAA"
 * @param {boolean} options.largeText - true jika teks > 18px atau bold > 14px
 * @returns {Object} { ratio, passes }
 */
export function readability(textColor, bgColor, options = {}) {
  const { level = "AA", largeText = false } = options;
  const ratio = contrastRatio(textColor, bgColor);
  const passes = meetsContrast(textColor, bgColor, level, largeText);
  return { ratio: ratio.toFixed(2), passes };
}

/**
 * Memberikan saran teks agar lebih readable (menggelapkan/mencerahkan)
 * @param {string} textColor - Warna teks (HEX)
 * @param {string} bgColor - Warna background (HEX)
 * @param {string} level - "AA" atau "AAA"
 * @param {boolean} largeText - true jika teks besar
 * @returns {string} - HEX teks yang disarankan
 */
export function suggestReadableColor(textColor, bgColor, level = "AA", largeText = false) {
  let ratio = contrastRatio(textColor, bgColor);
  if (meetsContrast(textColor, bgColor, level, largeText)) return textColor;

  // Coba gelapkan atau mencerahkan teks
  const steps = 20; // jumlah iterasi
  let rgb = hexToRgb(textColor);

  for (let i = 0; i < steps; i++) {
    const factor = i / steps;
    const darker = rgb.map((v) => Math.max(0, v * (1 - factor)));
    const lighter = rgb.map((v) => Math.min(255, v + (255 - v) * factor));

    const darkerHex = rgbToHex(darker[0], darker[1], darker[2]);
    const lighterHex = rgbToHex(lighter[0], lighter[1], lighter[2]);

    if (meetsContrast(darkerHex, bgColor, level, largeText)) return darkerHex;
    if (meetsContrast(lighterHex, bgColor, level, largeText)) return lighterHex;
  }

  return textColor; // fallback
}

// Helper: RGB → HEX (digunakan internal)
function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b))
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

/**
 * Menilai array teks vs background sekaligus
 * @param {Array} textColors - Array HEX teks
 * @param {string} bgColor - Background HEX
 * @param {Object} options - Opsi level & largeText
 * @returns {Array} - Array { textColor, ratio, passes }
 */
export function readabilityBatch(textColors, bgColor, options = {}) {
  return textColors.map((color) => readability(color, bgColor, options));
}
