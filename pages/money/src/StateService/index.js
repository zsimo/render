"use strict";

var {interpret} = require("xstate");
var machine = require("money/src/StateService/machine");
var Domain = require("money/src/Domain");

var stateService = interpret(machine.withConfig({
    actions: {
        fetchData: (context, event) => {
            Domain.loadData(function (data) {
                stateService.send({
                    type: "RESOLVE",
                    movements: data
                });
            });
        }
    }
}))
    .onTransition(state => console.log(state.context))
    .start();

module.exports = stateService;
