// src/core/math/Color/testColors.js
import { ColorFactory } from './FullColorFactory.js';

// Daftar warna yang ingin diuji (nama atau hex)
const testColors = [
    'black', 'white', 'red', 'green', 'blue',       // Basic
    'aliceBlue', 'coral', 'darkBlue',               // Extended
    'customColor1', 'customColor2',                 // Custom (ganti sesuai CustomColors)
    '#ff0000', '#00ff00', '#0000ff',               // Hex
    '#0f0', '#abc'                                 // Shorthand hex
];

console.log('===== TEST COLOR FACTORY =====');

testColors.forEach(name => {
    const color = ColorFactory(name);
    console.log(`${name} -> RGB: ${color.r.toFixed(2)}, ${color.g.toFixed(2)}, ${color.b.toFixed(2)} | Hex: ${color.getHex().toString(16).padStart(6,'0')}`);
});

// Optional: test utility functions
console.log('\n===== TEST UTILITY FUNCTIONS =====');
const red = ColorFactory('red');
const blue = ColorFactory('blue');
const mixed = ColorFactory('black').lerp(red, 0.5);
console.log(`Lerp black->red 0.5: RGB: ${mixed.r.toFixed(2)}, ${mixed.g.toFixed(2)}, ${mixed.b.toFixed(2)}`);

const inv = ColorFactory('green');
console.log(`Invert green: RGB: ${inv.r.toFixed(2)}, ${inv.g.toFixed(2)}, ${inv.b.toFixed(2)}`);
