import nodeExternals from 'webpack-node-externals';

export default {
  entry: './src/tiny-universal.js',

  output: {
    library: 'tiny-universal',
    libraryTarget: 'umd',
  },

  externals: [
    nodeExternals(),
  ],

  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
