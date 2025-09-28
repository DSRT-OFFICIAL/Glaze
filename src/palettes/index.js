// ==================== index.js ====================
import { GlazeAll } from "./GlazeAll.js";

// Export semua modul via GlazeAll
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
