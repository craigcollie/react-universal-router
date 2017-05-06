import path from 'path';
import nodeExternals from 'webpack-node-externals';

const env = process.env.NODE_ENV;

export default {
  entry: './src/index.js',
  output: {
    filename: `tiny-universal${(env === 'production') ? 'min' : ''}.js`,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'TinyUniversal',
  },
  target: 'node',
  externals: [
    nodeExternals(),
  ],
  devtool: 'cheap-eval-source-map',
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
