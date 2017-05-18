var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: [
    './src/index.js',
    'webpack-hot-middleware/client'
  ],
  output: {
    path: __dirname + '/dist', 
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader!cssnext-loader'
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    modules: ['node_modules', 'src'],
    alias: {
      // 'react-grid-layout': path.join(__dirname, 'node_modules/react-grid-layout/css/styles.css'),
      // 'react-resizable': path.join(__dirname, 'node_modules/react-resizable/css/styles.css'),
      //'leaflet': path.join(__dirname, 'node_modules/leaflet/dist/leaflet.css')
     }
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html'
    }),
    // OccurenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  cssnext: {
    compress: true,
    features: {
      rem: false,
      pseudoElements: false,
      colorRgba: false
    }
  }
};