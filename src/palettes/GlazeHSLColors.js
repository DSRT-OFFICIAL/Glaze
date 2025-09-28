// ==================== GlazeHSLColors.js ====================

// Representasi warna dalam format HSL + utilitas konversi
export class GlazeHSL {
  constructor(h, s, l) {
    this.h = h; // Hue: 0–360
    this.s = s; // Saturation: 0–100 (%)
    this.l = l; // Lightness: 0–100 (%)
  }

  // Konversi HSL -> RGB (0–255)
  toRGB() {
    let h = this.h / 360;
    let s = this.s / 100;
    let l = this.l / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  // Konversi ke HEX
  toHex() {
    const { r, g, b } = this.toRGB();
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  // Konversi ke CSS string
  toCSS() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  }

  // Konversi ke Float untuk WebGL
  toFloat() {
    const { r, g, b } = this.toRGB();
    return { r: r / 255, g: g / 255, b: b / 255 };
  }
}

// ==================== PRESET HSL COLORS ====================
// Struktur: warna -> level -> GlazeHSL(h, s, l)
export const GlazeHSLColors = {
  red: {
    50: new GlazeHSL(0, 100, 95),
    100: new GlazeHSL(0, 100, 85),
    200: new GlazeHSL(0, 100, 75),
    300: new GlazeHSL(0, 100, 65),
    400: new GlazeHSL(0, 100, 55),
    500: new GlazeHSL(0, 100, 45),
    600: new GlazeHSL(0, 100, 35),
    700: new GlazeHSL(0, 100, 25),
    800: new GlazeHSL(0, 100, 20),
    900: new GlazeHSL(0, 100, 15),
  },
  orange: {
    50: new GlazeHSL(30, 100, 95),
    100: new GlazeHSL(30, 100, 85),
    200: new GlazeHSL(30, 100, 75),
    300: new GlazeHSL(30, 100, 65),
    400: new GlazeHSL(30, 100, 55),
    500: new GlazeHSL(30, 100, 45),
    600: new GlazeHSL(30, 100, 35),
    700: new GlazeHSL(30, 100, 25),
    800: new GlazeHSL(30, 100, 20),
    900: new GlazeHSL(30, 100, 15),
  },
  yellow: {
    50: new GlazeHSL(60, 100, 95),
    100: new GlazeHSL(60, 100, 85),
    200: new GlazeHSL(60, 100, 75),
    300: new GlazeHSL(60, 100, 65),
    400: new GlazeHSL(60, 100, 55),
    500: new GlazeHSL(60, 100, 45),
    600: new GlazeHSL(60, 100, 35),
    700: new GlazeHSL(60, 100, 25),
    800: new GlazeHSL(60, 100, 20),
    900: new GlazeHSL(60, 100, 15),
  },
  green: {
    50: new GlazeHSL(120, 100, 95),
    100: new GlazeHSL(120, 100, 85),
    200: new GlazeHSL(120, 100, 75),
    300: new GlazeHSL(120, 100, 65),
    400: new GlazeHSL(120, 100, 55),
    500: new GlazeHSL(120, 100, 45),
    600: new GlazeHSL(120, 100, 35),
    700: new GlazeHSL(120, 100, 25),
    800: new GlazeHSL(120, 100, 20),
    900: new GlazeHSL(120, 100, 15),
  },
  cyan: {
    50: new GlazeHSL(180, 100, 95),
    100: new GlazeHSL(180, 100, 85),
    200: new GlazeHSL(180, 100, 75),
    300: new GlazeHSL(180, 100, 65),
    400: new GlazeHSL(180, 100, 55),
    500: new GlazeHSL(180, 100, 45),
    600: new GlazeHSL(180, 100, 35),
    700: new GlazeHSL(180, 100, 25),
    800: new GlazeHSL(180, 100, 20),
    900: new GlazeHSL(180, 100, 15),
  },
  blue: {
    50: new GlazeHSL(240, 100, 95),
    100: new GlazeHSL(240, 100, 85),
    200: new GlazeHSL(240, 100, 75),
    300: new GlazeHSL(240, 100, 65),
    400: new GlazeHSL(240, 100, 55),
    500: new GlazeHSL(240, 100, 45),
    600: new GlazeHSL(240, 100, 35),
    700: new GlazeHSL(240, 100, 25),
    800: new GlazeHSL(240, 100, 20),
    900: new GlazeHSL(240, 100, 15),
  },
  violet: {
    50: new GlazeHSL(270, 100, 95),
    100: new GlazeHSL(270, 100, 85),
    200: new GlazeHSL(270, 100, 75),
    300: new GlazeHSL(270, 100, 65),
    400: new GlazeHSL(270, 100, 55),
    500: new GlazeHSL(270, 100, 45),
    600: new GlazeHSL(270, 100, 35),
    700: new GlazeHSL(270, 100, 25),
    800: new GlazeHSL(270, 100, 20),
    900: new GlazeHSL(270, 100, 15),
  },
  magenta: {
    50: new GlazeHSL(300, 100, 95),
    100: new GlazeHSL(300, 100, 85),
    200: new GlazeHSL(300, 100, 75),
    300: new GlazeHSL(300, 100, 65),
    400: new GlazeHSL(300, 100, 55),
    500: new GlazeHSL(300, 100, 45),
    600: new GlazeHSL(300, 100, 35),
    700: new GlazeHSL(300, 100, 25),
    800: new GlazeHSL(300, 100, 20),
    900: new GlazeHSL(300, 100, 15),
  },
  pink: {
    50: new GlazeHSL(330, 100, 95),
    100: new GlazeHSL(330, 100, 85),
    200: new GlazeHSL(330, 100, 75),
    300: new GlazeHSL(330, 100, 65),
    400: new GlazeHSL(330, 100, 55),
    500: new GlazeHSL(330, 100, 45),
    600: new GlazeHSL(330, 100, 35),
    700: new GlazeHSL(330, 100, 25),
    800: new GlazeHSL(330, 100, 20),
    900: new GlazeHSL(330, 100, 15),
  },
  gray: {
    50: new GlazeHSL(0, 0, 95),
    100: new GlazeHSL(0, 0, 85),
    200: new GlazeHSL(0, 0, 75),
    300: new GlazeHSL(0, 0, 65),
    400: new GlazeHSL(0, 0, 55),
    500: new GlazeHSL(0, 0, 45),
    600: new GlazeHSL(0, 0, 35),
    700: new GlazeHSL(0, 0, 25),
    800: new GlazeHSL(0, 0, 20),
    900: new GlazeHSL(0, 0, 15),
  },
};
