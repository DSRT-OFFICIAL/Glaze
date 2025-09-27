// ==================== lab.js ====================

// Helper: reuse RGB ↔ HEX
import { hexToRgb, rgbToHex } from "./rgb.js";

// ---------- RGB <-> XYZ ----------
function rgbToXyz({ r, g, b }) {
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

function xyzToRgb({ x, y, z }) {
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

// ---------- XYZ <-> LAB ----------
function xyzToLab({ x, y, z }) {
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  let X = x / refX;
  let Y = y / refY;
  let Z = z / refZ;

  X = X > 0.008856 ? Math.cbrt(X) : (7.787 * X) + (16 / 116);
  Y = Y > 0.008856 ? Math.cbrt(Y) : (7.787 * Y) + (16 / 116);
  Z = Z > 0.008856 ? Math.cbrt(Z) : (7.787 * Z) + (16 / 116);

  const L = (116 * Y) - 16;
  const a = 500 * (X - Y);
  const b = 200 * (Y - Z);

  return { L: +L.toFixed(2), a: +a.toFixed(2), b: +b.toFixed(2) };
}

function labToXyz({ L, a, b }) {
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  let Y = (L + 16) / 116;
  let X = a / 500 + Y;
  let Z = Y - b / 200;

  X = Math.pow(X, 3) > 0.008856 ? Math.pow(X, 3) : (X - 16 / 116) / 7.787;
  Y = Math.pow(Y, 3) > 0.008856 ? Math.pow(Y, 3) : (Y - 16 / 116) / 7.787;
  Z = Math.pow(Z, 3) > 0.008856 ? Math.pow(Z, 3) : (Z - 16 / 116) / 7.787;

  return { x: X * refX, y: Y * refY, z: Z * refZ };
}

// ---------- RGB <-> LAB ----------
export function rgbToLab(rgb) {
  return xyzToLab(rgbToXyz(rgb));
}

export function labToRgb(lab) {
  return xyzToRgb(labToXyz(lab));
}

// ---------- HEX <-> LAB ----------
export function hexToLab(hex) {
  return rgbToLab(hexToRgb(hex));
}

export function labToHex(lab) {
  return rgbToHex(labToRgb(lab));
}
