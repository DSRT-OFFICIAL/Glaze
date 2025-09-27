// ==================== gradients/conic.js ====================

/**
 * Membuat gradasi conic CSS dari array warna
 * @param {string[]} colors - array warna dalam format HEX atau RGB
 * @param {string} from - sudut awal gradasi, default "0deg"
 * @param {string} position - posisi pusat gradasi, default "center"
 * @returns {string} - string CSS conic-gradient
 */
export function conicGradient(colors, from = "0deg", position = "center") {
  if (!Array.isArray(colors) || colors.length < 2) {
    throw new Error("conicGradient requires an array of at least 2 colors");
  }
  return `conic-gradient(from ${from} at ${position}, ${colors.join(", ")})`;
}

/**
 * Membuat gradasi conic dengan jumlah step tertentu
 * @param {string} startColor - warna awal
 * @param {string} endColor - warna akhir
 * @param {number} steps - jumlah step gradasi
 * @returns {string[]} - array warna HEX setiap step
 */
import { hexToRgb, rgbToHex } from "../conversion/rgb.js";
import { clamp } from "../core/Utils.js";

export function conicGradientSteps(startColor, endColor, steps = 10) {
  if (steps < 2) throw new Error("steps must be >= 2");

  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);
  const gradient = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const r = clamp(Math.round(start.r + (end.r - start.r) * t), 0, 255);
    const g = clamp(Math.round(start.g + (end.g - start.g) * t), 0, 255);
    const b = clamp(Math.round(start.b + (end.b - start.b) * t), 0, 255);
    gradient.push(rgbToHex(r, g, b));
  }

  return gradient;
}
