// ==================== contrast.js ====================

// Menghitung luminansi relatif sebuah warna (0–1)
export function luminance(hex) {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928
      ? c / 12.92
      : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Menghitung rasio kontras antara dua warna (WCAG)
export function contrastRatio(foreground, background) {
  const L1 = luminance(foreground);
  const L2 = luminance(background);
  return L1 > L2 ? (L1 + 0.05) / (L2 + 0.05) : (L2 + 0.05) / (L1 + 0.05);
}

// Menilai apakah kombinasi warna memenuhi standar AA/AAA
export function meetsContrast(foreground, background, level = "AA", largeText = false) {
  const ratio = contrastRatio(foreground, background);
  const threshold = {
    AA: largeText ? 3.0 : 4.5,
    AAA: largeText ? 4.5 : 7.0,
  };
  return ratio >= threshold[level];
}

// Helper: HEX → [R,G,B]
export function hexToRgb(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((ch) => ch + ch).join("");
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Optional: HEX array → luminance array
export function luminanceArray(hexArray) {
  return hexArray.map((hex) => luminance(hex));
}
