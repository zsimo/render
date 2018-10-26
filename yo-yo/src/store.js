"use strict";

var configs = require("../../configs.json");
var socket = require('socket.io-client')(`${configs.SERVER.HOST}:${configs.SERVER.PORT}`);

var state = {};

/**
 * always put an empty element at the end of the list
 */
function addEmptyElement (data) {

    var lastElement = data[data.length - 1];

    if (data.length) {
        if (lastElement.name) {
            data.push({
                name: ""
            });
        }
    } else {
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
        updateSelectedItem: function (itemIndex) {

            var children = state[itemIndex].hasOwnProperty("children") ? state[itemIndex].children : [];

            bus.emit("update-child-arguments", addEmptyElement(children));
        },
        save: function (state) {
            socket.emit("save", state);
        },

        loadData: function () {
            socket.emit("get-data", state);
        }
    };
};