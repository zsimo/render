"use strict";


var riot = require("riot");
require("view/first-column.html").default;

var EventEmitter = require("events");
var bus = new EventEmitter();
var Domain = require("./Domain.js")(bus);


riot.mount('first-column', {
    bus: bus,
    state: []
});

Domain.loadData();



