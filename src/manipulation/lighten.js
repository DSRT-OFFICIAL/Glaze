// ==================== lighten.js ====================
// Fungsi untuk mencerahkan warna (HEX / RGB / HSL)

// Mengimpor helper dari Utils
import { clamp } from "../core/Utils.js";
import { hexToRgb, rgbToHex, hexToHsl, hslToHex } from "../conversion/index.js";

/**
 * Lighten HEX color by percentage
 * @param {string} hex - Warna HEX, contoh "#FF0000"
 * @param {number} percent - Persentase pencerahan (0-100)
 * @returns {string} HEX yang sudah lebih terang
 */
export function lightenHex(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const newR = clamp(r + (255 - r) * (percent / 100), 0, 255);
  const newG = clamp(g + (255 - g) * (percent / 100), 0, 255);
  const newB = clamp(b + (255 - b) * (percent / 100), 0, 255);
  return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
}

/**
 * Lighten RGB color by percentage
 * @param {number} r - 0-255
 * @param {number} g - 0-255
 * @param {number} b - 0-255
 * @param {number} percent - 0-100
 * @returns {object} RGB object {r,g,b}
 */
export function lightenRgb(r, g, b, percent) {
  const newR = clamp(r + (255 - r) * (percent / 100), 0, 255);
  const newG = clamp(g + (255 - g) * (percent / 100), 0, 255);
  const newB = clamp(b + (255 - b) * (percent / 100), 0, 255);
  return { r: Math.round(newR), g: Math.round(newG), b: Math.round(newB) };
}

/**
 * Lighten HSL color by percentage
 * @param {number} h - 0-360
 * @param {number} s - 0-100
 * @param {number} l - 0-100
 * @param {number} percent - 0-100
 * @returns {object} HSL object {h,s,l} baru
 */
export function lightenHsl(h, s, l, percent) {
  const newL = clamp(l + (100 - l) * (percent / 100), 0, 100);
  return { h, s, l: Math.round(newL) };
}

/**
 * Lighten color (auto detect HEX or RGB object)
 * @param {string|object} color - HEX string atau {r,g,b} object
 * @param {number} percent - 0-100
 * @returns {string|object} Warna baru
 */
export function lighten(color, percent) {
  if (typeof color === "string" && color.startsWith("#")) {
    return lightenHex(color, percent);
  } else if (typeof color === "object" && color.r !== undefined) {
    return lightenRgb(color.r, color.g, color.b, percent);
  } else {
    throw new Error("Unsupported color format for lighten()");
  }
}
