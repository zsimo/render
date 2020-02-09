'use strict';

var Navigo = require("navigo");

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


router
    .on({

        '/new': function () {
            console.log("new");
        },

        // 'patients/:patient_id/visit/:visit_id/record/:record_id/history/:field_id': function (params) {
        //     pages.patients.showFieldHistory(params);
        // },

        "/": function () {
            console.log("home");
        }
    }).resolve();


module.exports = {
    init: function () {
        router.resolve();

        if (!window.location.hash) {
            router.navigate("/");
        }
    },
    navigate: router.navigate
};




