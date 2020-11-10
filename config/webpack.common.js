const paths = require('./paths')
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const { createHtmlWebpackPluginSet } = require('./createHtmlWebpackPluginSet');

console.log(`process.env.NODE_ENV => ${process.env.NODE_ENV}`)
console.log(`devMode => ${devMode}`)

const plugins = [
  // Copies files from target to destination folder
  // new CopyWebpackPlugin({
  //   patterns: [
  //     {
  //       from: paths.public,
  //       to: 'assets',
  //       globOptions: {
  //         ignore: ['*.DS_Store'],
  //       },
  //     },
  //   ],
  // }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? '[name].css' : 'css/[name].[contenthash].css',
    chunkFilename: devMode ? '[id].css' : 'css/[id].[contenthash].css',
  }),
];

let pageList = [
  { name: 'index', chunks:  ['main', 'index']}
]
plugins.unshift(...createHtmlWebpackPluginSet(pageList))

module.exports = {
  entry: {
    main: `${paths.src_js}/main.js`,
    index: `${paths.src_js}/index.js`,
    index_2: `${paths.src_js}/another.js`,
    another: `${paths.src_js}/another.js`,
    'babel-polyfill': 'babel-polyfill'
  },
  plugins,
  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        include: [paths.src_js],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true, modules: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ]
      },
      {
        test:  /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        }
      }
    ]
  }
};
