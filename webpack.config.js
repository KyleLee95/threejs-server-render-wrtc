const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
//isDev is set in the package.json start script.
//This determines what features of webpack will run
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
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
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: './public/main.css' }),
    new Dotenv()
  ]
}
