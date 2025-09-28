// ==================== GlazeUtils.js ====================

// Konversi Hex ke RGB object
export function hexToRGB(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return {r,g,b};
}

// RGB object ke RGBA object
export function rgbToRGBA({r,g,b}, a=1) {
  return {r,g,b,a};
}

// RGB object ke RGBA string
export function rgbToRGBAString({r,g,b}, a=1){
  return `rgba(${r},${g},${b},${a})`;
}

// RGB object ke normalized float (0-1)
export function rgbToFloat({r,g,b}) {
  return {r:r/255, g:g/255, b:b/255};
}

// RGB ke HSV
export function rgbToHSV({r,g,b}) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,v=max;
  const d=max-min;
  s=max===0?0:d/max;
  if(max===min) h=0;
  else if(max===r) h=((g-b)/d)%6;
  else if(max===g) h=(b-r)/d+2;
  else h=(r-g)/d+4;
  h=Math.round(h*60); if(h<0) h+=360;
  return {h,s,v};
}

// RGB ke HSL
export function rgbToHSL({r,g,b}){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,l=(max+min)/2,s;
  const d=max-min;
  s=d===0?0:d/(1-Math.abs(2*l-1));
  if(max===min) h=0;
  else if(max===r) h=((g-b)/d)%6;
  else if(max===g) h=(b-r)/d+2;
  else h=(r-g)/d+4;
  h=Math.round(h*60); if(h<0) h+=360;
  return {h,s,l};
}

// RGB ke CMYK
export function rgbToCMYK({r,g,b}) {
  let c=1-r/255,m=1-g/255,y=1-b/255,k=Math.min(c,m,y);
  if(k===1) return {c:0,m:0,y:0,k:1};
  c=(c-k)/(1-k); m=(m-k)/(1-k); y=(y-k)/(1-k);
  return {c,m,y,k};
}
