// DebugColorUtils.js
// ❌ Tidak ada tag @public → tidak masuk index.js otomatis

import { Color } from './Color.js';

/**
 * Debug helper untuk keperluan internal development.
 * Tidak diexport ke publik karena tidak stabil.
 */

/**
 * Convert Color ke string [r,g,b]
 */
export function colorToArrayString(color) {
    if (!(color instanceof Color)) return '[invalid color]';
    return `[${color.r.toFixed(2)}, ${color.g.toFixed(2)}, ${color.b.toFixed(2)}]`;
}

/**
 * Log warna ke console dengan format yang jelas
 */
export function logColor(label, color) {
    console.log(`${label}: ${colorToArrayString(color)}`);
}

/**
 * Bandingkan dua warna dan print hasil
 */
export function compareColors(c1, c2) {
    if (!(c1 instanceof Color) || !(c2 instanceof Color)) {
        console.warn('compareColors: invalid input');
        return;
    }
    console.log(
        `Compare: ${colorToArrayString(c1)} vs ${colorToArrayString(c2)}`
    );
}
