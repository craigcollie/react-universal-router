import path from 'path';
import nodeExternals from 'webpack-node-externals';

const env = process.env.NODE_ENV;

export default {
  entry: './src/tiny-universal.js',

  output: {
    library: 'tiny-universal',
    libraryTarget: 'umd',
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },

  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
