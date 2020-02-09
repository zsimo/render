"use strict";

var {html} = require("lit-html");



module.exports = function (context) {
    return html`
        <h1>Hello ${context.page}</h1>
        <button>+</button>
        <br>
        <input placeholder="amount" type="number"/>
        <br>
        <button>-</button>
    `;
};