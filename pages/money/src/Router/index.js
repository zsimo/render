'use strict';

var Navigo = require("navigo");
var routes = require("money/src/Router/routes");
var mediator = require("money/src/mediator");
var state = require("money/src/Router/state");
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'

var router = new Navigo(root, useHash, hash);
var Presentation = require("money/src/Presentation");
var stateService = require("money/src/StateService");


var routerOptions = {};
routerOptions[routes.HOME] = function () {
    // var page = routes.HOME;
    // var currentState = stateService.machine.context;
    // Presentation.render(page, currentState);
    //
    // stateService.send({
    //     type: "CHANGE_PAGE",
    //     page: page
    // });

    stateService.send("FETCH");
};
routerOptions[routes.EDIT] = function () {
    var page = routes.EDIT;
    var currentState = state[routes.EDIT];
    Presentation.render(page, currentState);

    stateService.send({
        type: "CHANGE_PAGE",
        page: page
    });

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


    },

};




