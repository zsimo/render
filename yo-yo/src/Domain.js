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

var emptyItem = {
    name: ""
};

/**
 * always put an empty element at the end of the list
 */
function addEmptyItem (data) {

    var lastElement = data[data.length - 1];

    if (data.length) {
        if (lastElement.name) {
            data.push(emptyItem);
        }
    } else {
        data.push(emptyItem);
    }

    return data;
}


module.exports = function (bus) {

    return {

        updateFirstColumn: function (index, newValue) {
            state[index].name = newValue;
            DataAccess.write(state);
        },

        updateSecondColumn: function (firstColumnItemIndex, selectedItemIndex, newValue) {

            if (!state[firstColumnItemIndex].children) {
                state[firstColumnItemIndex].children = [emptyItem];
            }

            state[firstColumnItemIndex].children[selectedItemIndex].name = newValue;

            DataAccess.write(state);
        },

        updateSelectedItem: function (firstColumnItemIndex) {
            var children = state[firstColumnItemIndex].hasOwnProperty("children") ? state[firstColumnItemIndex].children : [];
            bus.emit("presentation.update-second-column", firstColumnItemIndex, addEmptyItem(children));
        },

        loadData: function () {
            DataAccess.read(function (data) {
                state = data;
                bus.emit("presentation.update-first-column", addEmptyItem(state));
            });
        }
    };
};