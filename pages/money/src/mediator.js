"use strict";

var bus = require("money/src/bus");

module.exports = function (router, presentation) {
    bus.on("navigate", function (page) {
        router.navigate(page);
    });
    bus.on("amount-on-input", presentation.amountOnInput);
};