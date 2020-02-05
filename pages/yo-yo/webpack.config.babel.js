"use strict";

var path = require("path");
// yo-yo
var page = path.basename(__dirname);

var fs = require("fs");
var webpack = require("webpack");
var appRoot = path.resolve(__dirname, "../", "../");

var configPath = path.resolve(appRoot, "config");
var mainJsDir = path.resolve(appRoot, "resources", "js");
var moduleJsDir = path.resolve(__dirname, "src");
var distPath = path.resolve(appRoot, 'public', 'dist', page);

var ManifestPlugin = require("webpack-manifest-plugin");
var buildPhpConfigFile = require(path.resolve(mainJsDir, "Node", "buildPhpConfigFile"));


module.exports = function (env = {}) {


    var plugins = [];
    // assign the process.env.NODE_ENV (passed to this script via "cross-env") to the local env object
    env.NODE_ENV = process.env.NODE_ENV;
    env.DEV_SERVER = (env.devserver && env.NODE_ENV !== 'production') ? true : false;
    if (env.hasOwnProperty("devserver")) {
        delete env.devserver;
    }


    console.log(env);


    if (process.env.NODE_ENV === "production") {

        /**
         * Concatenating modules is cool, but it comes with increased build time and breaks hot module replacement.
         * That’s why it should only be enabled in production.
         * {@link https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size Decrease Front-end Size}
         */
        plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    }

    if (!env.DEV_SERVER) {
        plugins.push(function () {
            this.hooks.done.tap('generate-php-config', function (stats) {

                var phpFileName = "webpack_manifest.php";
                var phpFileContent;
                // #############################################################
                // create a new Laravel config file
                // #############################################################
                fs.readFile(distPath + "/manifest.json", function (err, hashes) {
                    phpFileContent = buildPhpConfigFile(JSON.parse(hashes));

                    fs.writeFile(
                        configPath + "/" + phpFileName,
                        phpFileContent,
                        function () {
                            console.log(phpFileName + " created!");
                        }
                    );

                });

            });
        });
    }

    var entry = {};
    entry[page] = [
        "./src/sass/style.sass",
        "./src/index.js"
    ];

    return {
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        entry: entry,
        output: {
            path: distPath,
            /**
             * dev-server produce no manifest.json, so the file name can't be hashed
             */
            filename: env.NODE_ENV === "development" ?
                "[name].js" :
                "[name]_[chunkhash].js"
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


        devServer: {
            //host: devServerUrl ? devServerUrl.hostname : currentURL.host,
            //host: "http://localhost:8001/public/",

            compress: true,


            //port: devServerUrl ? devServerUrl.port : 8000,
            port: 8001
            //publicPath: devServerUrl ? devServerUrl.pathname : ""
            // publicPath: localPublicPath
        },

        plugins: plugins.concat([
            new ManifestPlugin({
                map: function (option) {
                    // remove the relative path
                    option.path = path.basename(option.path);
                    return option;
                }
            }),
            // if the NODE_ENV parameter is not get via "cross-env", by default is "production"
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('production')
            })
        ])
    };

};