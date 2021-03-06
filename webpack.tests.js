var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackConfig = require('./webpack.config.js');

webpackConfig.entry = {
    tests: ['./src/tests.ts']
};

webpackConfig.devtool = undefined;

webpackConfig.module.postLoaders.unshift(
    /*{ // Used for remap-istanbul to find all sourcemaps of external dependencies
     test: /\.(js)$/,
     loader: "source-map-loader"
     }, */
    {
        // does not include .test. but has valid ending
        test: /^((?!\.test\.).)*\.(ts|js|tsx|jsx)$/,
        // With embedSource=false, we could get original ts files in the reports ... but the reporter does not work :(
        loader: "istanbul-instrumenter?embedSource=true",
        include: webpackConfig.paths.src
    }
);

module.exports = webpackConfig;
