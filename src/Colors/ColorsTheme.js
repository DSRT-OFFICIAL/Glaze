// ==================== ColorsTheme.js ====================

import { hexToRgb, hexToHsl, hslToHex } from "./ColorsConversion.js";

// ---------- Kontras Otomatis (hitam/putih untuk teks) ----------
export function contrastColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

// ---------- Generate Shades (skala warna 50–900) ----------
export function generateShades(baseHex) {
  const { h, s, l } = hexToHsl(baseHex);
  const shades = {};

  const scale = {
    50: l + 40,
    100: l + 30,
    200: l + 20,
    300: l + 10,
    400: l + 5,
    500: l,
    600: l - 5,
    700: l - 10,
    800: l - 20,
    900: l - 30,
  };

  Object.keys(scale).forEach(key => {
    let newL = Math.max(0, Math.min(100, scale[key]));
    shades[key] = hslToHex(h, s, newL);
  });

  return shades;
}

// ---------- Generate Theme (light & dark) ----------
export function generateTheme(baseColors) {
  const theme = { light: {}, dark: {} };

  Object.keys(baseColors).forEach(name => {
    const shades = generateShades(baseColors[name]);
    theme.light[name] = {
      DEFAULT: shades[500],
      ...shades,
      text: contrastColor(shades[500]),
    };
    theme.dark[name] = {
      DEFAULT: shades[300],
      ...shades,
      text: contrastColor(shades[300]),
    };
  });

  return theme;
}

// ---------- Theme Switch Helper ----------
export function themeSwitch(theme, mode = "light") {
  if (!["light", "dark"].includes(mode)) {
    throw new Error("Mode harus 'light' atau 'dark'");
  }
  return theme[mode];
}

// ---------- Export CSS Variables ----------
export function themeToCSSVars(theme, mode = "light") {
  const selected = themeSwitch(theme, mode);
  let css = `:root {\n`;
  Object.keys(selected).forEach(name => {
    Object.keys(selected[name]).forEach(shade => {
      css += `  --color-${name}-${shade}: ${selected[name][shade]};\n`;
    });
  });
  css += `}`;
  return css;
}

// ---------- Merge Custom Theme ----------
export function mergeTheme(baseTheme, custom) {
  return {
    ...baseTheme,
    ...Object.keys(custom).reduce((acc, key) => {
      acc[key] = { ...(baseTheme[key] || {}), ...custom[key] };
      return acc;
    }, {}),
  };
}

// ---------- Get CSS Variable Helper ----------
export function getCssVar(name, shade = "DEFAULT") {
  return `var(--color-${name}-${shade})`;
}

// ---------- Default Preset Themes ----------
const baseLight = {
  primary: "#3B82F6",   // biru
  secondary: "#10B981", // hijau
  danger: "#EF4444",    // merah
  neutral: "#6B7280",   // abu-abu
};

const baseDark = {
  primary: "#60A5FA",   // biru lebih terang
  secondary: "#34D399", // hijau terang
  danger: "#F87171",    // merah terang
  neutral: "#9CA3AF",   // abu-abu terang
};

export const LightTheme = generateTheme(baseLight).light;
export const DarkTheme = generateTheme(baseDark).dark;
