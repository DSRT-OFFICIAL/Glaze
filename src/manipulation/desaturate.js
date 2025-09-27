// ==================== desaturate.js ====================
// Fungsi untuk menurunkan saturasi warna (HEX / RGB / HSL)

import { clamp } from "../core/Utils.js";
import { hexToHsl, hslToHex, hexToRgb, rgbToHex } from "../conversion/index.js";

/**
 * Desaturate HEX color by percentage
 * @param {string} hex - Warna HEX, contoh "#FF0000"
 * @param {number} percent - Persentase penurunan saturasi (0-100)
 * @returns {string} HEX warna yang sudah lebih pucat
 */
export function desaturateHex(hex, percent) {
  const { h, s, l } = hexToHsl(hex);
  const newS = clamp(s - percent, 0, 100);
  return hslToHex(h, newS, l);
}

/**
 * Desaturate RGB color by percentage
 * @param {number} r - 0-255
 * @param {number} g - 0-255
 * @param {number} b - 0-255
 * @param {number} percent - 0-100
 * @returns {object} RGB object {r,g,b} baru
 */
export function desaturateRgb(r, g, b, percent) {
  const { h, s, l } = rgbToHsl(r, g, b);
  const newS = clamp(s - percent, 0, 100);
  const hex = hslToHex(h, newS, l);
  return hexToRgb(hex);
}

/**
 * Desaturate HSL color by percentage
 * @param {number} h - 0-360
 * @param {number} s - 0-100
 * @param {number} l - 0-100
 * @param {number} percent - 0-100
 * @returns {object} HSL object {h,s,l} baru
 */
export function desaturateHsl(h, s, l, percent) {
  const newS = clamp(s - percent, 0, 100);
  return { h, s: newS, l };
}

/**
 * Desaturate color (auto detect HEX atau RGB object)
 * @param {string|object} color - HEX string atau {r,g,b} object
 * @param {number} percent - 0-100
 * @returns {string|object} warna baru
 */
export function desaturate(color, percent) {
  if (typeof color === "string" && color.startsWith("#")) {
    return desaturateHex(color, percent);
  } else if (typeof color === "object" && color.r !== undefined) {
    return desaturateRgb(color.r, color.g, color.b, percent);
  } else {
    throw new Error("Unsupported color format for desaturate()");
  }
}

/**
 * Helper: konversi RGB ke HSL
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {object} {h,s,l}
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;
  l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
