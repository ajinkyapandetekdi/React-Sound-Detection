import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'AudioDetector',
    sourcemap: true,
  },
  plugins: [
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-react'] }),
    terser(),
  ],
};
