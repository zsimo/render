"use strict";

var configs = require("../../configs.json");
var socket = io(`${configs.SERVER.HOST}:${configs.SERVER.PORT}`);


var state = {};


module.exports = function (bus) {

    socket.on("data-loaded", function (data) {
        state = data;
        bus.emit("update-sidebar", state);
    });

    socket.on("saved", function () {
        console.log("data saved");
    });

    return {

        update: function (index, newValue) {
            state[index].name = newValue;
            this.save(state);
            bus.emit("update-sidebar", state);
        },
        save: function (state) {
            socket.emit("save", state);
        },

        loadData: function () {

            // {
            //     "name": ""
            // },
            socket.emit("get-data", state);
        }
    };
};