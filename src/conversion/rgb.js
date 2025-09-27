// ==================== rgb.js ====================

// Convert RGB object to HEX string
export function rgbToHex({ r, g, b }) {
  if ([r, g, b].some(v => v < 0 || v > 255))
    throw new Error("RGB values must be between 0 and 255");
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}

// Convert HEX string to RGB object
export function hexToRgb(hex) {
  if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex))
    throw new Error("Invalid HEX format");
  let c = hex.substring(1);
  if (c.length === 3) c = c.split("").map(ch => ch + ch).join("");
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Convert RGB object to normalized array [0,1]
export function rgbToNormalized({ r, g, b }) {
  return [r / 255, g / 255, b / 255];
}

// Convert normalized array [0,1] to RGB object
export function normalizedToRgb([r, g, b]) {
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Convert RGB to CSS string
export function rgbToCss({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`;
}

// Convert RGBA to CSS string
export function rgbaToCss({ r, g, b, a = 1 }) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
