/* eslint @typescript-eslint/no-var-requires: "off" */
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
// const CopyPlugin = require('html-webpack-plugin')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'development',

  output: {
    publicPath: '/',
  },

  entry: './index.tsx',

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
    }),
    new ForkTsCheckerPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: './images',
    //       to: 'images',
    //     },
    //   ],
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'inline-source-map',

  devServer: {
    // contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 4000,
    hot: true,
  },
}
