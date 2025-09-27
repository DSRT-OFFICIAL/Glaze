// ==================== randomColor.js ====================

// Fungsi untuk menghasilkan satu nilai integer acak antara min dan max (inklusif)
function randomInt(min = 0, max = 255) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Menghasilkan warna RGB acak
export function randomRgb() {
  return {
    r: randomInt(),
    g: randomInt(),
    b: randomInt(),
  };
}

// Mengubah RGB menjadi HEX
export function rgbToHex({ r, g, b }) {
  const clamp = (v) => Math.max(0, Math.min(255, v));
  return (
    "#" +
    ((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b))
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

// Menghasilkan warna HEX acak
export function randomHex() {
  return rgbToHex(randomRgb());
}

// Menghasilkan warna HSL acak
export function randomHsl() {
  const h = randomInt(0, 360);
  const s = randomInt(0, 100);
  const l = randomInt(0, 100);
  return { h, s, l };
}
