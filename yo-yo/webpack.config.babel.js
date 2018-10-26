"use strict";

module.exports = function (env = {}) {

    let path = require("path");
    let HtmlWebpackPlugin = require('html-webpack-plugin');

    const publicPath = path.resolve(__dirname, 'public');
    const jsPath = path.resolve(publicPath, 'js');

    let HtmlWebpackPluginOption = {
        template: "./src/index.html"
    };
    if (env.build) {
        HtmlWebpackPluginOption.filename = publicPath + "/index.html";
    }

    console.log(env);

    return {
        mode: 'development',
        entry: [
                "./src/sass/style.sass",
                "./src/index.js"
        ],

        output: {
            path: jsPath,
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
            extensions: [".js", ".ts", ".json", ".css", ".scss", ".sass", '.jpg']
        },

        devServer: {
            contentBase: publicPath
        },

        plugins: [
            new HtmlWebpackPlugin(HtmlWebpackPluginOption)
        ]
    };

};