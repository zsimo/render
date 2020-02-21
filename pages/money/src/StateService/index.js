"use strict";

var {interpret} = require("xstate");
var machine = require("money/src/StateService/machine");
var Domain = require("money/src/Domain");
var Presentation = require("money/src/Presentation");
var routes = require("money/src/Router/routes");
var bus = require("money/src/bus");
const events = require("money/src/events");

var stateService = interpret(machine.withContext({
        // merge with original context
        ...machine.context,
        page: routes.HOME
    })
    .withConfig({
        actions: {
            fetchData: (context, event) => {
                Domain.loadData(function (data) {
                    stateService.send({
                        type: "RESOLVE",
                        movements: data
                    });
                });
            },
            renderHome: function (context, event) {
                Presentation.render(routes.HOME, context);
                bus.emit(events.NAVIGATE, routes.HOME);
            }
        }
    }))
    .onTransition(state => console.log(state.value))
    .start();

module.exports = stateService;
