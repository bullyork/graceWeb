'use strict'
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const path = require('path');

var app = express();
var compiler = webpack(webpackConfig());

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/dist", // Same as `output.publicPath` in most cases.
  stats: {
    colors: true,
    chunks: false,
  },
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000
}));

app.use(express.static('site'));

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});