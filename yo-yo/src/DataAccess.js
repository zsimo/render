"use strict";

var configs = require("../../configs.json");
var socket = require('socket.io-client')(`${configs.SERVER.HOST}:${configs.SERVER.PORT}`);


module.exports = {

    write: function (data, callback) {
        socket.emit("write", data);
        if (callback) {
            socket.on("writing_done", callback);
        }
    },

    read: function (callback) {
        socket.emit("read");
        if (callback) {
            socket.on("reading_done", callback);
        }
    }
};