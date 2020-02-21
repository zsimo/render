"use strict";

var {html} = require("lit-html");
var bus = require("money/src/bus");
const events = require("money/src/events");

const INPUT_OUTPUT_LABELS = {
    input: "+",
    output: "-"
};
var payload = {
    type: "input"
};

module.exports = function (state) {
        var sign = INPUT_OUTPUT_LABELS[state.type] || '';
        payload.amount = state.amount || '';
        payload.type = state.type;

        return html`
        <div class="bar"></div>
        <h1>${sign} ${payload.amount || "0"}</h1>
        <button name="save" @click=${buttonClick}>Save</button>
        <button style="background: green" name="input" @click=${buttonClick}>+</button>
        <br>
        <input placeholder="amount"
                name="amount"
                type="number"
                @input=${amountOnInput}
                value="${payload.amount}"/>
        <br>
        <button style="background: red" name="output" @click=${buttonClick}>-</button>
        <br>
        Would you pick a different date from now?
        <input type="datetime-local" name="time" placeholder="time">

    `;
};


function amountOnInput (event) {
    bus.emit(events.AMOUNT_ON_INPUT, event);
}


function buttonClick (event) {
    var action = event.target.getAttribute("name");
    switch (action) {

        case "input":
            bus.emit(events.TYPE_ON_CHANGE, action);
            break;
        case "output":
            bus.emit(events.TYPE_ON_CHANGE, action);
            break;
        case "save":
            var now = new Date();
            payload.year = now.getFullYear().toString();
            payload.month = (now.getMonth() + 1).toString();
            payload.day = now.getDate().toString();
            payload.time = now.toLocaleTimeString();

            bus.emit(events.SAVE, payload);
            // bus.emit(events.NAVIGATE, events.HOME);
            break;

        default:
            break;
    }

}


