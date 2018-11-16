/**
 * Created by Simone.Sacchi on 11/09/2017.
 */

"use strict";

var path = require("path");
var appRoot = path.resolve(__dirname, "../");

var app = require("express")();
var fs = require("fs");
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);

var configs = require(path.resolve(appRoot, "resources", "js", "configs.json"));

var dataFile = path.resolve(appRoot, "database", "data.json");


server.listen(configs.SERVER.PORT);
console.log("socket listen on port: " + configs.SERVER.PORT);

io.on("connection", function(socket){

    socket.on("write", function (data) {
        try {
            fs.writeFile(dataFile, JSON.stringify(data, null, 2), function () {
                console.log("writing_done");
                socket.emit("writing_done");
            });
        } catch (e) {
            console.log(e);
        }

    });


    socket.on("read", function () {
        try {
            fs.readFile(dataFile, 'utf8', function (err, data) {
                if (err) throw err;
                console.log("reading_done");
                socket.emit("reading_done", JSON.parse(data));
            });
        } catch (e) {
            console.log(e);
        }

    });

});


