// ==================== randomGradient.js ====================

import { randomHex, randomRgb, randomHsl } from "./randomColor.js";

/**
 * Membuat gradient acak
 * @param {number} stops Jumlah stop warna (default: 2-5)
 * @param {string} type Jenis gradient: 'linear', 'radial', 'conic' (default: 'linear')
 * @param {string} format Format warna: 'hex', 'rgb', 'hsl' (default: 'hex')
 * @returns {string} Gradient CSS
 */
export function randomGradient(stops = 3, type = "linear", format = "hex") {
  const colors = [];
  for (let i = 0; i < stops; i++) {
    let color;
    switch (format.toLowerCase()) {
      case "hex":
        color = randomHex();
        break;
      case "rgb":
        color = randomRgb();
        break;
      case "hsl":
        color = randomHsl();
        break;
      default:
        color = randomHex();
        break;
    }
    colors.push(color);
  }

  const gradientType = type.toLowerCase();
  switch (gradientType) {
    case "linear":
      return `linear-gradient(${colors.join(", ")})`;
    case "radial":
      return `radial-gradient(${colors.join(", ")})`;
    case "conic":
      return `conic-gradient(${colors.join(", ")})`;
    default:
      return `linear-gradient(${colors.join(", ")})`;
  }
}

/**
 * Membuat beberapa gradient acak sekaligus
 * @param {number} count Jumlah gradient
 * @param {number} stops Jumlah stop warna per gradient
 * @param {string} type Jenis gradient
 * @param {string} format Format warna
 * @returns {string[]} Array gradient CSS
 */
export function randomGradients(count = 3, stops = 3, type = "linear", format = "hex") {
  const gradients = [];
  for (let i = 0; i < count; i++) {
    gradients.push(randomGradient(stops, type, format));
  }
  return gradients;
}
