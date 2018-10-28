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
        name: "",
        children: [
            {name: ""}
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

function getFirstColumneCheckedIndex (state) {
    for (var i = 0, len = state.length; i < len; i += 1) {
        if (state[i].checked) {
            return i;
        }
    }
    return 0;
}

module.exports = function (bus) {

    return {

        updateFirstColumn: function (index, newValue) {
            state[index].name = newValue;
            state = addEmptyItem(state);
            DataAccess.write(state);
            bus.emit("presentation.render-first-column", state);
        },

        updateSecondColumn: function (firstColumnItemIndex, selectedItemIndex, newValue) {
            state[firstColumnItemIndex].children[selectedItemIndex].name = newValue;
            state[firstColumnItemIndex].children = addEmptyItem(state[firstColumnItemIndex].children);

            DataAccess.write(state);
            bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);
        },

        updateSelectedItem: function (firstColumnItemIndex) {
            firstColumnItemIndex = parseInt(firstColumnItemIndex, 10);
            state = state.map(function (item, index) {

                if (index === firstColumnItemIndex) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }

                return item;
            });

            DataAccess.write(state);
            bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);
        },

        loadData: function () {
            DataAccess.read(function (data) {
                state = addEmptyItem(data);

                bus.emit("presentation.render-first-column", state);

                var firstColumnItemIndex = getFirstColumneCheckedIndex(state);
                bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);

            });
        }
    };
};
