// ==================== ColorsAccessibility.js ====================
import { hexToRgb } from "./ColorsConversion.js";

// Hitung relative luminance (WCAG formula)
function luminance({ r, g, b }) {
  const toLinear = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// ---------- Kontras ratio (WCAG 2.1) ----------
export function contrastRatio(hex1, hex2) {
  const lum1 = luminance(hexToRgb(hex1)) + 0.05;
  const lum2 = luminance(hexToRgb(hex2)) + 0.05;
  return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
}

// ---------- Cek apakah pass WCAG AA/AAA ----------
export function checkContrast(hex1, hex2, level = "AA", size = "small") {
  const ratio = contrastRatio(hex1, hex2);
  if (level === "AA") {
    return size === "small" ? ratio >= 4.5 : ratio >= 3;
  } else if (level === "AAA") {
    return size === "small" ? ratio >= 7 : ratio >= 4.5;
  }
  return false;
}

// ---------- Ambil teks otomatis yang accessible ----------
export function bestTextColor(bgHex) {
  const whiteContrast = contrastRatio(bgHex, "#FFFFFF");
  const blackContrast = contrastRatio(bgHex, "#000000");
  return whiteContrast >= blackContrast ? "#FFFFFF" : "#000000";
}

// ---------- Cari warna teks alternatif ----------
export function suggestTextColors(bgHex, candidates = ["#000000", "#FFFFFF"]) {
  return candidates
    .map((c) => ({
      color: c,
      ratio: contrastRatio(bgHex, c),
    }))
    .sort((a, b) => b.ratio - a.ratio);
}

// ---------- Debug helper ----------
export function contrastReport(hex1, hex2) {
  const ratio = contrastRatio(hex1, hex2).toFixed(2);
  return {
    ratio,
    AA_small: ratio >= 4.5,
    AA_large: ratio >= 3,
    AAA_small: ratio >= 7,
    AAA_large: ratio >= 4.5,
  };
      }
