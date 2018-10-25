"use strict";

/**
 * yo-yo/bel/morphdom
 * dom diffing with real dom node
 */

var configs = require("../../configs.json");
var socket = io(`${configs.SERVER.HOST}:${configs.SERVER.PORT}`);
var EventEmitter = require("events");
var bus = new EventEmitter();
var view = require("./view.js")(bus);


var state = require("../../server/data.json");
state.push({name: ""});




bus.on("update-state", function (index, newValue) {
    state[index].name = newValue;
    bus.emit("save", state);
    bus.emit("update-sidebar", state);
});
bus.on("update-sidebar", function (state) {
    view.updateSidebar(state);
});
bus.on("save", function (state) {
    socket.emit("save", state);
});



view.updateSidebar(state);
