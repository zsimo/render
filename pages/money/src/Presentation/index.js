"use strict";

var {html, render} = require("lit-html");
var configs = require("money/src/configs");

document.addEventListener("DOMContentLoaded", function() {
    try {
        document.getElementById("app-version").innerText = configs.VERSION;
    } catch (e) {}
});



module.exports = {
    render: function (context) {
        console.log(context)

        // var html = templates.get(state.USERS);
        // render(html, document.querySelector(config.MAIN_CONTENT_SELECTOR));
    }
};