// ==================== harmony.js ====================

import { hexToHsl, hslToHex } from "../conversion/index.js";

// Complementary: warna berlawanan 180°
export function getComplementary(hex) {
  const { h, s, l } = hexToHsl(hex);
  const compH = (h + 180) % 360;
  return hslToHex(compH, s, l);
}

// Analogous: dua warna ±30° dari warna utama
export function getAnalogous(hex) {
  const { h, s, l } = hexToHsl(hex);
  const analog1 = (h + 30) % 360;
  const analog2 = (h + 330) % 360; // -30° sama dengan +330°
  return [hslToHex(analog1, s, l), hslToHex(analog2, s, l)];
}

// Triadic: tiga warna terpisah 120°
export function getTriadic(hex) {
  const { h, s, l } = hexToHsl(hex);
  const triad1 = (h + 120) % 360;
  const triad2 = (h + 240) % 360;
  return [hslToHex(triad1, s, l), hslToHex(triad2, s, l)];
}

// Tetradic: dua pasang warna komplementer (rectangle)
export function getTetradic(hex) {
  const { h, s, l } = hexToHsl(hex);
  const tetrad1 = (h + 90) % 360;
  const tetrad2 = (h + 180) % 360;
  const tetrad3 = (h + 270) % 360;
  return [hslToHex(tetrad1, s, l), hslToHex(tetrad2, s, l), hslToHex(tetrad3, s, l)];
}
