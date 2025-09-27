// ==================== PaletteUtils.js ====================
import { hexToHsl, hslToHex } from "./ColorsConversion.js";

// ---- Generate Shades (darker) & Tints (lighter) ----
export function generateShades(hex, steps = 5) {
  const { h, s, l } = hexToHsl(hex);
  const shades = [];
  for (let i = 0; i < steps; i++) {
    const newL = Math.max(0, l - i * (l / steps));
    shades.push(hslToHex(h, s, newL));
  }
  return shades;
}

export function generateTints(hex, steps = 5) {
  const { h, s, l } = hexToHsl(hex);
  const tints = [];
  for (let i = 0; i < steps; i++) {
    const newL = Math.min(100, l + i * ((100 - l) / steps));
    tints.push(hslToHex(h, s, newL));
  }
  return tints;
}

// ---- Generate Complementary Colors ----
export function generateComplementary(hex) {
  const { h, s, l } = hexToHsl(hex);
  const compHue = (h + 180) % 360;
  return [hex, hslToHex(compHue, s, l)];
}

// ---- Generate Split Complementary Colors ----
export function generateSplitComplementary(hex, angle = 30) {
  const { h, s, l } = hexToHsl(hex);
  return [
    hex,
    hslToHex((h + 180 - angle + 360) % 360, s, l),
    hslToHex((h + 180 + angle) % 360, s, l),
  ];
}

// ---- Generate Analogous Colors ----
export function generateAnalogous(hex, angle = 30) {
  const { h, s, l } = hexToHsl(hex);
  return [
    hslToHex((h - angle + 360) % 360, s, l),
    hex,
    hslToHex((h + angle) % 360, s, l),
  ];
}

// ---- Generate Triadic Colors ----
export function generateTriadic(hex) {
  const { h, s, l } = hexToHsl(hex);
  return [
    hex,
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l),
  ];
}

// ---- Generate Tetradic Colors (Rectangle) ----
export function generateTetradic(hex) {
  const { h, s, l } = hexToHsl(hex);
  return [
    hex,
    hslToHex((h + 90) % 360, s, l),
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 270) % 360, s, l),
  ];
}

// ---- Generate Square Colors ----
export function generateSquare(hex) {
  const { h, s, l } = hexToHsl(hex);
  return [
    hex,
    hslToHex((h + 90) % 360, s, l),
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 270) % 360, s, l),
  ];
}

// ---- Generate Monochromatic Palette ----
export function generateMonochromatic(hex, steps = 5) {
  const { h, s, l } = hexToHsl(hex);
  const palette = [];
  for (let i = 0; i < steps; i++) {
    const newS = Math.min(100, Math.max(0, s + (i - Math.floor(steps / 2)) * 15));
    palette.push(hslToHex(h, newS, l));
  }
  return palette;
}
