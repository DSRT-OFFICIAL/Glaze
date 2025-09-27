// ==================== ColorsManipulation.js ====================

import { hexToRgb, rgbToHex } from "./ColorsConversion.js";

// ---------- Lighten / Darken ----------
export function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.min(255, Math.round(r + (255 - r) * amount));
  const newG = Math.min(255, Math.round(g + (255 - g) * amount));
  const newB = Math.min(255, Math.round(b + (255 - b) * amount));
  return rgbToHex(newR, newG, newB);
}

export function darken(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.max(0, Math.round(r * (1 - amount)));
  const newG = Math.max(0, Math.round(g * (1 - amount)));
  const newB = Math.max(0, Math.round(b * (1 - amount)));
  return rgbToHex(newR, newG, newB);
}

// ---------- Opacity ----------
export function adjustOpacity(hex, alpha) {
  if (alpha < 0 || alpha > 1) throw new Error("Alpha must be between 0 and 1");
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ---------- Mix / Blend ----------
export function mix(hex1, hex2, weight = 0.5) {
  const w = weight;
  const { r: r1, g: g1, b: b1 } = hexToRgb(hex1);
  const { r: r2, g: g2, b: b2 } = hexToRgb(hex2);

  const r = Math.round(r1 * w + r2 * (1 - w));
  const g = Math.round(g1 * w + g2 * (1 - w));
  const b = Math.round(b1 * w + b2 * (1 - w));

  return rgbToHex(r, g, b);
}
