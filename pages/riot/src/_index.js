"use strict";


/**
 * this index is really like mediator
 *
 * @see https://app.pluralsight.com/library/courses/javascript-practical-design-patterns/table-of-contents
 *
 * @author Simone Sacchi
 * @version 2019/01/23
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
bus.on("domain.update-third-column", function ( firstColumnItemIndex, secondColumnItemIndex, content) {
    Domain.updateThirdColumn(firstColumnItemIndex, secondColumnItemIndex, content);
});


bus.on("presentation.render-first-column", function (state) {
    Presentation.updateFirstColumn(state);
});
bus.on("presentation.render-second-column", function (firstColumnItemIndex, children) {
    Presentation.updateSecondColumn(firstColumnItemIndex, children);
});
bus.on("presentation.render-third-column", function (firstColumnItemIndex, secondColumnItemIndex, content) {
    Presentation.updateThirdColumn(firstColumnItemIndex, secondColumnItemIndex, content);
});
bus.on("presentation.log", function (message) {
    Presentation.log(message);
});









