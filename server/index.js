/**
 * Created by Simone.Sacchi on 11/09/2017.
 */

"use strict";

var configs = require("../configs.json");

var app = require("express")();
var fs = require("fs");
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);

var dataFile = "./data.json";


server.listen(configs.SERVER.PORT);

io.on("connection", function(socket){
    // console.log('a user connected');
    socket.on("save", function (state) {
        try {
            fs.writeFile(dataFile, JSON.stringify(state, null, 2), function () {
                socket.emit("saved");
            });
        } catch (e) {
            console.log(e);
        }


    });


    socket.on("get-data", function () {
        try {
            fs.readFile(dataFile, 'utf8', function (err, data) {
                if (err) throw err;
                console.log(data);
                socket.emit("data-loaded", JSON.parse(data));
            });
        } catch (e) {
            console.log(e);
        }

    });

});


