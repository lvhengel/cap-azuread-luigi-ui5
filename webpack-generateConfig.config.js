const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: false,
  mode: 'production',
  entry: {
    luigiConfig: './luigi/luigi-config.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'app')
  },
  plugins: [
    // new webpack.BannerPlugin(
    //   `
    //   Don't be afraid!
    //   This file was generated automatically and you should not modify it.
    //   The documentation (located in /docs) will tell you how to modify Luigi configuration with pleasure.
    //   `
    // ),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/@luigi-project/core',
          to: path.resolve(__dirname, 'app', 'assets') + '/luigi-core'
        },
        {
          from: 'node_modules/@luigi-project/client',
          to: path.resolve(__dirname, 'app', 'assets') + '/luigi-client'
        },
        {
          from: 'node_modules/@luigi-project/plugin-auth-oauth2',
          to: path.resolve(__dirname, 'app', 'assets') + '/auth-oauth2/'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          rootMode: 'root'
        }
      }
    ]
  }
};
