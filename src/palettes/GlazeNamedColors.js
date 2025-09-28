// ==================== GlazeNamedColors.js ====================
// Semua warna Glaze lengkap: Basic + Extended + Variants + Hex + RGB + RGBA + HSV + HSL + CMYK + Gradients

import { GlazeBasicColors } from "./GlazeBasicColors.js";
import { GlazeExtendedColors } from "./GlazeExtendedColors.js";
import { GlazeVariantsColors } from "./GlazeVariantsColors.js";

// ===== Fungsi helper =====
function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToRGBA({r,g,b}, a=1) {
  return { r, g, b, a };
}

function rgbToHSV({r,g,b}) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if(max === min) h=0;
  else if(max===r) h = ((g-b)/d) % 6;
  else if(max===g) h = (b-r)/d + 2;
  else h = (r-g)/d +4;
  h = Math.round(h*60);
  if(h<0) h+=360;
  return {h,s,v};
}

function rgbToHSL({r,g,b}) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  const d=max-min;
  s=d===0?0:d/(1-Math.abs(2*l-1));
  if(max===min) h=0;
  else if(max===r) h=((g-b)/d)%6;
  else if(max===g) h=(b-r)/d+2;
  else h=(r-g)/d+4;
  h=Math.round(h*60); if(h<0) h+=360;
  return {h,s,l};
}

function rgbToCMYK({r,g,b}) {
  let c = 1 - r/255;
  let m = 1 - g/255;
  let y = 1 - b/255;
  let k = Math.min(c,m,y);
  if(k===1) return {c:0,m:0,y:0,k:1};
  c = (c-k)/(1-k); m=(m-k)/(1-k); y=(y-k)/(1-k);
  return {c,m,y,k};
}

// ===== Gabungkan semua warna =====
function mergeColorSets(...sets) {
  const merged = {};
  for(const set of sets){
    for(const [color, shades] of Object.entries(set)){
      if(typeof shades === "string") merged[color] = shades;
      else {
        for(const [shade, hex] of Object.entries(shades)){
          merged[`${color}${shade}`] = hex;
        }
      }
    }
  }
  return merged;
}

const allHexColors = mergeColorSets(GlazeBasicColors, GlazeExtendedColors, GlazeVariantsColors);

// ===== Generate semua format =====
export const GlazeNamedColors = {};
for(const [name, hex] of Object.entries(allHexColors)){
  const rgb = hexToRGB(hex);
  GlazeNamedColors[name] = {
    hex,
    rgb,
    rgba: rgbToRGBA(rgb),
    hsv: rgbToHSV(rgb),
    hsl: rgbToHSL(rgb),
    cmyk: rgbToCMYK(rgb)
  };
}

// ===== Gradients preset =====
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
