// ==================== index.js ====================
// Entry point Glaze: re-export semua dari GlazeAll

import { GlazeAll } from "./GlazeAll.js";

// Export all modules via GlazeAll
export const {
  GlazeNamedColors,
  GlazeNamedGradients,
  GlazeGradients,
  GlazePalettes,
  GlazeThemes,
  GlazeAccessibility,
  GlazeUtils,
  generateGradient
} = GlazeAll;

// Default export
export default GlazeAll;
