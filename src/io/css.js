// ==================== css.js ====================

// Konversi objek warna ke string CSS
export function colorToCss(color) {
  if (!color || typeof color !== "object") throw new Error("Invalid color object");

  const { r, g, b, a } = color;

  if (a !== undefined && a >= 0 && a <= 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

// Konversi string CSS ke objek warna {r, g, b, a?}
export function cssToColor(cssString) {
  if (typeof cssString !== "string") throw new Error("Invalid CSS string");

  // Remove whitespace and lowercase
  const str = cssString.replace(/\s+/g, "").toLowerCase();

  let match;

  // rgb(...) or rgba(...)
  if ((match = str.match(/^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:,([0-9.]+))?\)$/))) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;

    if ([r, g, b].some(v => v < 0 || v > 255)) throw new Error("RGB values must be 0-255");
    if (a !== undefined && (a < 0 || a > 1)) throw new Error("Alpha must be 0-1");

    return a !== undefined ? { r, g, b, a } : { r, g, b };
  }

  // hex format #RGB or #RRGGBB
  if ((match = str.match(/^#([a-f0-9]{3}|[a-f0-9]{6})$/))) {
    const hex = match[0];
    const c = hex.slice(1).length === 3 ? hex.slice(1).split("").map(ch => ch + ch).join("") : hex.slice(1);
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }

  throw new Error("Unsupported CSS color format");
}

// Membuat style CSS untuk background atau border
export function applyCssStyle(element, property, color) {
  if (!(element instanceof HTMLElement)) throw new Error("Invalid HTML element");
  element.style[property] = colorToCss(color);
}
