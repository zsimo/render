"use strict";

var appName = "yo-yo";
var path = require("path");
var appRoot = path.resolve(__dirname, "../", "../");
var mainJsDir = path.resolve(appRoot, "resources", "js");
var moduleJsDir = path.resolve(__dirname, "src");


module.exports = function (env = {}) {

    let path = require("path");
    // let HtmlWebpackPlugin = require('html-webpack-plugin');

    const localPublicPath = path.resolve(__dirname, 'public');
    // const compiledPath = path.resolve(localPublicPath, 'compiled');
    const compiledPath = path.resolve(appRoot, 'public', 'compiled', appName);

    // let HtmlWebpackPluginOption = {
    //     template: "./src/index.html"
    // };
    // if (env.build) {
    //     HtmlWebpackPluginOption.filename = localPublicPath + "/index.html";
    // }

    console.log(env);
    console.log(localPublicPath);

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
            modules: ['node_modules', mainJsDir, moduleJsDir]
        },

        // devServer: {
        //     contentBase: localPublicPath
        // }



        devServer: {
            //host: devServerUrl ? devServerUrl.hostname : currentURL.host,
            //host: "http://localhost:8001/public/",

            compress: true,


            //port: devServerUrl ? devServerUrl.port : 8000,
            port: 8001
            //publicPath: devServerUrl ? devServerUrl.pathname : ""
            // publicPath: localPublicPath
        },

        // plugins: [
        //     new HtmlWebpackPlugin(HtmlWebpackPluginOption)
        // ]
    };

};