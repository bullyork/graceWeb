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
      main:['babel-polyfill','./src/index.js']
    },
    output: {
      path: path.join(__dirname, '../site/dist'),
      filename: '[name].[chunkhash].js',
      chunkFilename: "[name].[chunkhash].js",
      publicPath: '/dist'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    externals: {
      jquery: 'window.$',
      Typed: 'window.Typed'
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },{
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          limit: 1000,
          name: 'imgs/[name].[hash:8].[ext]'
        }
      },{
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 1000,
          name: 'imgs/[name].[hash:8].[ext]'
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
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new HtmlWebpackPlugin({
        template:'template/index.html',
        filename: '../index.html'
      }),
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      }),
      new ExtractTextPlugin('[name].[contenthash:8].css'),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
    ],
  }
}
