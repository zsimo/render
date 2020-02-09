"use strict";

var {Machine, assign} = require("xstate");

var fetchMachine = Machine({
    id: "money",
    initial: "idle",
    strict: true,
    context: {
        data: {}
    },
    states: {
        idle: {
            on: {
                FETCH: "pending"
            }
        },
        pending: {
            entry: ["fetchData"],
            on: {
                RESOLVE: {
                    target: "successful",
                    actions: ["setResults"]
                },
                REJECT: {
                    target: "failed",
                    actions: ["setMessage"]
                }
            }
        },
        failed: {
            on: {
                FETCH: "pending"
            }
        },
        successful: {
            on: {
                FETCH: "pending"
            },
            states: {
                widthData: {},
                widthoutData: {}
            }
        }
    }

}, {
    actions: {
        setResults: assign(function (context, event) {
            return {
                results: event.results
            };
        }),
        setMessage: assign(function (context, event) {
            return {
                message: event.message
            };
        })
    }
    // guards: {
    //     hasData: function (context, event) {
    //         return true;
    //     }
    // }
});

module.exports = fetchMachine;