"use strict";

var {html} = require("lit-html");
var bus = require("money/src/bus");
var routes = require("money/src/Router/routes");

module.exports = function (state) {

    return html`
        <h1>home</h1>
        <button @click=${edit}>edit</button>

    `;
};




function edit (event) {

    bus.emit("navigate", routes.EDIT);

}
