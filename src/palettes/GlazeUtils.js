/**
 * GlazeUtils.js
 * Utility functions untuk manipulasi warna
 */

export const GlazeUtils = {
  /**
   * Convert HEX ke RGB
   * @param {string} hex - contoh "#ffffff"
   * @returns {[number, number, number]} [r, g, b]
   */
  hexToRgb: (hex) => {
    let cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return [r, g, b];
  },

  /**
   * Convert RGB ke HEX
   * @param {number} r 
   * @param {number} g 
   * @param {number} b 
   * @returns {string} hex color
   */
  rgbToHex: (r, g, b) => {
    const toHex = (v) => {
      const h = v.toString(16);
      return h.length === 1 ? "0" + h : h;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },

  /**
   * Lighten warna persentase tertentu
   * @param {string} hex - warna awal
   * @param {number} percent - 0–100
   * @returns {string} hex baru
   */
  lighten: (hex, percent) => {
    const [r, g, b] = GlazeUtils.hexToRgb(hex);
    const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    return GlazeUtils.rgbToHex(newR, newG, newB);
  },

  /**
   * Darken warna persentase tertentu
   * @param {string} hex - warna awal
   * @param {number} percent - 0–100
   * @returns {string} hex baru
   */
  darken: (hex, percent) => {
    const [r, g, b] = GlazeUtils.hexToRgb(hex);
    const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));
    return GlazeUtils.rgbToHex(newR, newG, newB);
  },

  /**
   * Linear interpolation antara dua warna
   * @param {string} hex1 
   * @param {string} hex2 
   * @param {number} t - 0–1
   * @returns {string} hex baru
   */
  lerp: (hex1, hex2, t) => {
    const [r1, g1, b1] = GlazeUtils.hexToRgb(hex1);
    const [r2, g2, b2] = GlazeUtils.hexToRgb(hex2);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return GlazeUtils.rgbToHex(r, g, b);
  },

  /**
   * Blend dua warna dengan ratio tertentu
   * @param {string} hex1 
   * @param {string} hex2 
   * @param {number} ratio - 0–1, proporsi hex1
   * @returns {string} hex baru
   */
  blend: (hex1, hex2, ratio = 0.5) => {
    return GlazeUtils.lerp(hex1, hex2, ratio);
  },

  /**
   * Hitung luminance warna (digunakan untuk kontras)
   * @param {string} hex 
   * @returns {number} luminance 0–1
   */
  luminance: (hex) => {
    const [r, g, b] = GlazeUtils.hexToRgb(hex).map((v) => v / 255);
    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  },
};
