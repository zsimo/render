"use strict";

/**
 * This object manage the domain state,
 * changing it accordingly with the user interaction with the UI,
 * and use the DataAccess to write and read data from server.
 *
 * @author Simone Sacchi
 * @version 2018/10/27
 */

var configs = require("configs.js");

var DataAccess = require("./DataAccess/" + configs.API_SERVER + ".js");

var state = {};

var emptyItem = {
        name: "",
        children: [
            {
                name: "",
                content: ""
            }
        ]
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

    return JSON.parse(JSON.stringify(data));
}

function getFirstColumnCheckedIndex (state) {
    for (var i = 0, len = state.length; i < len; i += 1) {
        if (state[i].checked) {
            return i;
        }
    }
    return 0;
}

module.exports = function (bus) {

    var write = (function () {
        var previousDataString;

        return function (data) {
            var start = Date.now();
            console.log(data);
            DataAccess.write(data, function () {
                bus.emit("presentation.log", "");
                console.log(Date.now() - start);
            });
            bus.emit("presentation.log", "saving...");
        };
    }());


    return {

        updateFirstColumn: function (index, newValue) {
            state[index].name = newValue;
            state = addEmptyItem(state);

            bus.emit("presentation.render-first-column", state);

            write(state);
        },

        updateSecondColumn: function (firstColumnItemIndex, selectedItemIndex, newValue) {
            state[firstColumnItemIndex].children[selectedItemIndex].name = newValue;
            state[firstColumnItemIndex].children = addEmptyItem(state[firstColumnItemIndex].children);

            bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);

            write(state);
        },

        updateThirdColumn: function (firstColumnItemIndex, secondColumnItemIndex, content) {
            state[firstColumnItemIndex].children[secondColumnItemIndex].content = content;
            write(state);
        },

        updateFirstColumnSelectedItem: function (firstColumnItemIndex) {

            firstColumnItemIndex = parseInt(firstColumnItemIndex, 10);
            state = state.map(function (item, index) {

                if (index === firstColumnItemIndex) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }

                return item;
            });

            bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);

            write(state);
        },

        updateSecondColumnSelectedItem: function (firstColumnItemIndex, secondColumnItemIndex) {

            firstColumnItemIndex = parseInt(firstColumnItemIndex, 10);
            secondColumnItemIndex = parseInt(secondColumnItemIndex, 10);

            state[firstColumnItemIndex].children = state[firstColumnItemIndex].children.map(function (item, index) {

                if (index === secondColumnItemIndex) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }

                return item;
            });

            bus.emit("presentation.render-third-column",
                firstColumnItemIndex,
                secondColumnItemIndex,
                state[firstColumnItemIndex].children[secondColumnItemIndex].content);

            write(state);

        },

        loadData: function () {
            DataAccess.read(function (data) {
                state = addEmptyItem(data);

                bus.emit("presentation.render-first-column", state);

                var firstColumnItemIndex = getFirstColumnCheckedIndex(state);
                bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);

            });
        }
    };
};
