"use strict";


var apiServer;
try {
    apiServer = window.Render.api_server;
} catch (e) {

}



module.exports = {
    "SERVER" : {
        "SOCKET" : {
            "PORT" : 3030,
            "HOST" : "localhost"
        }
    },

    "API_SERVER" : apiServer
};