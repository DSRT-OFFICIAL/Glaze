// Glaze/src/core/math/Color/testColors.js
import { BasicColors } from './BasicGlazeColor.js';
import { ExtendedColors } from './ExtendedGlazeColors.js';
import { CustomColors } from './CustomColors.js';
import { ColorFactory, lerpColors, mixColors, addColors, multiplyColors, invertColor } from './FullColorFactory.js';
import { logColor, compareColors, debugAllColors, debugFactory } from './DebugColorUtils.js';

// -------------------------
// Test Basic Colors
// -------------------------
console.log('--- Basic Colors ---');
debugAllColors(BasicColors);

// -------------------------
// Test Extended Colors
// -------------------------
console.log('--- Extended Colors ---');
debugAllColors(ExtendedColors);

// -------------------------
// Test Custom Colors
// -------------------------
console.log('--- Custom Colors ---');
debugAllColors(CustomColors);

// -------------------------
// Test ColorFactory dengan string dan hex
// -------------------------
console.log('--- ColorFactory Tests ---');
const testInputs = [
    'red',
    'Blue',
    ' royalblue ',  // spasi ekstra
    '#0f0',         // shorthand hex
    '#00ff00',      // hex panjang
    0xff00ff,       // angka
    'nonexistent'   // invalid
];

debugFactory(testInputs);

// -------------------------
// Test operations
// -------------------------
console.log('--- Color Operations ---');
const c1 = ColorFactory('red');
const c2 = ColorFactory('blue');

logColor('c1', c1);
logColor('c2', c2);

const cLerp = lerpColors(c1, c2, 0.5);
logColor('lerp c1->c2 (0.5)', cLerp);

const cMix = mixColors(c1, c2, 0.25);
logColor('mix c1->c2 (0.25)', cMix);

const cAdd = addColors(c1, c2);
logColor('add c1+c2', cAdd);

const cMul = multiplyColors(c1, c2);
logColor('multiply c1*c2', cMul);

const cInv = invertColor(c1);
logColor('invert c1', cInv);

// -------------------------
// Test compareColors
// -------------------------
console.log('--- Compare Colors ---');
compareColors(c1, c2);
compareColors(c1, ColorFactory('red'));
