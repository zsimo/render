"use strict";

var {html} = require("lit-html");
var bus = require("money/src/bus");
var routes = require("money/src/Router/routes");
const events = require("money/src/events");

module.exports = function (state) {
    console.log(state);

    return html`
        <small>${thisMounth()}</small>
        <h1>total ${currentMonthTotal(state)}</h1>
        <button @click=${edit}>edit</button>

    `;
};


function thisMounth () {
    var now = new Date();
    var year = now.getFullYear().toString();
    var month = now.toLocaleString('default', { month: 'long' })
    var day = now.getDate().toString();

    return month + " " + year;

}


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

    bus.emit(events.NAVIGATE, routes.EDIT);

}
