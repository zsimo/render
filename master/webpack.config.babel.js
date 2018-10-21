"use strict";

module.exports = function (env = {}) {

    let path = require("path");
    let HtmlWebpackPlugin = require('html-webpack-plugin');

    const publicPath = path.resolve(__dirname, 'public');
    const jsPath = path.resolve(publicPath, 'js');

    let HtmlWebpackPluginOption = {};
    if (env.build) {
        HtmlWebpackPluginOption.filename = publicPath + "/index.html";
    }

    console.log(env);

    return {
        entry: "./src/init.js",
        output: {
            path: jsPath,
            filename: 'bundle.js'
        },

        devServer: {
            contentBase: publicPath
        },

        plugins: [
            new HtmlWebpackPlugin(HtmlWebpackPluginOption)
        ]
    };

};