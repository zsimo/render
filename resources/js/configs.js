"use strict";


var apiServer;
var page;
try {
    apiServer = window.Render.api_server;
    page = window.Render.page;
} catch (e) {

}



module.exports = {
    "SERVER" : {
        "SOCKET" : {
            "PORT" : 3030,
            "HOST" : "localhost"
        }
    },

    "API_SERVER" : apiServer,
    "PAGE": page
};