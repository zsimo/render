"use strict";

/**
 * This object has the only function to communicate to the server (a socket server),
 * writing and reading data.
 *
 * @author Simone Sacchi
 * @version 2018/10/27
 */

var configs = require("configs.js");
var socket = require('socket.io-client')(`${configs.SERVER.SOCKET.HOST}:${configs.SERVER.SOCKET.PORT}`);

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