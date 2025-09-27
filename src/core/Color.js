// ==================== Color.js ====================

export class Color {
  constructor(input = "#000000") {
    if (typeof input === "string") {
      this.set(input);
    } else if (Array.isArray(input) && input.length === 3) {
      this.r = input[0];
      this.g = input[1];
      this.b = input[2];
    } else if (typeof input === "object") {
      this.r = input.r ?? 0;
      this.g = input.g ?? 0;
      this.b = input.b ?? 0;
    } else {
      this.r = this.g = this.b = 0;
    }
  }

  // ---------- Setters ----------
  set(input) {
    if (typeof input === "string") {
      if (/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(input)) {
        const hex = input.length === 4 ? input.split("").map(c => c + c).join("").slice(1) : input.slice(1);
        const num = parseInt(hex, 16);
        this.r = (num >> 16) & 255;
        this.g = (num >> 8) & 255;
        this.b = num & 255;
      } else {
        throw new Error("Invalid HEX format");
      }
    } else if (Array.isArray(input) && input.length === 3) {
      [this.r, this.g, this.b] = input;
    } else if (typeof input === "object") {
      this.r = input.r ?? 0;
      this.g = input.g ?? 0;
      this.b = input.b ?? 0;
    } else {
      throw new Error("Unsupported input format");
    }
    return this;
  }

  // ---------- Getters ----------
  toArray() {
    return [this.r, this.g, this.b];
  }

  toHex() {
    const toHex = n => n.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
  }

  toRgbString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  toHsl() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  // ---------- Manipulations ----------
  lighten(amount = 10) {
    const hsl = this.toHsl();
    hsl.l = Math.min(100, hsl.l + amount);
    return this.fromHsl(hsl);
  }

  darken(amount = 10) {
    const hsl = this.toHsl();
    hsl.l = Math.max(0, hsl.l - amount);
    return this.fromHsl(hsl);
  }

  saturate(amount = 10) {
    const hsl = this.toHsl();
    hsl.s = Math.min(100, hsl.s + amount);
    return this.fromHsl(hsl);
  }

  desaturate(amount = 10) {
    const hsl = this.toHsl();
    hsl.s = Math.max(0, hsl.s - amount);
    return this.fromHsl(hsl);
  }

  invert() {
    this.r = 255 - this.r;
    this.g = 255 - this.g;
    this.b = 255 - this.b;
    return this;
  }

  // ---------- Utilities ----------
  clone() {
    return new Color(this.toArray());
  }

  equals(color) {
    return this.r === color.r && this.g === color.g && this.b === color.b;
  }

  // ---------- HSL Helper ----------
  fromHsl({ h, s, l }) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r1, g1, b1;

    if (h >= 0 && h < 60) { r1 = c; g1 = x; b1 = 0; }
    else if (h >= 60 && h < 120) { r1 = x; g1 = c; b1 = 0; }
    else if (h >= 120 && h < 180) { r1 = 0; g1 = c; b1 = x; }
    else if (h >= 180 && h < 240) { r1 = 0; g1 = x; b1 = c; }
    else if (h >= 240 && h < 300) { r1 = x; g1 = 0; b1 = c; }
    else { r1 = c; g1 = 0; b1 = x; }

    this.r = Math.round((r1 + m) * 255);
    this.g = Math.round((g1 + m) * 255);
    this.b = Math.round((b1 + m) * 255);
    return this;
  }
}
