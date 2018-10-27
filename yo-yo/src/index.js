"use strict";

/**
 * yo-yo/bel/morphdom
 * dom diffing with real dom node
 */



var EventEmitter = require("events");
var bus = new EventEmitter();
var Presentation = require("./presentation.js")(bus);
var Domain = require("./Domain.js")(bus);

Domain.loadData();

bus.on("update-state", function (index, newValue) {
    Domain.update(index, newValue);
});
bus.on("second-column.update-state", function (firstColumnItemIndex, selectedItemIndex, newValue) {
    Domain.updateStateSecondColumnChange(firstColumnItemIndex, selectedItemIndex, newValue);
});

bus.on("update-selected-item", function (itemIndex) {
    Domain.updateSelectedItem(itemIndex);
});
bus.on("update-sidebar", function (state) {
    Presentation.updateSidebar(state);
});

bus.on("update-child-arguments", function (firstColumnItemIndex, children) {
    Presentation.updateSecondColumn(firstColumnItemIndex, children);
});









