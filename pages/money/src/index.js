"use strict";


var Router = require("money/src/Router/index");

var stateService = require("money/src/StateService");
stateService.send("FETCH");


Router.init();



// stateService.send("CHANGE_PAGE", Router.routes.EDIT);



