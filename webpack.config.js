const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

module.exports = {
  entry: {
    'main': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      alwaysWriteToDisk: true,
      template: './src/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      // {from: 'src/vendor', to: 'vendor'},
      { from: 'src/img', to: 'img' },
    ], {})
  ],
  devServer: {
    hot: false
    // headers: { 'Access-Control-Allow-Origin': '*' },
    // https: false,
    // disableHostCheck: true,

  },
};
