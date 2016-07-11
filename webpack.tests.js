var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = require('./webpack.config.js');

webpackConfig.entry = {
    tests: ['./src/tests.ts']
};

webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].bundle.css"),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "_": "lodash",
        "React": "react"
    })

];

module.exports = webpackConfig;
