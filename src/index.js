// ==================== index.js ====================

// ---------- Import per kategori ----------
import * as Conversion from "./Colors/ColorsConversion.js";
import * as Manipulation from "./Colors/ColorsManipulation.js";
import * as Accessibility from "./Colors/ColorsAccessibility.js";
import * as Theme from "./Colors/ColorsTheme.js";
import * as Palette from "./Colors/PaletteUtils.js";
import * as Random from "./Colors/ColorsRandom.js";
import * as Alias from "./Colors/ColorsAlias.js";

import * as Basic from "./Colors/GlazeBasicColors.js";
import * as Extended from "./Colors/GlazeExtendedColors.js";
import * as Variants from "./Colors/GlazeVariantsColors.js";

// ---------- Flat Export ----------
export * from "./Colors/ColorsConversion.js";
export * from "./Colors/ColorsManipulation.js";
export * from "./Colors/ColorsAccessibility.js";
export * from "./Colors/ColorsTheme.js";
export * from "./Colors/PaletteUtils.js";
export * from "./Colors/ColorsRandom.js";
export * from "./Colors/ColorsAlias.js";
export * from "./Colors/GlazeBasicColors.js";
export * from "./Colors/GlazeExtendedColors.js";
export * from "./Colors/GlazeVariantsColors.js";

// ---------- Namespace Export ----------
export {
  Conversion,
  Manipulation,
  Accessibility,
  Theme,
  Palette,
  Random,
  Alias,
  Basic,
  Extended,
  Variants,
};
