"use strict";


var html = require("yo-yo");
var sidebar = document.getElementById("section-sidebar");
var childArguments = document.getElementById("section-arguments");



module.exports = function (bus) {

    function sectionOnDblClick () {
        this.contentEditable = true;
    }
    function sectionOnMouseDown () {
        var itemIndex = this.getAttribute("data-id")
        bus.emit("update-selected-item", itemIndex);
    }
    function sectionOnBlur () {

        this.contentEditable = false;

        var index = this.getAttribute("data-id");
        var newValue = this.innerText;

        bus.emit("update-state", index, newValue);
    }


    return {
        updateSidebar: function (state) {
            var newHtml = html
                `<div id="section-sidebar">
                ${state.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="section-${index}" name="section-sidebar">
                        <label for="section-${index}" 
                            class="section editable"
                            data-id="${index}"
                            onblur="${sectionOnBlur}"
                            onmousedown="${sectionOnMouseDown}"
                            ondblclick="${sectionOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(sidebar, newHtml);
        },

        updateArguments: function (childred) {
            var newHtml = html
                `<div id="section-arguments">
                ${childred.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="section-${index}" name="section-arguments">
                        <label for="section-${index}" 
                            class="section editable"
                            data-id="${index}"
                            onblur="${sectionOnBlur}"
                            onmousedown="${sectionOnMouseDown}"
                            ondblclick="${sectionOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(childArguments, newHtml);
        }



    };
};