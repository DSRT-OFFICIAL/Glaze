// ==================== hsv.js ====================

// Helper: reuse RGB ↔ HEX
import { hexToRgb, rgbToHex } from "./rgb.js";

// ---------- RGB <-> HSV ----------
export function rgbToHsv({ r, g, b }) {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === R) {
      h = 60 * (((G - B) / delta) % 6);
    } else if (max === G) {
      h = 60 * ((B - R) / delta + 2);
    } else {
      h = 60 * ((R - G) / delta + 4);
    }
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = max * 100;

  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
}

export function hsvToRgb({ h, s, v }) {
  s /= 100;
  v /= 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let R1, G1, B1;

  if (h >= 0 && h < 60) {
    [R1, G1, B1] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [R1, G1, B1] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [R1, G1, B1] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [R1, G1, B1] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [R1, G1, B1] = [x, 0, c];
  } else {
    [R1, G1, B1] = [c, 0, x];
  }

  const r = Math.round((R1 + m) * 255);
  const g = Math.round((G1 + m) * 255);
  const b = Math.round((B1 + m) * 255);

  return { r, g, b };
}

// ---------- HEX <-> HSV ----------
export function hexToHsv(hex) {
  return rgbToHsv(hexToRgb(hex));
}

export function hsvToHex(hsv) {
  return rgbToHex(hsvToRgb(hsv));
}
