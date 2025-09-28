// ==================== GlazeGradients.js ====================

// Preset manual
export const GlazeGradients = {
  sunset: "linear-gradient(45deg, #F97316, #FB7185)",
  ocean: "linear-gradient(90deg, #0EA5E9, #3B82F6)",
  forest: "linear-gradient(135deg, #22C55E, #4ADE80)",
  violetSky: "linear-gradient(60deg, #8B5CF6, #C084FC)",
  pinkDream: "linear-gradient(120deg, #EC4899, #F472B6)",
  goldShine: "linear-gradient(90deg, #FDD835, #FBC02D)",
  silverLight: "linear-gradient(90deg, #F5F5F5, #A3A3A3)",
  tealWave: "linear-gradient(45deg, #14B8A6, #5EEAD4)",
  limeGlow: "linear-gradient(60deg, #84CC16, #A3E635)",
};

// Function generate gradient otomatis dari dua warna hex
export function generateGradient(hex1, hex2, deg=90) {
  return `linear-gradient(${deg}deg, ${hex1}, ${hex2})`;
}
