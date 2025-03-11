// import path from 'path';
const path = require('path');
const dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.join(__dirname, "src", "index.ts"),
  target: "node",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new dotenv(), // Use dotenv-webpack to load environment variables from .env file
  ],
};

// const __dirname = new URL('.', import.meta.url).pathname;
//
// export default {
//   entry: path.join(__dirname, 'src', 'index.ts'),
//   target: 'node',
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'index.js',
//   },
//   resolve: {
//     extensions: ['.ts', '.js'],
//   },
//   devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.ts$/i,
//         use: 'ts-loader',
//       },
//     ],
//   },
// }
