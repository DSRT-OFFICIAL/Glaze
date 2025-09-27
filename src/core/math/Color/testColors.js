// Glaze/src/core/math/Color/testColors.js
import { ColorFactory, lerpColors, mixColors, addColors, multiplyColors, invertColor, ColorShortcut } from './FullColorFactory.js';
import { Color } from './Color.js';

// ==============================
// Daftar warna uji
// ==============================
const testColorNames = [
    'black', 'white', 'red', 'green', 'blue',
    'cyan', 'magenta', 'yellow', 'orange', 'brown',
    'purple', 'pink', 'gray', 'aliceBlue', 'antiqueWhite',
    'deepPink', 'royalBlue', 'customColor1' // pastikan CustomColors ada
];

// ==============================
// Test Factory & Shortcut
// ==============================
console.log('=== Test ColorFactory & ColorShortcut ===');
for (const name of testColorNames) {
    const c1 = ColorFactory(name);
    const c2 = ColorShortcut(name);
    console.log(`${name}:`, c1.toString(), '| shortcut:', c2.toString());
}

// ==============================
// Test HEX input
// ==============================
console.log('\n=== Test Hex input ===');
const hexColors = ['#f00', '#00ff00', '#0000ff', '#abcdef'];
hexColors.forEach(hex => {
    const c = ColorFactory(hex);
    console.log(`${hex}:`, c.toString(), '| hexValue:', c.getHex().toString(16));
});

// ==============================
// Test lerp/mix/add/multiply/invert
// ==============================
console.log('\n=== Test Utility Functions ===');

const cA = ColorFactory('red');
const cB = ColorFactory('blue');

const lerpAB = lerpColors(cA, cB, 0.5);
const mixAB = mixColors(cA, cB, 0.3);
const addAB = addColors(cA, cB);
const mulAB = multiplyColors(cA, cB);
const invA = invertColor(cA);

console.log('lerpColors(red,blue,0.5):', lerpAB.toString());
console.log('mixColors(red,blue,0.3):', mixAB.toString());
console.log('addColors(red,blue):', addAB.toString());
console.log('multiplyColors(red,blue):', mulAB.toString());
console.log('invertColor(red):', invA.toString());

// ==============================
// Test clone & copy
// ==============================
console.log('\n=== Test clone & copy ===');
const original = ColorFactory('green');
const cloned = original.clone();
const copyTarget = new Color();
copyTarget.copy(original);

console.log('original:', original.toString());
console.log('cloned:', cloned.toString());
console.log('copyTarget:', copyTarget.toString());

// ==============================
// Test invalid input
// ==============================
console.log('\n=== Test invalid input ===');
const invalidInputs = ['unknownColor', '#xyz', 999999999, null, {}];
invalidInputs.forEach(input => {
    const c = ColorFactory(input);
    console.log(`input: ${input}`, '=>', c.toString());
});

console.log('\n=== Test Complete ===');
