// Math helper untuk Glaze
export const MathUtils = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    clamp: (value, min, max) => Math.max(min, Math.min(max, value)),

    lerp: (a, b, t) => a + (b - a) * t,

    map: (value, inMin, inMax, outMin, outMax) => 
        outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin),

    randomFloat: (min=0, max=1) => Math.random() * (max - min) + min,
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

    degToRad: (deg) => deg * MathUtils.DEG2RAD,
    radToDeg: (rad) => rad * MathUtils.RAD2DEG
};
