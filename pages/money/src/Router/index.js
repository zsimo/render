'use strict';

var Navigo = require("navigo");
var routes = require("money/src/Router/routes");
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'

var router = new Navigo(root, useHash, hash);
// var pages = require("./pages");

// router.hooks({
//     before: function(done, params) {
//
//     },
//
//     after: function (params) {
//         // pages.nav();
//     }
// });

var routerOptions = {};
routerOptions[routes.HOME] = function () {
    console.log("home");
};
routerOptions[routes.EDIT] = function () {
    console.log("edit");
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

module.exports = {
    init: function () {
        router.resolve();

        if (!window.location.hash) {
            router.navigate(routes.HOME);
        }
    },
    navigate: router.navigate
};




