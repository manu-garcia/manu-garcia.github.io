const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {
  build: 'build',
};

const isDev = process.argv.find(arg => arg.includes('webpack-dev-server'));
const outputPath = isDev ? path.resolve(paths.build) : path.resolve(paths.build);

module.exports = {
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'main.[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['text-loader']
      },
      // Build a separated css bundle
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { minimize: true }}, 'sass-loader']
        })
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(outputPath),
    overlay: {
      errors: true
    },
    port: 8082,
    host: 'localhost'
  },
  plugins: [
    // Copy the html template and inject the bundles
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
      }
    }),
    // Clean build directory before each new build
    new CleanWebpackPlugin([paths.build]),
    // Extract CSS to a separated bundle
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css'
    }),
    // Copy the service worker as it is to the build folder
    new CopyWebpackPlugin([
      './public/manifest.json',
    ]),
  ],

};