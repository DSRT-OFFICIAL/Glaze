// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';

const INPUT = 'src/index.js';
const OUTPUT_DIR = 'dist';

export default [
  // ESM build
  {
    input: INPUT,
    output: {
      file: `${OUTPUT_DIR}/glaze.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    ],
  },
  // CJS build
  {
    input: INPUT,
    output: {
      file: `${OUTPUT_DIR}/glaze.cjs.js`,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    ],
  },
  // UMD build for browser
  {
    input: INPUT,
    output: {
      file: `${OUTPUT_DIR}/glaze.umd.js`,
      format: 'umd',
      name: 'Glaze',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    ],
  },
];
