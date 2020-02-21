"use strict";

var bus = require("money/src/bus");
const events = require("money/src/events");

module.exports = function (router, presentation) {
    bus.on(events.NAVIGATE, function (page) {
        router.navigate(page);
    });
    bus.on(events.AMOUNT_ON_INPUT, presentation.amountOnInput);
    bus.on(events.TYPE_ON_CHANGE, presentation.typeOnChange);
    bus.on(events.SAVE, presentation.save);

};