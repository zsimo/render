"use strict";

/**
 * This object has the only function to communicate to the server (a socket server),
 * writing and reading data.
 *
 * @author Simone Sacchi
 * @version 2018/10/27
 */

var _ajaxTimeOut;
var _ajaxDelay = 100;
var token = document.querySelector('meta[name="csrf-token"]').content;


module.exports = {

    write: function (data, callback) {
        clearTimeout(_ajaxTimeOut);

        _ajaxTimeOut = setTimeout(function () {
            fetch('http://localhost:8000/api/write', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                },

                body: JSON.stringify(data)
            })
                .then(callback)
                .catch(function (error) {
                    throw new Error(error);
                });
        }, _ajaxDelay);


    },

    read: function (callback) {
        fetch('http://localhost:8000/api/read', {
            method: 'get'
        })
            .then(function (response) {
                return response.json();
            })
            .then(callback)
            .catch(function (error) {
                throw new Error(error);
            });
    }
};