// ==================== GlazeHSVColors.js ====================

// Representasi warna dalam format HSV + utilitas konversi
export class GlazeHSV {
  constructor(h, s, v) {
    this.h = h; // Hue: 0–360
    this.s = s; // Saturation: 0–100 (%)
    this.v = v; // Value: 0–100 (%)
  }

  // Konversi HSV -> RGB (0–255)
  toRGB() {
    let h = this.h;
    let s = this.s / 100;
    let v = this.v / 100;

    let c = v * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = v - c;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  // Konversi HSV -> HEX
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

  // Konversi ke CSS string rgb()
  toCSS() {
    const { r, g, b } = this.toRGB();
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Konversi ke Float (0–1) untuk WebGL
  toFloat() {
    const { r, g, b } = this.toRGB();
    return { r: r / 255, g: g / 255, b: b / 255 };
  }
}

// ==================== PRESET HSV COLORS (Skala 50–900) ====================
// Struktur: warna -> level -> GlazeHSV(hue, saturation, value)
export const GlazeHSVColors = {
  red: {
    50: new GlazeHSV(0, 70, 100),
    100: new GlazeHSV(0, 75, 95),
    200: new GlazeHSV(0, 80, 90),
    300: new GlazeHSV(0, 85, 85),
    400: new GlazeHSV(0, 90, 80),
    500: new GlazeHSV(0, 100, 75),
    600: new GlazeHSV(0, 100, 65),
    700: new GlazeHSV(0, 100, 55),
    800: new GlazeHSV(0, 100, 45),
    900: new GlazeHSV(0, 100, 35),
  },
  orange: {
    50: new GlazeHSV(30, 70, 100),
    100: new GlazeHSV(30, 75, 95),
    200: new GlazeHSV(30, 80, 90),
    300: new GlazeHSV(30, 85, 85),
    400: new GlazeHSV(30, 90, 80),
    500: new GlazeHSV(30, 100, 75),
    600: new GlazeHSV(30, 100, 65),
    700: new GlazeHSV(30, 100, 55),
    800: new GlazeHSV(30, 100, 45),
    900: new GlazeHSV(30, 100, 35),
  },
  yellow: {
    50: new GlazeHSV(60, 70, 100),
    100: new GlazeHSV(60, 75, 95),
    200: new GlazeHSV(60, 80, 90),
    300: new GlazeHSV(60, 85, 85),
    400: new GlazeHSV(60, 90, 80),
    500: new GlazeHSV(60, 100, 75),
    600: new GlazeHSV(60, 100, 65),
    700: new GlazeHSV(60, 100, 55),
    800: new GlazeHSV(60, 100, 45),
    900: new GlazeHSV(60, 100, 35),
  },
  green: {
    50: new GlazeHSV(120, 70, 100),
    100: new GlazeHSV(120, 75, 95),
    200: new GlazeHSV(120, 80, 90),
    300: new GlazeHSV(120, 85, 85),
    400: new GlazeHSV(120, 90, 80),
    500: new GlazeHSV(120, 100, 75),
    600: new GlazeHSV(120, 100, 65),
    700: new GlazeHSV(120, 100, 55),
    800: new GlazeHSV(120, 100, 45),
    900: new GlazeHSV(120, 100, 35),
  },
  cyan: {
    50: new GlazeHSV(180, 70, 100),
    100: new GlazeHSV(180, 75, 95),
    200: new GlazeHSV(180, 80, 90),
    300: new GlazeHSV(180, 85, 85),
    400: new GlazeHSV(180, 90, 80),
    500: new GlazeHSV(180, 100, 75),
    600: new GlazeHSV(180, 100, 65),
    700: new GlazeHSV(180, 100, 55),
    800: new GlazeHSV(180, 100, 45),
    900: new GlazeHSV(180, 100, 35),
  },
  blue: {
    50: new GlazeHSV(240, 70, 100),
    100: new GlazeHSV(240, 75, 95),
    200: new GlazeHSV(240, 80, 90),
    300: new GlazeHSV(240, 85, 85),
    400: new GlazeHSV(240, 90, 80),
    500: new GlazeHSV(240, 100, 75),
    600: new GlazeHSV(240, 100, 65),
    700: new GlazeHSV(240, 100, 55),
    800: new GlazeHSV(240, 100, 45),
    900: new GlazeHSV(240, 100, 35),
  },
  violet: {
    50: new GlazeHSV(270, 70, 100),
    100: new GlazeHSV(270, 75, 95),
    200: new GlazeHSV(270, 80, 90),
    300: new GlazeHSV(270, 85, 85),
    400: new GlazeHSV(270, 90, 80),
    500: new GlazeHSV(270, 100, 75),
    600: new GlazeHSV(270, 100, 65),
    700: new GlazeHSV(270, 100, 55),
    800: new GlazeHSV(270, 100, 45),
    900: new GlazeHSV(270, 100, 35),
  },
  magenta: {
    50: new GlazeHSV(300, 70, 100),
    100: new GlazeHSV(300, 75, 95),
    200: new GlazeHSV(300, 80, 90),
    300: new GlazeHSV(300, 85, 85),
    400: new GlazeHSV(300, 90, 80),
    500: new GlazeHSV(300, 100, 75),
    600: new GlazeHSV(300, 100, 65),
    700: new GlazeHSV(300, 100, 55),
    800: new GlazeHSV(300, 100, 45),
    900: new GlazeHSV(300, 100, 35),
  },
  pink: {
    50: new GlazeHSV(330, 70, 100),
    100: new GlazeHSV(330, 75, 95),
    200: new GlazeHSV(330, 80, 90),
    300: new GlazeHSV(330, 85, 85),
    400: new GlazeHSV(330, 90, 80),
    500: new GlazeHSV(330, 100, 75),
    600: new GlazeHSV(330, 100, 65),
    700: new GlazeHSV(330, 100, 55),
    800: new GlazeHSV(330, 100, 45),
    900: new GlazeHSV(330, 100, 35),
  },
  gray: {
    50: new GlazeHSV(0, 0, 100),
    100: new GlazeHSV(0, 0, 90),
    200: new GlazeHSV(0, 0, 80),
    300: new GlazeHSV(0, 0, 70),
    400: new GlazeHSV(0, 0, 60),
    500: new GlazeHSV(0, 0, 50),
    600: new GlazeHSV(0, 0, 40),
    700: new GlazeHSV(0, 0, 30),
    800: new GlazeHSV(0, 0, 20),
    900: new GlazeHSV(0, 0, 10),
  },
};
