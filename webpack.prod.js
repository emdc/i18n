const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'i18n.min.js',
    library: 'i18n',
    libraryTarget: 'umd'
  },
  devtool: 'source',
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({})],
    minimize: true,
    occurrenceOrder: true,
    mergeDuplicateChunks: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // 'react': path.resolve(__dirname, './src/dummyReact.js'),
      '@emdc/i18n': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          compact: false
        }
      }]
    }]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    }
  },
  stats: {
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    reasons: false
  },
};
