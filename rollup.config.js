import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

const pkg = require('./package.json');

export default [
  // -----------------------------
  // Build JS: ESM + CJS + UMD
  // -----------------------------
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.module, // ESM
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.main, // CJS
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/glaze.umd.js', // UMD
        format: 'umd',
        name: 'Glaze',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      terser(), // Minify
    ],
  },

  // -----------------------------
  // Build TypeScript types
  // -----------------------------
  {
    input: 'src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
