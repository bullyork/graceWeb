'use strict'
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

module.exports = function () {
  return {
    devtool: 'cheap-module-source-map',
    entry: {
      main:[
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        // only- means to only hot reload for successful updates
        './src/index.js'
        ]
    },
    output: {
      path: path.join(__dirname, '../dist'),
      filename: '[name].js',
      chunkFilename: "[name].js",
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options: {
          limit: 1000,
          name: 'imgs/[name].[ext]'
        }
      },{
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[ext]'
        }
      },{
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', {modules: false}]],
            plugins: [
              'syntax-dynamic-import',
              'transform-async-to-generator',
              'transform-regenerator',
              'transform-runtime'
            ]
          }
        }]
      }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
      new webpack.optimize.CommonsChunkPlugin({ 
        name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      }),
      new HtmlWebpackPlugin({
        template:'template/index.html'
      }),
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      }),
      new ExtractTextPlugin('[name].css'),
    ],
    devServer: {
      hot: true,
      // enable HMR on the server
      contentBase: path.join(__dirname, '../dist'),
      // match the output path
      publicPath: '/'
      // match the output `publicPath`
    },
  }
}
