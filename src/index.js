// ==================== Glaze Type Definitions ====================

// Core
export class Color {
  constructor(hex: string | number | { r: number, g: number, b: number });

  // Conversion
  toRgb(): { r: number; g: number; b: number };
  toHex(): string;
  toHsl(): { h: number; s: number; l: number };
  toCmyk(): { c: number; m: number; y: number; k: number };
  toLab(): { l: number; a: number; b: number };
  toXyz(): { x: number; y: number; z: number };
  toHsv(): { h: number; s: number; v: number };

  // Manipulation
  lighten(percent: number): Color;
  darken(percent: number): Color;
  saturate(percent: number): Color;
  desaturate(percent: number): Color;
  invert(): Color;
  blend(other: Color, ratio?: number): Color;
  mix(other: Color, ratio?: number): Color;
}

export class Palette {
  constructor(colors?: Color[]);

  addColor(color: Color | string): void;
  removeColor(index: number): void;
  getColors(): Color[];
  randomColor(): Color;
  shuffle(): void;
}

// Utils
export function clamp(value: number, min: number, max: number): number;
export function lerp(a: number, b: number, t: number): number;
export function random(min?: number, max?: number): number;

// Conversion Functions
export function hexToRgb(hex: string): { r: number; g: number; b: number };
export function rgbToHex(r: number, g: number, b: number): string;
export function hexToHsl(hex: string): { h: number; s: number; l: number };
export function hslToHex(h: number, s: number, l: number): string;
// ... dan semua konversi lain: CMYK, LAB, XYZ, HSV

// Manipulation Functions
export function lighten(color: string, percent: number): string;
export function darken(color: string, percent: number): string;
export function saturate(color: string, percent: number): string;
export function desaturate(color: string, percent: number): string;
export function invert(color: string): string;
export function blend(color1: string, color2: string, ratio?: number): string;
export function mix(color1: string, color2: string, ratio?: number): string;

// Accessibility
export function contrast(color1: string, color2: string): number;
export function readability(color1: string, color2: string): "AAA" | "AA" | "Fail";
export function blindFriendly(color: string): boolean;

// Gradients
export function linearGradient(colors: string[], angle?: number): string;
export function radialGradient(colors: string[], shape?: string): string;
export function conicGradient(colors: string[], startAngle?: number): string;

// Palettes
export const GlazeBasicColors: Record<string, any>;
export const GlazeExtendedColors: Record<string, any>;
export const GlazeVariantsColors: Record<string, any>;
export const userPalettes: Record<string, any>;

// Random
export function randomColor(): string;
export function randomPalette(size?: number): string[];
export function randomGradient(): string;

// Effects
export function noise(color: string, intensity?: number): string;
export function grain(color: string, intensity?: number): string;
export function glow(color: string, intensity?: number): string;
export function overlay(color1: string, color2: string, mode?: string): string;

// Analysis
export function temperature(color: string): "warm" | "cool" | "neutral";
export function harmony(color: string, type: "complementary" | "analogous" | "triadic" | "tetradic"): string[];
export function dominant(colors: string[]): string;
export function contrastMap(colors: string[]): Record<string, number>;

// IO
export function hex(color: Color): string;
export function css(color: Color): string;
export function json(palette: Palette): string;
export function svg(palette: Palette, options?: { width?: number; height?: number }): string;
