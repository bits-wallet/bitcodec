const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
  return {
    entry: {
      bitcoin: "./src/bitcoin.ts",
    },
    output: {
      filename: "[name].umd.js",
      library: "[name]",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: "source-map",
    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".d.ts"],
      fallback: {
        buffer: require.resolve("buffer"),
        os: require.resolve("os-browserify/browser"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  };
};
