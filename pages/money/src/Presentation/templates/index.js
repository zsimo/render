"use strict";

var routes = require("money/src/Router/routes");

var templates = {};
templates[routes.EDIT] = require("money/src/Presentation/templates/edit");

module.exports = Object.freeze(templates);