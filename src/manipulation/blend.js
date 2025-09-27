// ==================== blend.js ====================
// Fungsi untuk menggabungkan dua warna dengan mode blend

import { clamp } from "../core/Utils.js";
import { hexToRgb, rgbToHex } from "../conversion/index.js";

/**
 * Blend two RGB colors with a given ratio
 * @param {object} color1 - {r,g,b}
 * @param {object} color2 - {r,g,b}
 * @param {number} ratio - 0-1
 * @returns {object} blended RGB
 */
export function blendRgb(color1, color2, ratio = 0.5) {
  const r = clamp(Math.round(color1.r * (1 - ratio) + color2.r * ratio), 0, 255);
  const g = clamp(Math.round(color1.g * (1 - ratio) + color2.g * ratio), 0, 255);
  const b = clamp(Math.round(color1.b * (1 - ratio) + color2.b * ratio), 0, 255);
  return { r, g, b };
}

/**
 * Blend two HEX colors with a given ratio
 * @param {string} hex1 - "#RRGGBB"
 * @param {string} hex2 - "#RRGGBB"
 * @param {number} ratio - 0-1
 * @returns {string} HEX blended color
 */
export function blendHex(hex1, hex2, ratio = 0.5) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const blended = blendRgb(rgb1, rgb2, ratio);
  return rgbToHex(blended.r, blended.g, blended.b);
}

/**
 * Blend with predefined modes
 * Supported modes: normal, multiply, screen, overlay
 * @param {object} color1 - {r,g,b}
 * @param {object} color2 - {r,g,b}
 * @param {string} mode - blending mode
 * @returns {object} blended RGB
 */
export function blendMode(color1, color2, mode = "normal") {
  let r, g, b;

  switch (mode.toLowerCase()) {
    case "multiply":
      r = clamp(Math.round((color1.r * color2.r) / 255), 0, 255);
      g = clamp(Math.round((color1.g * color2.g) / 255), 0, 255);
      b = clamp(Math.round((color1.b * color2.b) / 255), 0, 255);
      break;

    case "screen":
      r = clamp(Math.round(255 - ((255 - color1.r) * (255 - color2.r)) / 255), 0, 255);
      g = clamp(Math.round(255 - ((255 - color1.g) * (255 - color2.g)) / 255), 0, 255);
      b = clamp(Math.round(255 - ((255 - color1.b) * (255 - color2.b)) / 255), 0, 255);
      break;

    case "overlay":
      r = color1.r < 128
        ? clamp(Math.round((2 * color1.r * color2.r) / 255), 0, 255)
        : clamp(Math.round(255 - 2 * (255 - color1.r) * (255 - color2.r) / 255), 0, 255);
      g = color1.g < 128
        ? clamp(Math.round((2 * color1.g * color2.g) / 255), 0, 255)
        : clamp(Math.round(255 - 2 * (255 - color1.g) * (255 - color2.g) / 255), 0, 255);
      b = color1.b < 128
        ? clamp(Math.round((2 * color1.b * color2.b) / 255), 0, 255)
        : clamp(Math.round(255 - 2 * (255 - color1.b) * (255 - color2.b) / 255), 0, 255);
      break;

    case "normal":
    default:
      r = color2.r;
      g = color2.g;
      b = color2.b;
      break;
  }

  return { r, g, b };
}

/**
 * Blend two HEX colors with mode
 * @param {string} hex1
 * @param {string} hex2
 * @param {string} mode - normal, multiply, screen, overlay
 * @returns {string} HEX blended
 */
export function blendHexMode(hex1, hex2, mode = "normal") {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const blended = blendMode(rgb1, rgb2, mode);
  return rgbToHex(blended.r, blended.g, blended.b);
}
