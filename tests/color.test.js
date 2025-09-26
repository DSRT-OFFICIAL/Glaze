import { ColorFactory } from '../Glaze/src/core/math/Color/FullColorFactory.js';
import { logColor, compareColors } from '../Glaze/src/core/math/Color/DebugColorUtils.js';

// Contoh unit test sederhana
function testBasicColor() {
    const red = ColorFactory('red');
    const blue = ColorFactory('blue');

    logColor('Red Color', red);
    logColor('Blue Color', blue);

    const mix = red.clone().lerp(blue, 0.5);
    logColor('Mix Red+Blue', mix);

    compareColors(red, mix);
}

// Run test
testBasicColor();
