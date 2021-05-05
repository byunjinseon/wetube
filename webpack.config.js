const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
           {
              test: /\.(scss)$/,
              use: [
                      {
                          loader: MiniCssExtractPlugin.loader
                      }, //minicssextract plugin
                      {
                          loader: "css-loader"
                      }, //css-loader
                      {
                          loader: "postcss-loader",
                          options: {
                              postcssOptions: {
                                  plugins: [
                                      [
                                          'autoprefixer'
                                      ]
                                  ]
                              }
                          }
                      }, //postcss-loader
                      {
                          loader: "sass-loader"
                      } //sass-loader
                  ] //use
           }
        ]
     },  
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css'
        }),
    ]
};

module.exports =config;