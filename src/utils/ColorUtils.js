import { Color } from '../core/math/Color/Color.js';

export const ColorUtils = {
    invert(color) {
        return new Color(1 - color.r, 1 - color.g, 1 - color.b);
    },
    brighten(color, amount = 0.1) {
        return new Color(
            Math.min(color.r + amount, 1),
            Math.min(color.g + amount, 1),
            Math.min(color.b + amount, 1)
        );
    },
    darken(color, amount = 0.1) {
        return new Color(
            Math.max(color.r - amount, 0),
            Math.max(color.g - amount, 0),
            Math.max(color.b - amount, 0)
        );
    },
    lerp(colorA, colorB, alpha) {
        return colorA.clone().lerp(colorB, alpha);
    },
    random() {
        return new Color(Math.random(), Math.random(), Math.random());
    }
};
