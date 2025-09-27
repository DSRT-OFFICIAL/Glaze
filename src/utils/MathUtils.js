export const MathUtils = {
    clamp: (v, min, max) => Math.max(min, Math.min(max, v)),
    lerp: (a, b, t) => a + (b - a) * t,
    degToRad: (d) => d * Math.PI / 180,
    radToDeg: (r) => r * 180 / Math.PI,
    randomRange: (min, max) => Math.random() * (max - min) + min,
    rangeMap: (value, inMin, inMax, outMin, outMax) =>
        ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
};
