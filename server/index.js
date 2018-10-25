/**
 * Created by Simone.Sacchi on 11/09/2017.
 */

"use strict";

var configs = require("../configs.json");
var utils = require("../utils.js");

var PORT = configs.SERVER.PORT;

var app = require("express")();
var fs = require("fs");
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);

server.listen(PORT);

io.on("connection", function(socket){
    // console.log('a user connected');
    socket.on("save", function (state) {
        try {
            fs.writeFileSync(__dirname + "/data.json", JSON.stringify(state, null, 2));
        } catch (e) {
            console.log(e);
        }

        console.log(state);
        socket.emit("saved");
    });


    //socket.on("disconnect", function () {
    //    console.log("user disconnect");
    //});

});


