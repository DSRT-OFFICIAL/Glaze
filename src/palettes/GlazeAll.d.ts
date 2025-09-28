// ==================== GlazeAll.d.ts ====================

export interface RGB { r: number; g: number; b: number; }
export interface RGBA extends RGB { a: number; }
export type RGBFloat = [number, number, number];
export interface HSV { h: number; s: number; v: number; }
export interface HSL { h: number; s: number; l: number; }
export interface CMYK { c: number; m: number; y: number; k: number; }

export interface GlazeColor {
  hex: string;
  rgb: [number, number, number];
  rgba: [number, number, number, number];
  rgbaString: string;
  rgbFloat: RGBFloat;
  hsv: HSV | null;
  hsl: HSL | null;
  cmyk: CMYK | null;
}

export interface GlazeNamedColorsType {
  [name: string]: GlazeColor;
}

export interface GlazeNamedGradientsType {
  [name: string]: string; // CSS linear-gradient string
}

export interface GlazePalettesType {
  light: string[];
  dark: string[];
  pastel: string[];
  vibrant: string[];
  corporate: string[];
  [key: string]: string[];
}

export interface GlazeThemesType {
  [themeName: string]: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
}

export interface GlazeUtilsType {
  hexToRgb(hex: string): [number, number, number];
  rgbToHex(rgb: [number, number, number]): string;
  lighten(hex: string, percent: number): string;
  darken(hex: string, percent: number): string;
  lerp(hex1: string, hex2: string, t: number): string;
  blend(hex1: string, hex2: string, ratio?: number): string;
  luminance(hex: string): number;
}

export interface GlazeAccessibilityType {
  luminance(hex: string): number;
  contrastRatio(hex1: string, hex2: string): number;
  isAccessible(hex1: string, hex2: string, level?: "AA" | "AAA", largeText?: boolean): boolean;
  generateAccessibleVariant(baseHex: string, backgroundHex: string, level?: "AA" | "AAA"): string;
  generateAccessiblePalette(palette: string[], backgroundHex: string, level?: "AA" | "AAA"): string[];
  checkPaletteAccessibility(palette: string[], level?: "AA" | "AAA"): boolean[][];
}

export interface GlazeAllType {
  // Colors
  GlazeNamedColors: GlazeNamedColorsType;
  GlazeGradients: GlazeNamedGradientsType;
  GlazeNamedGradients: GlazeNamedGradientsType;

  // Palettes & Themes
  GlazePalettes: GlazePalettesType;
  GlazeThemes: GlazeThemesType;

  // Accessibility
  GlazeAccessibility: GlazeAccessibilityType;

  // Utilities
  GlazeUtils: GlazeUtilsType;
  generateGradient(hex1: string, hex2: string, deg?: number): string;
}

export const GlazeAll: GlazeAllType;
