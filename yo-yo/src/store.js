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
            // bus.emit("update-sidebar", addEmptyElement(state));
        },


        updateStateSecondColumnChange: function (firstColumnItemIndex, selectedItemIndex, newValue) {

            if (!state[firstColumnItemIndex].children) {
                state[firstColumnItemIndex].children = [
                    {
                        name : ""
                    }
                ];
            }

            state[firstColumnItemIndex].children[selectedItemIndex].name = newValue;
            this.save(state);

            // var children = state[firstColumnItemIndex].hasOwnProperty("children") ? state[firstColumnItemIndex].children : [];
            // bus.emit("update-child-arguments", firstColumnItemIndex, addEmptyElement(children));
        },
        updateSelectedItem: function (firstColumnItemIndex) {

            var children = state[firstColumnItemIndex].hasOwnProperty("children") ? state[firstColumnItemIndex].children : [];

            bus.emit("update-child-arguments", firstColumnItemIndex, addEmptyElement(children));
        },
        save: function (state) {
            socket.emit("save", state);
        },

        loadData: function () {
            socket.emit("get-data", state);
        }
    };
};