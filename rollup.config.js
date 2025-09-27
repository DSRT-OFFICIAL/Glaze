import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const banner = `/*!
 * Glaze.js v${pkg.version}
 * Pro-level Color Library inspired by Three.js
 * (c) 2025 Glaze Library
 * Released under MIT License
 */`;

export default [
  // ESM Build
  {
    input: "src/index.js",
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
      banner,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },

  // CJS Build
  {
    input: "src/index.js",
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      banner,
      exports: "named"
    },
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },

  // UMD Build (browser global)
  {
    input: "src/index.js",
    output: {
      file: "dist/glaze.umd.js",
      format: "umd",
      name: "Glaze",
      sourcemap: true,
      banner
    },
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  }
];
