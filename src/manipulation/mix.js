// ==================== mix.js ====================
// Fungsi untuk mencampur dua warna dengan rasio tertentu
// Bisa digunakan untuk palet otomatis, gradasi, atau blending sederhana

import { clamp } from "../core/Utils.js";
import { hexToRgb, rgbToHex } from "../conversion/index.js";

/**
 * Mix two RGB colors with a given ratio
 * @param {object} color1 - {r,g,b}
 * @param {object} color2 - {r,g,b}
 * @param {number} ratio - 0-1 (default 0.5)
 * @returns {object} mixed RGB
 */
export function mixRgb(color1, color2, ratio = 0.5) {
  const r = clamp(Math.round(color1.r * (1 - ratio) + color2.r * ratio), 0, 255);
  const g = clamp(Math.round(color1.g * (1 - ratio) + color2.g * ratio), 0, 255);
  const b = clamp(Math.round(color1.b * (1 - ratio) + color2.b * ratio), 0, 255);
  return { r, g, b };
}

/**
 * Mix two HEX colors with a given ratio
 * @param {string} hex1 - "#RRGGBB"
 * @param {string} hex2 - "#RRGGBB"
 * @param {number} ratio - 0-1
 * @returns {string} mixed HEX
 */
export function mixHex(hex1, hex2, ratio = 0.5) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const mixed = mixRgb(rgb1, rgb2, ratio);
  return rgbToHex(mixed.r, mixed.g, mixed.b);
}

/**
 * Mix multiple RGB colors
 * @param {Array<object>} colors - array of {r,g,b}
 * @param {Array<number>} ratios - array of ratios, optional
 * @returns {object} mixed RGB
 */
export function mixMultipleRgb(colors, ratios) {
  if (!colors || colors.length === 0) throw new Error("No colors provided");
  const total = colors.length;
  let r = 0, g = 0, b = 0;

  if (ratios && ratios.length === colors.length) {
    const sum = ratios.reduce((a, b) => a + b, 0);
    colors.forEach((c, i) => {
      const factor = ratios[i] / sum;
      r += c.r * factor;
      g += c.g * factor;
      b += c.b * factor;
    });
  } else {
    colors.forEach(c => {
      r += c.r / total;
      g += c.g / total;
      b += c.b / total;
    });
  }

  return { r: clamp(Math.round(r), 0, 255), g: clamp(Math.round(g), 0, 255), b: clamp(Math.round(b), 0, 255) };
}

/**
 * Mix multiple HEX colors
 * @param {Array<string>} hexColors - array of HEX strings
 * @param {Array<number>} ratios - array of ratios, optional
 * @returns {string} mixed HEX
 */
export function mixMultipleHex(hexColors, ratios) {
  const rgbColors = hexColors.map(hex => hexToRgb(hex));
  const mixed = mixMultipleRgb(rgbColors, ratios);
  return rgbToHex(mixed.r, mixed.g, mixed.b);
}
