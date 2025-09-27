// ==================== darken.js ====================
// Fungsi untuk menggelapkan warna (HEX / RGB / HSL)

// Mengimpor helper dari Utils
import { clamp } from "../core/Utils.js";
import { hexToRgb, rgbToHex, hexToHsl, hslToHex } from "../conversion/index.js";

/**
 * Darken HEX color by percentage
 * @param {string} hex - Warna HEX, contoh "#FF0000"
 * @param {number} percent - Persentase penggelapan (0-100)
 * @returns {string} HEX yang sudah lebih gelap
 */
export function darkenHex(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const newR = clamp(r * (1 - percent / 100), 0, 255);
  const newG = clamp(g * (1 - percent / 100), 0, 255);
  const newB = clamp(b * (1 - percent / 100), 0, 255);
  return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
}

/**
 * Darken RGB color by percentage
 * @param {number} r - 0-255
 * @param {number} g - 0-255
 * @param {number} b - 0-255
 * @param {number} percent - 0-100
 * @returns {object} RGB object {r,g,b}
 */
export function darkenRgb(r, g, b, percent) {
  const newR = clamp(r * (1 - percent / 100), 0, 255);
  const newG = clamp(g * (1 - percent / 100), 0, 255);
  const newB = clamp(b * (1 - percent / 100), 0, 255);
  return { r: Math.round(newR), g: Math.round(newG), b: Math.round(newB) };
}

/**
 * Darken HSL color by percentage
 * @param {number} h - 0-360
 * @param {number} s - 0-100
 * @param {number} l - 0-100
 * @param {number} percent - 0-100
 * @returns {object} HSL object {h,s,l} baru
 */
export function darkenHsl(h, s, l, percent) {
  const newL = clamp(l * (1 - percent / 100), 0, 100);
  return { h, s, l: Math.round(newL) };
}

/**
 * Darken color (auto detect HEX or RGB object)
 * @param {string|object} color - HEX string atau {r,g,b} object
 * @param {number} percent - 0-100
 * @returns {string|object} Warna baru
 */
export function darken(color, percent) {
  if (typeof color === "string" && color.startsWith("#")) {
    return darkenHex(color, percent);
  } else if (typeof color === "object" && color.r !== undefined) {
    return darkenRgb(color.r, color.g, color.b, percent);
  } else {
    throw new Error("Unsupported color format for darken()");
  }
}
