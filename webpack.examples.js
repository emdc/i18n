const nodeExternals = require('webpack-node-externals');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    app: [
      '@babel/polyfill',
      '@babel/register',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './examples/simple-react/src/index.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, './examples/simple-react/public/'),
    filename: 'assets/js/[name].min.js',
    publicPath: '/'
  },
  devtool: 'source',
  mode: 'development',
  optimization: {
    minimize: false,
    occurrenceOrder: true,
    mergeDuplicateChunks: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      title: '@emdc/i18n',
      filename: 'index.html',
      template: './examples/simple-react/src/template.hbs',
      env: '"development"',
      hash: true,
      inject: false
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@emdc/i18n': path.resolve(__dirname, './src'),
      view: path.resolve(__dirname, './examples/simple-react/src/view')
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
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }]
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
