// ==================== ColorsRandom.js ====================
import { rgbToHex } from "./ColorsConversion.js";

// Random HEX color
export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return rgbToHex(r, g, b);
}

// Random Palette (array warna acak)
export function getRandomPalette(count = 5) {
  return Array.from({ length: count }, () => getRandomColor());
}

// (Optional) Generate palette dari gambar (placeholder function)
export async function generatePaletteFromImage(imgElement, count = 5) {
  // NOTE: butuh canvas API, bisa diisi pakai `color-thief` atau `vibrant.js`
  // Di sini placeholder return warna random
  return getRandomPalette(count);
}
