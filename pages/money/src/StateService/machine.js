"use strict";

var {Machine, assign} = require("xstate");

var fetchMachine = Machine({
    id: "money",
    initial: "idle",
    strict: true,
    context: {
        movements: {}
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
            // entry: ["render"],
            on: {
                FETCH: "pending"
            }
        }
    }

}, {
    actions: {
        setResults: assign(function (context, event) {
            return {
                movements: event.movements
            };
        }),
        setMessage: assign(function (context, event) {
            return {
                message: event.message
            };
        })
        // changePage: assign(function (context, event) {
        //     return {
        //         page: event.page
        //     };
        // })
    }
    // guards: {
    //     hasData: function (context, event) {
    //         return true;
    //     }
    // }
});

module.exports = fetchMachine;