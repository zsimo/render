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

bus.on("domain.update-first-column", function (index, newValue) {
    Domain.updateFirstColumn(index, newValue);
});
bus.on("domain.update-second-column", function (firstColumnItemIndex, selectedItemIndex, newValue) {
    Domain.updateSecondColumn(firstColumnItemIndex, selectedItemIndex, newValue);
});

bus.on("domain.update-selected-item", function (itemIndex) {
    Domain.updateSelectedItem(itemIndex);
});


bus.on("presentation.update-first-column", function (state) {
    Presentation.updateFirstColumn(state);
});
bus.on("presentation.update-second-column", function (firstColumnItemIndex, children) {
    Presentation.updateSecondColumn(firstColumnItemIndex, children);
});









