// ==================== randomPalette.js ====================

import { randomHex, randomHsl, randomRgb } from "./randomColor.js";

// Fungsi untuk membuat palette acak dari jumlah warna tertentu
export function randomPalette(count = 5, format = "hex") {
  const palette = [];
  for (let i = 0; i < count; i++) {
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
    palette.push(color);
  }
  return palette;
}

// Fungsi untuk membuat beberapa palette sekaligus
export function randomPalettes(count = 3, colorsPerPalette = 5, format = "hex") {
  const palettes = [];
  for (let i = 0; i < count; i++) {
    palettes.push(randomPalette(colorsPerPalette, format));
  }
  return palettes;
}
