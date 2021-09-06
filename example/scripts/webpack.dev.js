const { Config } = require('webpack-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = new Config()
  .extend(path.resolve(__dirname, 'webpack.base.js'))
  .merge({
    mode: 'development',
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, '../public'),
      open: true,
      compress: true,
      http2: true,
      hot: true,
      port: 3000
    },

    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],

    module: {
      rules: [
        {
          test: /(\.sass|\.scss|\.css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: true,
                modules: {
                  localIdentName: '[local]___[hash:base64:5]'
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: false,
                  modules: true,
                  hashPrefix: `web${Date.now()}`,
                  includePaths: [path.resolve(__dirname, '../src/styles'), path.resolve(__dirname, '../node_modules')]
                }
              }
            }
          ]
        }
      ]
    }
  });
