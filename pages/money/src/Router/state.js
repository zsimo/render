"use strict";

var routes = require("money/src/Router/routes");

var state = {};
state[routes.EDIT] = {
    type: "input",
    amount: 300
};



module.exports = state;