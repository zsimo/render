"use strict";

var configs = require("./configs.js");
console.log(configs)
var DataAccess = require("./DataAccess/" + configs.API_SERVER + ".js");

module.exports = {
    loadData: function () {
        DataAccess.read(function (data) {
            console.log(data);
            // state = addEmptyItem(data);

            // bus.emit("presentation.render-first-column", state);

            // var firstColumnItemIndex = getFirstColumnCheckedIndex(state);
            // bus.emit("presentation.render-second-column", firstColumnItemIndex, state[firstColumnItemIndex].children);

        });
    }
};