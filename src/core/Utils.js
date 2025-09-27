// ==================== Utils.js ====================

// ---------- General Utilities ----------
export const isNumber = (value) => typeof value === "number" && !isNaN(value);
export const isString = (value) => typeof value === "string";
export const isArray = Array.isArray;
export const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

// ---------- Math Utilities ----------
export const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
export const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);
export const round = (value, decimals = 0) =>
  Number(Math.round(value + "e" + decimals) + "e-" + decimals);
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomFloat = (min, max) => Math.random() * (max - min) + min;
export const randomBool = (prob = 0.5) => Math.random() < prob;

// ---------- Array Utilities ----------
export const shuffleArray = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const pickRandom = (arr) => (isArray(arr) && arr.length ? arr[randomInt(0, arr.length - 1)] : null);
export const mergeArrays = (...arrays) => arrays.flat();

// ---------- Object Utilities ----------
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
export const mergeObjects = (...objs) => Object.assign({}, ...objs);

// ---------- String Utilities ----------
export const capitalize = (str) => (isString(str) ? str.charAt(0).toUpperCase() + str.slice(1) : str);
export const toKebabCase = (str) =>
  isString(str)
    ? str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase()
    : str;

// ---------- Color Helpers ----------
export const rgbToCss = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;
export const rgbaToCss = ({ r, g, b, a = 1 }) => `rgba(${r}, ${g}, ${b}, ${a})`;

// ---------- Debug / Logging ----------
export const log = (...args) => console.log("[Glaze]", ...args);
export const warn = (...args) => console.warn("[Glaze]", ...args);
export const error = (...args) => console.error("[Glaze]", ...args);
