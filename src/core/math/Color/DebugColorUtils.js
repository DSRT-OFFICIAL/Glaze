// Glaze/src/core/math/Color/DebugColorUtils.js
import { Color } from './Color.js';
import { ColorFactory } from './FullColorFactory.js';

/**
 * Debug helper internal untuk development.
 * Tidak diexport ke publik karena tidak stabil.
 */

// -------------------------
// Convert Color ke string
// -------------------------
export function colorToArrayString(color) {
    if (!(color instanceof Color)) return '[invalid color]';
    return `[${color.r.toFixed(3)}, ${color.g.toFixed(3)}, ${color.b.toFixed(3)}]`;
}

// -------------------------
// Log warna ke console
// -------------------------
export function logColor(label, color) {
    console.log(`${label}: ${colorToArrayString(color)}`);
}

// -------------------------
// Bandingkan dua warna
// -------------------------
export function compareColors(c1, c2) {
    if (!(c1 instanceof Color) || !(c2 instanceof Color)) {
        console.warn('compareColors: invalid input');
        return;
    }
    const equal = c1.equals(c2);
    console.log(
        `Compare: ${colorToArrayString(c1)} vs ${colorToArrayString(c2)} => ${equal ? 'EQUAL' : 'DIFFERENT'}`
    );
    return equal;
}

// -------------------------
// Debug semua warna dari object
// -------------------------
export function debugAllColors(colorObj, prefix = '') {
    for (const key in colorObj) {
        const color = colorObj[key];
        if (color instanceof Color) {
            logColor(`${prefix}${key}`, color);
        }
    }
}

// -------------------------
// Debug string input via ColorFactory
// -------------------------
export function debugFactory(inputList) {
    inputList.forEach(name => {
        const color = ColorFactory(name);
        logColor(name, color);
    });
}
