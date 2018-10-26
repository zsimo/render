"use strict";

var configs = require("../../configs.json");
// var socket = io(`${configs.SERVER.HOST}:${configs.SERVER.PORT}`);
var socket = require('socket.io-client')(`${configs.SERVER.HOST}:${configs.SERVER.PORT}`);


var state = {};


/**
 * always put an empty element at the end of the list
 */
function addEmptyElement (data) {

    var lastElement = data[data.length - 1];
    if (lastElement.name) {
        data.push({
            name: ""
        });
    }
    return data;
}


module.exports = function (bus) {

    socket.on("data-loaded", function (data) {
        state = data;
        bus.emit("update-sidebar", addEmptyElement(state));
    });

    socket.on("saved", function () {
        console.log("data saved");
    });

    return {

        update: function (index, newValue) {

            state[index].name = newValue;
            this.save(state);
            bus.emit("update-sidebar", addEmptyElement(state));
        },
        save: function (state) {
            socket.emit("save", state);
        },

        loadData: function () {
            socket.emit("get-data", state);
        }
    };
};