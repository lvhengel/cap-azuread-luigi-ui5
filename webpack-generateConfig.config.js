const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: false,
  mode: 'production',
  entry: {
    luigiConfig: './luigi-config.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'app', 'persons', 'webapp')
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
          to: './libs/luigi-core'
        },
        {
          from: 'node_modules/@luigi-project/client',
          to: './libs/luigi-client'
        }
      ]
      //   patterns: [
      //     // idpProvider OAuth2 callback asset
      //     {
      //       from: "node_modules/@luigi-project/plugin-auth-oauth2/callback.html",
      //       to: path.resolve(__dirname, "assets") + "/auth-oauth2/",
      //     },
      //   ],
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
