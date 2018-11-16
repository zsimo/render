"use strict";

/**
 * This object has the only function to communicate to the server (a socket server),
 * writing and reading data.
 *
 * @author Simone Sacchi
 * @version 2018/10/27
 */

var configs = require("configs.json");
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
        fetch('http://localhost:8000/api/read', {
            method: 'get'
        })
            //.then(response => response.json())
            .then(function (response) {
                return response.json()
            })
            .then(callback)
            .catch(function (error) {
                throw new Error(error);
            });
    }
};