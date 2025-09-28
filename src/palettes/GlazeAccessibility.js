import { GlazeUtils } from "./GlazeUtils.js";

/**
 * Hitung luminance warna (WCAG)
 * @param {string} hex - warna hex, contoh: "#ffffff"
 * @returns {number} luminance antara 0–1
 */
export const luminance = (hex) => {
  const [r, g, b] = GlazeUtils.hexToRgb(hex).map((v) => v / 255);
  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

/**
 * Hitung contrast ratio antara dua warna
 * @param {string} hex1 - warna pertama
 * @param {string} hex2 - warna kedua
 * @returns {number} rasio kontras
 */
export const contrastRatio = (hex1, hex2) => {
  const L1 = luminance(hex1);
  const L2 = luminance(hex2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

/**
 * Cek apakah dua warna memenuhi standar WCAG
 * @param {string} hex1 - warna teks
 * @param {string} hex2 - warna background
 * @param {string} level - "AA" atau "AAA"
 * @param {boolean} largeText - apakah teks besar (>18px)
 * @returns {boolean} true jika accessible
 */
export const isAccessible = (hex1, hex2, level = "AA", largeText = false) => {
  const ratio = contrastRatio(hex1, hex2);
  if (level === "AA") return largeText ? ratio >= 3 : ratio >= 4.5;
  if (level === "AAA") return largeText ? ratio >= 4.5 : ratio >= 7;
  return false;
};

/**
 * Auto-generate warna teks/element agar aksesibel di background tertentu
 * @param {string} baseHex - warna awal
 * @param {string} backgroundHex - warna background
 * @param {string} level - "AA" atau "AAA"
 * @returns {string} hex baru yang aksesibel
 */
export const generateAccessibleVariant = (baseHex, backgroundHex, level = "AA") => {
  let variant = baseHex;
  let step = 5; // persen perubahan per iterasi
  let ratio = contrastRatio(variant, backgroundHex);

  // Tentukan threshold sesuai level
  const threshold = level === "AAA" ? 7 : 4.5;

  let maxIterations = 50; // untuk mencegah loop tak berujung
  while (ratio < threshold && maxIterations > 0) {
    const bgLum = luminance(backgroundHex);
    const varLum = luminance(variant);

    // Jika background terang, darken; jika gelap, lighten
    variant =
      bgLum > 0.5
        ? GlazeUtils.darken(variant, step)
        : GlazeUtils.lighten(variant, step);

    ratio = contrastRatio(variant, backgroundHex);
    maxIterations--;
  }

  return variant;
};

/**
 * Generate palet alternatif yang semuanya aksesibel
 * @param {string[]} palette - array warna hex
 * @param {string} backgroundHex - warna background
 * @param {string} level - "AA" atau "AAA"
 * @returns {string[]} palet baru yang aksesibel
 */
export const generateAccessiblePalette = (palette, backgroundHex, level = "AA") => {
  return palette.map((color) => generateAccessibleVariant(color, backgroundHex, level));
};

/**
 * Cek aksesibilitas antara semua warna di palet
 * @param {string[]} palette - array warna
 * @param {string} level - "AA" atau "AAA"
 * @returns {boolean[][]} matrix kontras [i][j] = true jika accessible
 */
export const checkPaletteAccessibility = (palette, level = "AA") => {
  const n = palette.length;
  const matrix = Array(n)
    .fill(null)
    .map(() => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        matrix[i][j] = true;
      } else {
        matrix[i][j] = isAccessible(palette[i], palette[j], level);
      }
    }
  }

  return matrix;
};
