const { Config } = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


module.exports = new Config().merge({
  entry: {
    app: path.resolve(__dirname, '../src/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'assets/js/[name].min.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
    alias: {
      data: path.resolve(__dirname, '../src/data'),
      styles: path.resolve(__dirname, '../src/styles'),
      utils: path.resolve(__dirname, '../src/utils'),
      view: path.resolve(__dirname, '../src/view'),
    }
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'i18n example',
      template: path.resolve(__dirname, '../src/template.hbs'),
      filename: 'index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      }
    ]
  }
});
