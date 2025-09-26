export function assert(condition, message) {
    if (!condition) throw new Error(`Assertion failed: ${message}`);
}

export function warn(message) {
    console.warn(`[Glaze Warning]: ${message}`);
}

export function error(message) {
    console.error(`[Glaze Error]: ${message}`);
}
