import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
  sourcemap: true,
};

const esm = {
  format: 'esm',
  sourcemap: true,
};

export default [
  {
    input: './src/index.ts',
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
    ],
    output: [
      {
        file: 'dist/index.js',
        ...cjs,
      },
      {
        file: 'dist/index.esm.js',
        ...esm,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
];
