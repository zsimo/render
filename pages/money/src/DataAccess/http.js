"use strict";

/**
 * This object has the only function to communicate to the server (a socket server),
 * writing and reading data.
 *
 * @author Simone Sacchi
 * @version 2018/10/27
 */

var configs = require("configs.js");
var _ajaxTimeOut;
var _ajaxDelay = 100;
var token = document.querySelector('meta[name="csrf-token"]').content;

var baseUrl = window.Render.base_url;
if (baseUrl.slice(-1) !== "/") {
    baseUrl += "/";
}

function redirectIfNotAllowed (response) {
    if (response && response.status && response.status !== 200) {
        window.location = baseUrl + "login";
    }
    return response;
}
function onError (error) {
    throw new Error(error);
}

module.exports = {

    write: function (data, callback) {
        clearTimeout(_ajaxTimeOut);

        _ajaxTimeOut = setTimeout(function () {
            fetch(baseUrl + "api/write/" + configs.PAGE, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: JSON.stringify(data)
            })
            .then(redirectIfNotAllowed)
            .then(callback)
            .catch(onError);
        }, _ajaxDelay);


    },

    read: function (callback) {
        fetch(baseUrl + "api/read/" + configs.PAGE, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(redirectIfNotAllowed)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            return JSON.parse(data.replace(/^for \(;;\);/, ''));
        })
        .then(callback)
        .catch(onError);
    }
};