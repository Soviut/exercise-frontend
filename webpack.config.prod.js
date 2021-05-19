/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: './index.tsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlPlugin({
      template: 'index.html',
      title: 'Vice',
    }),
    new ForkTsCheckerPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new FaviconsWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'images/*.jpg',
    //       to: 'images/',
    //       transform(content, absoluteFrom) {
    //         console.log(absoluteFrom)
    //         return content
    //       }
    //     },
    //   ],
    // }),
  ],
}
