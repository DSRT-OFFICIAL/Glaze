// ==================== CORE ====================

export class Color {
  constructor(hex: string);
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;

  clone(): Color;
  toHex(): string;
  toRgb(): { r: number; g: number; b: number };
  toHsl(): { h: number; s: number; l: number };
  lighten(amount: number): Color;
  darken(amount: number): Color;
  saturate(amount: number): Color;
  desaturate(amount: number): Color;
  invert(): Color;
  blend(other: Color, weight: number): Color;
  mix(other: Color, weight: number): Color;
}

export class Palette {
  constructor(colors: Color[] | string[]);
  colors: Color[];
  add(color: Color | string): void;
  remove(index: number): void;
  get(index: number): Color;
  shuffle(): void;
  clone(): Palette;
}

// ==================== UTILS ====================
export namespace Utils {
  function clamp(value: number, min: number, max: number): number;
  function lerp(a: number, b: number, t: number): number;
  function random(min?: number, max?: number): number;
  function randomItem<T>(arr: T[]): T;
}

// ==================== CONVERSIONS ====================
export function hexToRgb(hex: string): { r: number; g: number; b: number };
export function rgbToHex(r: number, g: number, b: number): string;
export function hexToHsl(hex: string): { h: number; s: number; l: number };
export function hslToHex(h: number, s: number, l: number): string;
// Tambahkan cmyk, lab, xyz, hsv
export function hexToCmyk(hex: string): { c: number; m: number; y: number; k: number };
export function cmykToHex(c: number, m: number, y: number, k: number): string;
export function hexToLab(hex: string): { l: number; a: number; b: number };
export function labToHex(l: number, a: number, b: number): string;
export function hexToXyz(hex: string): { x: number; y: number; z: number };
export function xyzToHex(x: number, y: number, z: number): string;
export function hexToHsv(hex: string): { h: number; s: number; v: number };
export function hsvToHex(h: number, s: number, v: number): string;

// ==================== MANIPULATION ====================
export function lighten(color: string | Color, amount: number): Color;
export function darken(color: string | Color, amount: number): Color;
export function saturate(color: string | Color, amount: number): Color;
export function desaturate(color: string | Color, amount: number): Color;
export function invert(color: string | Color): Color;
export function blend(color1: string | Color, color2: string | Color, weight: number): Color;
export function mix(color1: string | Color, color2: string | Color, weight: number): Color;

// ==================== ACCESSIBILITY ====================
export function contrast(color1: string | Color, color2: string | Color): number;
export function readability(color1: string | Color, color2: string | Color): "AAA" | "AA" | "Fail";
export function blindFriendly(color: string | Color): string;

// ==================== PALETTES ====================
export const GlazeBasicColors: Record<string, string | Record<number, string>>;
export const GlazeExtendedColors: Record<string, Record<number, string>>;
export const GlazeVariantsColors: Record<string, Record<number, string>>;

// ==================== RANDOM ====================
export function randomColor(): Color;
export function randomPalette(count?: number): Palette;
export function randomGradient(): string;

// ==================== EFFECTS ====================
export function noise(color: string | Color, intensity?: number): Color;
export function grain(color: string | Color, intensity?: number): Color;
export function glow(color: string | Color, intensity?: number): Color;
export function overlay(base: string | Color, overlay: string | Color, opacity: number): Color;

// ==================== ANALYSIS ====================
export function temperature(color: string | Color): "warm" | "cool" | "neutral";
export function harmony(color: string | Color, type: "complementary" | "analogous" | "triadic" | "tetradic"): Color[];
export function dominant(colors: (string | Color)[]): Color;
export function contrastMap(colors: (string | Color)[]): number[][];

// ==================== IO ====================
export function exportHex(color: string | Color): string;
export function exportCss(color: string | Color): string;
export function exportJson(palette: Palette): string;
export function exportSvg(color: string | Color, size?: number): string;
