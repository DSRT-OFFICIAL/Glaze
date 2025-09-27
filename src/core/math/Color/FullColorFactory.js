// Glaze/src/core/math/Color/FullColorFactory.js
import { Color } from './Color.js';
import { BasicColors } from './BasicGlazeColor.js';
import { ExtendedColors } from './ExtendedGlazeColors.js';
import { CustomColors } from './CustomColors.js';

const AllColors = { ...BasicColors, ...ExtendedColors, ...CustomColors };

// Normalisasi key
const normalizedColors = {};
for(const key in AllColors){
    const lower = key.toLowerCase();
    const nospace = key.replace(/\s+/g,'').toLowerCase();
    normalizedColors[lower] = AllColors[key];
    normalizedColors[nospace] = AllColors[key];
}

// Factory utama
export function ColorFactory(input){
    if(input instanceof Color) return input.clone();

    if(typeof input==='string'){
        // Hex format #rrggbb atau #rgb
        if(input.startsWith('#')){
            let hex = input.slice(1);
            if(hex.length===3) hex = hex.split('').map(c=>c+c).join('');
            const parsed = parseInt(hex,16);
            if(!isNaN(parsed)) return new Color().setHex(parsed);
        } else {
            const key = input.replace(/\s+/g,'').toLowerCase();
            if(normalizedColors[key]) return normalizedColors[key].clone();
        }
        console.warn(`ColorFactory: warna "${input}" tidak ditemukan. Mengembalikan putih.`);
        return new Color(1,1,1);
    }

    if(typeof input==='number') return new Color().setHex(input);

    console.warn(`ColorFactory: input "${input}" tidak valid. Mengembalikan putih.`);
    return new Color(1,1,1);
}

// Shortcut
export const ColorShortcut = ColorFactory;

// ============================
// Utility functions
// ============================
export function lerpColors(c1, c2, alpha){ return c1.clone().lerp(c2, alpha); }
export function mixColors(c1, c2, alpha){ return lerpColors(c1,c2,alpha); }
export function addColors(c1, c2){ return c1.clone().add(c2); }
export function multiplyColors(c1, c2){ return c1.clone().multiply(c2); }
export function invertColor(c){ return new Color(1 - c.r, 1 - c.g, 1 - c.b, c.a); }
