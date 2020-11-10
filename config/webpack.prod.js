const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

common.plugins.push(new CleanWebpackPlugin())

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new CssMinimizerPlugin({
        sourceMap: true
      })
    ]
    // minimizer: [new TerserPlugin({
    //   cache: true,
    //   extractComments: false,
    //   sourceMap: true // Must be set to true if using source-maps in production
    // })]
  }
});
