"use strict";

var {html} = require("lit-html");
var Domain = require("money/src/Domain");
var bus = require("money/src/bus");

const INPUT_OUTPUT_LABELS = {
    input: "+",
    output: "-"
};
var payload = {
    type: "input",
    amount: "0"
};

module.exports = function (state) {
        var sign = INPUT_OUTPUT_LABELS[state.type] || '';
        var amount = state.amount || '';

        return html`
        <div class="bar"></div>
        <h1>${sign} ${amount}</h1>
        <button name="save" @click=${buttonClick}>Save</button>
        <button style="background: green" name="input" @click=${buttonClick}>+</button>
        <br>
        <input placeholder="amount"
                name="amount"
                type="number"
                @input=${amountOnInput}
                value="${amount}"/>
        <br>
        <button style="background: red" name="output" @click=${buttonClick}>-</button>
        <br>
        Would you pick a date different from now?
        <input type="datetime-local" name="time" placeholder="time">

    `;
};


function amountOnInput (event) {
    bus.emit("amount-on-input", event);
}


function buttonClick (event) {
    switch (event.target.getAttribute("name")) {

        case "input":
            payload.type = "input";
            break;
        case "output":
            payload.type = "output";
            break;
        case "save":
            var now = new Date();
            payload.year = now.getFullYear().toString();
            payload.month = (now.getMonth() + 1).toString();
            payload.day = now.getDate().toString();
            payload.time = now.toLocaleTimeString();

            Domain.save(payload, function (response) {
                console.log(response);
            });
            break;

        default:
            break;
    }

    if (!payload.amount) {
        payload.type = "";
    }

}


