import path from 'path';

export default {
  entry: './src/index.js',
  output: {
    filename: 'tiny-universal.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'TinyUniversal',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
