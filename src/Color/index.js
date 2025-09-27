// ESM
export * from "./Color/index.js";

// CJS fallback
module.exports = {
  colors: require("./Color/Colors-libs.cjs.js"),
};
