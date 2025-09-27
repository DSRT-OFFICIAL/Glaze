// ==================== xyz.js ====================

// Helper: reuse RGB ↔ HEX
import { hexToRgb, rgbToHex } from "./rgb.js";

// ---------- RGB <-> XYZ ----------
export function rgbToXyz({ r, g, b }) {
  let [R, G, B] = [r / 255, g / 255, b / 255];

  R = R > 0.04045 ? Math.pow((R + 0.055) / 1.055, 2.4) : R / 12.92;
  G = G > 0.04045 ? Math.pow((G + 0.055) / 1.055, 2.4) : G / 12.92;
  B = B > 0.04045 ? Math.pow((B + 0.055) / 1.055, 2.4) : B / 12.92;

  R *= 100;
  G *= 100;
  B *= 100;

  const x = R * 0.4124 + G * 0.3576 + B * 0.1805;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = R * 0.0193 + G * 0.1192 + B * 0.9505;

  return { x, y, z };
}

export function xyzToRgb({ x, y, z }) {
  x /= 100;
  y /= 100;
  z /= 100;

  let R = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let G = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let B = x * 0.0557 + y * -0.2040 + z * 1.0570;

  R = R > 0.0031308 ? 1.055 * Math.pow(R, 1 / 2.4) - 0.055 : 12.92 * R;
  G = G > 0.0031308 ? 1.055 * Math.pow(G, 1 / 2.4) - 0.055 : 12.92 * G;
  B = B > 0.0031308 ? 1.055 * Math.pow(B, 1 / 2.4) - 0.055 : 12.92 * B;

  return {
    r: Math.min(255, Math.max(0, Math.round(R * 255))),
    g: Math.min(255, Math.max(0, Math.round(G * 255))),
    b: Math.min(255, Math.max(0, Math.round(B * 255))),
  };
}

// ---------- HEX <-> XYZ ----------
export function hexToXyz(hex) {
  return rgbToXyz(hexToRgb(hex));
}

export function xyzToHex(xyz) {
  return rgbToHex(xyzToRgb(xyz));
}
