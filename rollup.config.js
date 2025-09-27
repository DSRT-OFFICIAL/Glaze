import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default [
  // ESM
  {
    input: "src/index.ts", // bisa index.js juga, kalau TS tetap generate d.ts
    output: {
      file: "dist/glaze.esm.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), typescript({ declaration: true, outDir: "dist" }), terser()],
  },
  // CJS
  {
    input: "src/index.ts",
    output: {
      file: "dist/glaze.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), typescript({ declaration: false }), terser()],
  },
];
