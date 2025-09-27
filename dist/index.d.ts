// ================= Core =================
export class Color {
  constructor(value?: string | number | Color);
  r: number;
  g: number;
  b: number;
  a: number;
  hex(): string;
  rgb(): { r: number; g: number; b: number };
  hsl(): { h: number; s: number; l: number };
  cmyk(): { c: number; m: number; y: number; k: number };
  lab(): { l: number; a: number; b: number };
  xyz(): { x: number; y: number; z: number };
  hsv(): { h: number; s: number; v: number };
  clone(): Color;
  toString(format?: "hex" | "rgb" | "hsl"): string;
}

export class Palette {
  constructor(colors?: string[] | Color[]);
  colors: Color[];
  add(color: Color | string): void;
  remove(index: number): void;
  get(index: number): Color;
  random(): Color;
  clone(): Palette;
}

// ================= Utils =================
export const Utils: {
  clamp(value: number, min: number, max: number): number;
  lerp(a: number, b: number, t: number): number;
  random(min?: number, max?: number): number;
  randomInt(min?: number, max?: number): number;
};

// ================= Conversion =================
export function rgbToHex(r: number, g: number, b: number): string;
export function hexToRgb(hex: string): { r: number; g: number; b: number };
export function hexToHsl(hex: string): { h: number; s: number; l: number };
export function hslToHex(h: number, s: number, l: number): string;
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number };
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number };
export function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number };
export function cmykToRgb(c: number, m: number, y: number, k: number): { r: number; g: number; b: number };
export function rgbToLab(r: number, g: number, b: number): { l: number; a: number; b: number };
export function labToRgb(l: number, a: number, b: number): { r: number; g: number; b: number };
export function rgbToXyz(r: number, g: number, b: number): { x: number; y: number; z: number };
export function xyzToRgb(x: number, y: number, z: number): { r: number; g: number; b: number };
export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number };
export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number };

// ================= Manipulation =================
export function lighten(color: Color | string, amount: number): Color;
export function darken(color: Color | string, amount: number): Color;
export function saturate(color: Color | string, amount: number): Color;
export function desaturate(color: Color | string, amount: number): Color;
export function blend(color1: Color | string, color2: Color | string, ratio: number): Color;
export function mix(color1: Color | string, color2: Color | string, ratio: number): Color;
export function invert(color: Color | string): Color;

// ================= Accessibility =================
export function contrast(color1: Color | string, color2: Color | string): number;
export function readability(color1: Color | string, color2: Color | string): "AAA" | "AA" | "Fail";
export function blindFriendly(color: Color | string): string;

// ================= Gradients =================
export function linearGradient(colors: string[] | Color[], direction?: string): string;
export function radialGradient(colors: string[] | Color[], shape?: "circle" | "ellipse"): string;
export function conicGradient(colors: string[] | Color[], startAngle?: string): string;

// ================= Palettes =================
export const GlazeBasicColors: Record<string, string | Record<number, string>>;
export const GlazeExtendedColors: Record<string, string | Record<number, string>>;
export const GlazeVariantsColors: Record<string, string | Record<number, string>>;
export const userPalettes: Record<string, string[]>;

// ================= Random =================
export function randomColor(): Color;
export function randomPalette(size?: number): Palette;
export function randomGradient(size?: number): string;

// ================= Effects =================
export function noise(color: Color | string, intensity?: number): Color;
export function grain(color: Color | string, intensity?: number): Color;
export function glow(color: Color | string, radius?: number): Color;
export function overlay(base: Color | string, overlayColor: Color | string, alpha?: number): Color;

// ================= Analysis =================
export function temperature(color: Color | string): "warm" | "cool" | "neutral";
export function harmony(color: Color | string, type: "complementary" | "analogous" | "triadic" | "tetradic"): Color[];
export function dominant(colors: (Color | string)[]): Color;
export function contrastMap(colors: (Color | string)[]): number[][];

// ================= IO =================
export function hexIOExport(color: Color | string): string;
export function cssExport(color: Color | string): string;
export function jsonExport(colors: (Color | string)[]): string;
export function svgExport(color: Color | string, width?: number, height?: number): string;
