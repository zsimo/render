'use strict';

var Navigo = require("navigo");
var routes = require("money/src/Router/routes");
var mediator = require("money/src/mediator");
var state = require("money/src/Router/state");
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'

var router = new Navigo(root, useHash, hash);
// var stateService = require("money/src/StateService");
var Presentation = require("money/src/Presentation");


var routerOptions = {};
routerOptions[routes.HOME] = function () {
    Presentation.render(routes.HOME);
};
routerOptions[routes.EDIT] = function () {
    var page = routes.EDIT;
    var currentState = state[routes.EDIT];
    Presentation.render(page, currentState);
};
// 'patients/:patient_id/visit/:visit_id/record/:record_id/history/:field_id': function (params) {
//     pages.patients.showFieldHistory(params);
// },

router
    .on(routerOptions)
    .resolve();

router.notFound(function () {
    alert("not found");
    router.navigate(routes.HOME);
});


mediator(router, Presentation);

module.exports = {
    init: function () {
        router.resolve();

        if (!window.location.hash) {
            router.navigate(routes.HOME);
        }

        // setTimeout(function () {
        //     router.navigate(routes.EDIT);
        // }, 1000);
    },

};




