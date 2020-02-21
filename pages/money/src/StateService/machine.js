"use strict";

var {Machine, assign} = require("xstate");

var fetchMachine = Machine({
    id: "money",
    initial: "idle",
    strict: true,
    context: {
        movements: {},
        page: undefined
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
                    target: "ready",
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
        ready: {
            entry: ["renderHome"],
            // cond: 'isHome',
            on: {
                CHANGE_PAGE: {
                    actions: ["changePage"]
                },
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
        }),
        changePage: assign(function (context, event) {
            return {
                page: event.page
            };
        })
    },
    guards: {
        isHome: function (context, event) {
            return context.page === "HOME";
        }
    }
});

module.exports = fetchMachine;