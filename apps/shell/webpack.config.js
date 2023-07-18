const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = [];

plugins.push(
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "public", "index.html"),
  })
)

plugins.push(
  new ModuleFederationPlugin({
    name: "host",
    remotes: {
      host: "host@http://localhost:3000/remoteEntry.js",
    },
    exposes: {
      "./counter": "./src/stores/counter.ts",
    },
    shared: {
      react: {
        singleton: true,
        requiredVersion: "^17.0.2",
      },
      "react-dom": {
        singleton: true,
        requiredVersion: "^17.0.2",
      },
    },
  }),
)

if (process.env.NODE_ENV === 'production') {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: plugins,
}
