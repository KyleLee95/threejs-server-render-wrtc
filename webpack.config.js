import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from "dotenv-webpack";
//isDev is set in the package.json start script.
//This determines what features of webpack will run
const isDev = process.env.NODE_ENV === "development";
const config = {
  mode: isDev ? "development" : "production",
  entry: ["./src/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "./public/main.css" }),
    new Dotenv(),
  ],
};

export default config;
