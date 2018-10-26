"use strict";

/**
 * yo-yo/bel/morphdom
 * dom diffing with real dom node
 */



var EventEmitter = require("events");
var bus = new EventEmitter();
var view = require("./view.js")(bus);
var store = require("./store.js")(bus);



bus.on("update-state", function (index, newValue) {
    store.update(index, newValue);
});
bus.on("second-column.update-state", function (firstColumnItemIndex, selectedItemIndex, newValue) {
    store.updateStateSecondColumnChange(firstColumnItemIndex, selectedItemIndex, newValue);
});



bus.on("update-selected-item", function (itemIndex) {
    store.updateSelectedItem(itemIndex);
});
bus.on("update-sidebar", function (state) {
    view.updateSidebar(state);
});

bus.on("update-child-arguments", function (firstColumnItemIndex, childred) {
    view.updateSecondColumn(firstColumnItemIndex, childred);
});





store.loadData();



