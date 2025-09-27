export type ColorBlindType = "protanopia" | "deuteranopia" | "tritanopia";

/** Simulasi buta warna */
export function simulateColorBlindness(hex: string, type: ColorBlindType): string;

/** Cek apakah warna aman */
export function isBlindFriendly(textHex: string, bgHex: string, type: ColorBlindType, minContrast?: number): boolean;

/** Saran warna linear */
export function suggestBlindFriendlyColors(
  textHex: string,
  bgHex: string,
  type: ColorBlindType,
  minContrast?: number,
  steps?: number
): string[];

/** Saran warna optimized (binary search) */
export function suggestBlindFriendlyColorsOptimized(
  textHex: string,
  bgHex: string,
  type: ColorBlindType,
  minContrast?: number
): string[];

/** Evaluasi batch banyak warna */
export function blindFriendlyBatch(
  textColors: string[],
  bgHex: string,
  types?: ColorBlindType[],
  minContrast?: number
): Array<{ textColor: string; type: ColorBlindType; blindFriendly: boolean }>;
