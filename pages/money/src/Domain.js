"use strict";

var configs = require("./configs.js");
var DataAccess = require("./DataAccess/" + configs.API_SERVER + ".js");

module.exports = {
    loadData: function (callback) {
        DataAccess.read(function (data) {

            callback(data);
            // state = addEmptyItem(data);

            // bus.emit("presentation.render-first-column", state);

            // var firstColumnItemIndex = getFirstColumnCheckedIndex(state);
            // bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);

        });
    },



    save: function (payload, callback) {

        DataAccess.write(payload, function (response) {

            callback(response);


        });
    }
};