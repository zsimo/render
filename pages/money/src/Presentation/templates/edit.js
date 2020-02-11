"use strict";

var {html} = require("lit-html");
var Domain = require("money/src/Domain");

const INPUT_OUTPUT_LABELS = {
    input: "+",
    output: "-"
};
var payload = {
    type: "input",
    amount: ""
}

module.exports = function (context) {
    return html`
        <h1 id="amount-label"></h1><button name="save" @click=${buttonClick}>Save</button>
        <button style="background: green" name="input" @click=${buttonClick}>+</button>
        <br>
        <input placeholder="amount" name="amount" type="number" @input=${amountOnInput}/>
        <br>
        <button style="background: red" name="output" @click=${buttonClick}>-</button>
        <br>
        Would you pick a date different from now?
        <input type="datetime-local" name="time" placeholder="time">

    `;
};


function render () {
    document.querySelector("#amount-label").innerText = INPUT_OUTPUT_LABELS[payload.type] + payload.amount;
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
            payload.year = now.getFullYear();
            payload.month = now.getMonth() + 1;
            payload.day = now.getDate();
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