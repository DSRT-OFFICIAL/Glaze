// ==================== Palette.js ====================

import { Color } from "./Color.js";

export class Palette {
  constructor(colors = []) {
    // colors: array of Color instances, HEX strings, or RGB arrays
    this.colors = colors.map(c => (c instanceof Color ? c : new Color(c)));
  }

  // ---------- Add / Remove ----------
  add(color) {
    this.colors.push(color instanceof Color ? color : new Color(color));
    return this;
  }

  remove(index) {
    if (index >= 0 && index < this.colors.length) {
      this.colors.splice(index, 1);
    }
    return this;
  }

  clear() {
    this.colors = [];
    return this;
  }

  // ---------- Access ----------
  get(index) {
    return this.colors[index] ?? null;
  }

  getAllHex() {
    return this.colors.map(c => c.toHex());
  }

  getRandom() {
    if (this.colors.length === 0) return null;
    const idx = Math.floor(Math.random() * this.colors.length);
    return this.colors[idx];
  }

  size() {
    return this.colors.length;
  }

  // ---------- Manipulations ----------
  lighten(amount = 10) {
    this.colors.forEach(c => c.lighten(amount));
    return this;
  }

  darken(amount = 10) {
    this.colors.forEach(c => c.darken(amount));
    return this;
  }

  saturate(amount = 10) {
    this.colors.forEach(c => c.saturate(amount));
    return this;
  }

  desaturate(amount = 10) {
    this.colors.forEach(c => c.desaturate(amount));
    return this;
  }

  invert() {
    this.colors.forEach(c => c.invert());
    return this;
  }

  // ---------- Blend / Mix ----------
  blend(otherPalette, weight = 0.5) {
    const result = [];
    const len = Math.min(this.colors.length, otherPalette.colors.length);
    for (let i = 0; i < len; i++) {
      const c1 = this.colors[i];
      const c2 = otherPalette.colors[i];
      const r = Math.round(c1.r * (1 - weight) + c2.r * weight);
      const g = Math.round(c1.g * (1 - weight) + c2.g * weight);
      const b = Math.round(c1.b * (1 - weight) + c2.b * weight);
      result.push(new Color([r, g, b]));
    }
    return new Palette(result);
  }

  mix(...palettes) {
    const result = this.colors.map(c => c.clone());
    palettes.forEach(p => {
      p.colors.forEach((c, i) => {
        if (result[i]) {
          result[i].r = Math.round((result[i].r + c.r) / 2);
          result[i].g = Math.round((result[i].g + c.g) / 2);
          result[i].b = Math.round((result[i].b + c.b) / 2);
        }
      });
    });
    return new Palette(result);
  }

  // ---------- Utilities ----------
  clone() {
    return new Palette(this.colors.map(c => c.clone()));
  }

  equals(otherPalette) {
    if (this.size() !== otherPalette.size()) return false;
    return this.colors.every((c, i) => c.equals(otherPalette.colors[i]));
  }

  toHexArray() {
    return this.colors.map(c => c.toHex());
  }

  static random(size = 5) {
    const colors = [];
    for (let i = 0; i < size; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(new Color([r, g, b]));
    }
    return new Palette(colors);
  }
}
