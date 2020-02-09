"use strict";

var {interpret} = require("xstate");
var machine = require("money/src/StateService/machine");
var Domain = require("money/src/Domain");
var Presentation = require("money/src/Presentation");

var service = interpret(machine.withConfig({
    actions: {
        fetchData: (context, event) => {
            Domain.loadData(function (data) {
                service.send({
                    type: "RESOLVE",
                    movements: ["ciao", "due"]
                });
            });
        },
        render: function (context, event) {
            Presentation.render(context);
        }
    }
}))
    // .onTransition(state => console.log(state.context))
    .start();

module.exports = service;
