// ==================== GlazeAll.js ====================
// Super final Glaze bundle: NamedColors + Palettes + Themes + Accessibility + Utils + Gradients

import { GlazeNamedColors, GlazeNamedGradients } from "./GlazeNamedColors.js";
import { GlazePalettes } from "./GlazePalettes.js";
import { GlazeThemes } from "./GlazeThemes.js";
import * as GlazeAccessibility from "./GlazeAccessibility.js";
import * as GlazeUtils from "./GlazeUtils.js";
import { GlazeGradients, generateGradient } from "./GlazeGradients.js";

// ===== Export all-in-one Glaze bundle =====
export const GlazeAll = {
  // Colors
  GlazeNamedColors,      // Semua warna + format lengkap
  GlazeGradients,        // Preset manual gradients
  GlazeNamedGradients,   // Preset + otomatis gradient

  // Palettes & Themes
  GlazePalettes,
  GlazeThemes,

  // Accessibility
  GlazeAccessibility,

  // Utilities
  GlazeUtils,
  generateGradient,
};
