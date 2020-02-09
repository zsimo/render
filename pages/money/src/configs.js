"use strict";

var ObjectAssign = require("object-assign");
var configs = require("configs.js");
console.log(configs);

module.exports = ObjectAssign({
    "VERSION" : "1.0.0"
}, configs);