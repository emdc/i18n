const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {app: ['./src/index.js']},
  devtool: 'source',
  mode: 'production',
  externals: [nodeExternals()],
  target: 'node',
  optimization: {
    occurrenceOrder: true,
    mergeDuplicateChunks: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@emdc/i18n': path.resolve(__dirname, './src'),
    }
  },
  module: {},
  stats: {
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    reasons: false
  },
};
