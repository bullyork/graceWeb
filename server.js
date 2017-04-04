'use strict'
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const path = require('path');

var app = express();
var compiler = webpack(webpackConfig());

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/", // Same as `output.publicPath` in most cases.
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

app.get('*', function (request, response){
  if(request.originalUrl.indexOf('hot-update.json') === -1){
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  }
})

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});