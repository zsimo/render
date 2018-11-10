"use strict";

var appName = "yo-yo";
var path = require("path");
var appRoot = path.resolve(__dirname, "../", "../");
var mainJsDir = path.resolve(appRoot, "resources", "js");


module.exports = function (env = {}) {

    let path = require("path");
    let HtmlWebpackPlugin = require('html-webpack-plugin');

    const localPublicPath = path.resolve(__dirname, 'public');
    const compiledPath = path.resolve(appRoot, 'public', 'compiled', appName);

    let HtmlWebpackPluginOption = {
        template: "./src/index.html"
    };
    if (env.build) {
        HtmlWebpackPluginOption.filename = localPublicPath + "/index.html";
    }

    console.log(env);

    return {
        mode: 'development',
        entry: [
                "./src/sass/style.sass",
                "./src/index.js"
        ],

        output: {
            path: compiledPath,
            filename: 'bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.css$/, loader: "style-loader!css-loader"
                },
                {
                test: /\.sass$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }]
        },

        resolve: {
            extensions: [".js", ".ts", ".json", ".css", ".scss", ".sass", '.jpg'],
            modules: ['node_modules', mainJsDir, path.resolve(__dirname, "src")]
        },

        devServer: {
            contentBase: localPublicPath
        },

        plugins: [
            new HtmlWebpackPlugin(HtmlWebpackPluginOption)
        ]
    };

};