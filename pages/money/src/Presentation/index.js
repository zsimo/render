"use strict";

var {render} = require("lit-html");
var configs = require("money/src/configs");
var templates = require("money/src/Presentation/templates");
var selectors = require("money/src/Presentation/selectors");

document.addEventListener("DOMContentLoaded", function() {
    try {
        document.getElementById("app-version").innerText = configs.VERSION;
    } catch (e) {}
});



module.exports = {
    render: function (context) {

        var template = templates[context.page];

        if (template) {
            render(template(context), document.querySelector(selectors.MAIN_CONTENT));
        }

    }
};

