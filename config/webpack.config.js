const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // app: './src/index.js',
    index: './src/index.js',
    another: './src/another.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    inline: true,
    hot: true,
    host: "localhost",
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[contenthash].js',
    //   chunkFilename: '[id].css',
    //   ignoreOrder: false, // Enable to remove warnings about conflicting order
    // }),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    })
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
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
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false
    })],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ]
      }
    ]
  }
};
