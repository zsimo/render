"use strict";

var Presentation = {};

var {render} = require("lit-html");
var configs = require("money/src/configs");
var templates = require("money/src/Presentation/templates");
var selectors = require("money/src/Presentation/selectors");
var routes = require("money/src/Router/routes");
var state = require("money/src/Router/state");
var bus = require("money/src/bus");

document.addEventListener("DOMContentLoaded", function() {
    try {
        document.getElementById("app-version").innerText = configs.VERSION;
    } catch (e) {}
});


Presentation = {
    render: function (page, state) {

        var template = templates[page];


        if (template) {
            render(template(state), document.querySelector(selectors.MAIN_CONTENT));
        }

    },
    amountOnInput: function (event) {
        var page = routes.EDIT;
        var currenStatus = state[routes.EDIT];
        currenStatus.amount = event.target.value;
        Presentation.render(page, currenStatus);
    }
};


bus.on("amount-on-input", Presentation.amountOnInput);

module.exports = Presentation;

