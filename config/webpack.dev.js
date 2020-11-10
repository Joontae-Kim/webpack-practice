const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// only enable hot in development
common.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'inline-source-map',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    compress: true,
    inline: true,
    hot: true,
    host: "localhost",
    port: 9000
  },
});
