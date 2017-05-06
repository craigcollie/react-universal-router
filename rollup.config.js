import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  format: 'iife',
  entry: './src/index.js',
  dest: './dist/tiny-universal.js',
  moduleName: 'TinyUniversal',
  external: ['lodash'],
  exports: 'named',
  plugins: [
    nodeResolve({
      extensions: ['.js'],
      main: true,
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      //exclude: 'node_modules/process-es6/**',
      exclude: [
        'node_modules/fbjs/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
      ],
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/server.js': ['renderToString'],
      },
    }),
    babel({
      babelrc: false,
      presets: [
        ['es2015', { modules: false }],
        'react',
        'stage-0',
      ],
      //plugins: ['external-helpers'],
    }),
  ],
};
