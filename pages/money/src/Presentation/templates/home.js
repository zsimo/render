"use strict";

var {html} = require("lit-html");
var bus = require("money/src/bus");
var routes = require("money/src/Router/routes");

module.exports = function (state) {


    return html`
        <h1>home ${currentMonthTotal(state)}</h1>
        <button @click=${edit}>edit</button>

    `;
};


function currentMonthTotal (state) {
    var movements = state.movements;
    var now = new Date();
    var year = now.getFullYear().toString();
    var month = (now.getMonth() + 1).toString();

    var total = 0;
    if (movements.hasOwnProperty(year)) {
        if (movements[year].hasOwnProperty(month)) {
            var currentMonthMovements = movements[year][month];
            Object.keys(currentMonthMovements).forEach(function (day) {
                currentMonthMovements[day].forEach(function (movement) {
                    if (movement.type === "input") {
                        total += movement.amount;
                    } else {
                        total -= movement.amount;
                    }
                });
            });
        }
    }

    return total;
}


function edit (event) {

    bus.emit("navigate", routes.EDIT);

}
