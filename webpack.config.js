const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

  const config = {
    entry: {
      app: "./client/index.js"
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: 'index_bundle.js'
    },
    resolve: {
      extensions: [".js",".jsx", ".json", ".css"]
    },
    module: {
      loaders: [{
          test: /\.jsx?$/,
          loaders: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          loaders: ['eslint-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: "[name]--[local]--[hash:base64:8]"
              }
            },
            "postcss-loader" // has separate config, see postcss.config.js
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
    publicPath: "http://localhost:8080/",
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    hot: true
  }
}
module.exports = config