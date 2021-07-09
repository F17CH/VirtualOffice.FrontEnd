const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotenvPlugin = require('dotenv-webpack');

const root = path.resolve(__dirname);

const env = new DotenvPlugin({
  path: path.resolve(root, ".env"),
  safe: false,
  systemvars: false
});

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  entry: "./src/app.tsx",
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.png$/,
        exclude: /(node_modules)/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[hash].[ext]'
            }
          },
          'extract-loader',
          'css-loader',
          'postcss-loader'
        ],
        include: [/fonts/]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        loader: 'file-loader',
        include: [/fonts/],
        options: {
          name: '[hash].[ext]',
          outputPath: 'css/',
          publicPath: url => '../css/' + url
        }
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist/renderer"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: "/",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  plugins: [
    env,
    new HtmlWebpackPlugin({
      template: "./src/index.ejs"
    })]
};
