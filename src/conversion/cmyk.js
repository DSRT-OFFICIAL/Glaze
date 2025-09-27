// ==================== cmyk.js ====================

// Convert RGB to CMYK
export function rgbToCmyk({ r, g, b }) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

  return {
    c: +(c * 100).toFixed(2),
    m: +(m * 100).toFixed(2),
    y: +(y * 100).toFixed(2),
    k: +(k * 100).toFixed(2),
  };
}

// Convert CMYK to RGB
export function cmykToRgb({ c, m, y, k }) {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;

  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));

  return { r, g, b };
}

// Convert HEX to CMYK
export function hexToCmyk(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToCmyk({ r, g, b });
}

// Convert CMYK to HEX
export function cmykToHex(cmyk) {
  const { r, g, b } = cmykToRgb(cmyk);
  return rgbToHex({ r, g, b });
}

// Helper: reuse RGB ↔ HEX
import { hexToRgb, rgbToHex } from "./rgb.js";
