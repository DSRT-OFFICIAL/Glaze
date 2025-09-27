import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  // ESM
  {
    input: "src/index.js",
    output: {
      file: "dist/glaze.esm.js",
      format: "esm",
      sourcemap: true
    },
    plugins: [resolve(), commonjs(), terser()]
  },
  // CJS
  {
    input: "src/index.js",
    output: {
      file: "dist/glaze.cjs.js",
      format: "cjs",
      sourcemap: true
    },
    plugins: [resolve(), commonjs(), terser()]
  }
];
