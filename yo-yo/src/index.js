"use strict";

/**
 * yo-yo/bel/morphdom
 * dom diffing with real dom node
 */



var EventEmitter = require("events");
var bus = new EventEmitter();
var Presentation = require("./Presentation.js")(bus);
var Domain = require("./Domain.js")(bus);

Domain.loadData();

bus.on("domain.update-first-column-selected-item", function (itemIndex) {
    Domain.updateFirstColumnSelectedItem(itemIndex);
});
bus.on("domain.update-second-column-selected-item", function (firstColumnItemIndex, secondColumnItemIndex) {
    Domain.updateSecondColumnSelectedItem(firstColumnItemIndex, secondColumnItemIndex);
});
bus.on("domain.update-first-column", function (selectedItemIndex, newValue) {
    Domain.updateFirstColumn(selectedItemIndex, newValue);
});
bus.on("domain.update-second-column", function (firstColumnItemIndex, selectedItemIndex, newValue) {
    Domain.updateSecondColumn(firstColumnItemIndex, selectedItemIndex, newValue);
});

bus.on("presentation.render-first-column", function (state) {
    Presentation.updateFirstColumn(state);
});
bus.on("presentation.render-second-column", function (firstColumnItemIndex, children) {
    Presentation.updateSecondColumn(firstColumnItemIndex, children);
});
bus.on("presentation.render-third-column", function (content) {
    Presentation.updateThirdColumn(content);
});
bus.on("presentation.log", function (message) {
    Presentation.log(message);
});









