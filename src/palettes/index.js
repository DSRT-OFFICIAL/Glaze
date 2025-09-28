// ==================== index.js ====================

// Warna dasar, extended, variant
export { GlazeBasicColors } from "./GlazeBasicColors.js";
export { GlazeExtendedColors } from "./GlazeExtendedColors.js";
export { GlazeVariantsColors } from "./GlazeVariantsColors.js";

// Warna lengkap dengan semua format (hex, rgb, rgba, hsv, hsl, cmyk)
export { GlazeNamedColors } from "./GlazeNamedColors.js";

// Gradients preset dan helper
export { GlazeGradients, generateGradient } from "./GlazeGradients.js";
export { GlazeNamedGradients } from "./GlazeNamedColors.js";

// Semua helper / util (hanya dari 1 sumber)
export * as GlazeUtils from "./GlazeUtils.js";

// All-in-one bundle (opsional, untuk konsumsi langsung)
export { GlazeAll } from "./GlazeAll.js"; 
