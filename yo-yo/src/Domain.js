"use strict";

/**
 * This object manage the domain state,
 * changing it accordingly with the user interaction with the UI,
 * and use the DataAccess to write and read data from server.
 *
 * @author Simone Sacchi
 * @version 2018/10/27
 */

var DataAccess = require("./DataAccess");

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

    return {

        update: function (index, newValue) {
            state[index].name = newValue;
            DataAccess.write(state);
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

            DataAccess.write(state);
        },

        updateSelectedItem: function (firstColumnItemIndex) {
            var children = state[firstColumnItemIndex].hasOwnProperty("children") ? state[firstColumnItemIndex].children : [];
            bus.emit("update-child-arguments", firstColumnItemIndex, addEmptyElement(children));
        },

        loadData: function () {
            DataAccess.read(function (data) {
                state = data;
                bus.emit("update-sidebar", addEmptyElement(state));
            });
        }
    };
};