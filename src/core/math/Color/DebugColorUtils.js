// debugAllColors.js
import { ColorFactory, lerpColors, invertColor } from './FullColorFactory.js';
import { BasicColors } from './BasicGlazeColor.js';
import { ExtendedColors } from './ExtendedGlazeColors.js';
import { CustomColors } from './CustomColors.js';

const AllColors = { ...BasicColors, ...ExtendedColors, ...CustomColors };

function rgbArray(color) {
    return `[${(color.r*255).toFixed(0)}, ${(color.g*255).toFixed(0)}, ${(color.b*255).toFixed(0)}]`;
}

function hslArray(color) {
    const { h, s, l } = color.getHSL ? color.getHSL() : { h: 0, s: 0, l: 0 };
    return `[h:${(h*360).toFixed(0)}, s:${(s*100).toFixed(0)}%, l:${(l*100).toFixed(0)}%]`;
}

console.log('===== DETAILED COLOR DEBUG =====');

for (const key in AllColors) {
    const color = AllColors[key];

    const cfOriginal = ColorFactory(key);
    const normalizedName = key.replace(/\s+/g, '').toLowerCase();
    const cfNormalized = ColorFactory(normalizedName);

    const clone = cfOriginal.clone();
    const hex = cfOriginal.getHex ? cfOriginal.getHex() : 'N/A';
    const lerpTest = lerpColors(cfOriginal, cfOriginal, 0.5);
    const invTest = invertColor(cfOriginal);

    console.log(`\n--- ${key} ---`);
    console.log(`Normalized access: ${normalizedName}`);
    console.log(`RGB: ${rgbArray(cfOriginal)}`);
    console.log(`Hex: 0x${hex.toString(16).padStart(6,'0')}`);
    console.log(`HSL: ${hslArray(cfOriginal)}`);
    console.log(`Clone equal object? ${clone === cfOriginal ? 'FAIL' : 'OK'}`);
    console.log(`Lerp test: ${lerpTest ? 'OK' : 'FAIL'}`);
    console.log(`Invert test: ${invTest ? 'OK' : 'FAIL'}`);
}

console.log('===== COLOR DEBUG DONE =====');
