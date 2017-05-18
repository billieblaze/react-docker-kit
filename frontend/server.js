'use strict';

var express = require('express');

var app = express();

const isDeveloping = process.env.NODE_ENV !== "production";

if (isDeveloping) {

  let webpack = require('webpack');
  let webpackMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  let webpackConfig = require('./webpack.config');
  let compiler = webpack(webpackConfig);

  // serve the content using webpack
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));

} else {
  // serve the content using static directory
  app.use(express.static(__dirname + '/dist'));
}


var server = app.listen(
  process.env.PORT || 8080,
  '0.0.0.0',
  function () {
    var address = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', address, port);
    console.log('Press Ctrl+C to quit.');
  }
);


