// ==================== contrastMap.js ====================

/**
 * Hitung luminance dari RGB
 * Mengikuti formula WCAG: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 * @param {number} r 0-255
 * @param {number} g 0-255
 * @param {number} b 0-255
 * @returns {number} 0-1
 */
function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

/**
 * Hitung rasio kontras antar dua warna
 * @param {Array} rgb1 [r,g,b]
 * @param {Array} rgb2 [r,g,b]
 * @returns {number} rasio kontras
 */
export function contrastRatio(rgb1, rgb2) {
  const L1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const L2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Buat peta kontras dari ImageData
 * @param {ImageData} imageData
 * @param {number} threshold - nilai luminance threshold (0-1)
 * @returns {Uint8ClampedArray} peta kontras (hitam/putih)
 */
export function generateContrastMap(imageData, threshold = 0.5) {
  const data = imageData.data;
  const map = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const lum = getLuminance(r, g, b);

    const value = lum > threshold ? 255 : 0;
    map[i] = map[i + 1] = map[i + 2] = value;
    map[i + 3] = 255; // alpha tetap penuh
  }

  return map;
}

/**
 * Buat canvas ImageData dari peta kontras
 * @param {Uint8ClampedArray} contrastMap
 * @param {number} width
 * @param {number} height
 * @returns {ImageData}
 */
export function contrastMapToImageData(contrastMap, width, height) {
  return new ImageData(contrastMap, width, height);
}
