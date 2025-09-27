// ==================== invert.js ====================
// Fungsi untuk membalikkan warna (invert)
// Mendukung HEX dan RGB

import { hexToRgb, rgbToHex } from "../conversion/index.js";

/**
 * Invert RGB color
 * @param {object} color - {r, g, b}
 * @returns {object} inverted RGB
 */
export function invertRgb({ r, g, b }) {
  return {
    r: 255 - r,
    g: 255 - g,
    b: 255 - b,
  };
}

/**
 * Invert HEX color
 * @param {string} hex - "#RRGGBB"
 * @returns {string} inverted HEX
 */
export function invertHex(hex) {
  const rgb = hexToRgb(hex);
  const inverted = invertRgb(rgb);
  return rgbToHex(inverted.r, inverted.g, inverted.b);
}

/**
 * Invert multiple RGB colors
 * @param {Array<object>} colors - array of {r, g, b}
 * @returns {Array<object>} inverted RGB array
 */
export function invertMultipleRgb(colors) {
  return colors.map(invertRgb);
}

/**
 * Invert multiple HEX colors
 * @param {Array<string>} hexColors - array of HEX strings
 * @returns {Array<string>} inverted HEX array
 */
export function invertMultipleHex(hexColors) {
  return hexColors.map(invertHex);
}
