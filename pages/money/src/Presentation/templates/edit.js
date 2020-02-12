"use strict";

var {html} = require("lit-html");
var Domain = require("money/src/Domain");

const INPUT_OUTPUT_LABELS = {
    input: "+",
    output: "-"
};
var payload = {
    type: "input",
    amount: "0"
}

module.exports = function (item) {
    var sign = INPUT_OUTPUT_LABELS[item.type] || '';
    var amount = item.amount || '';
    console.log(item);
    return html`
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


function render () {
    // document.querySelector("#amount-label").innerText = INPUT_OUTPUT_LABELS[payload.type] + payload.amount;
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
            console.log(payload);
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

    render();
}

function amountOnInput (event) {
    payload.amount = this.value;
    render();
}