"use strict";



// FIRTS COLUMN
// SECOND COLUMN
// EDIT COLUMN

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

    function secondColumnOnBlur () {

        this.contentEditable = false;

        var index = this.getAttribute("data-id");
        var firstColumnItemIndex = this.getAttribute("data-parent-index");
        var newValue = this.innerText;

        bus.emit("second-column.update-state", firstColumnItemIndex, index, newValue);
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

        updateSecondColumn: function (firstColumnItemIndex, childred) {
            var newHtml = html
                `<div id="section-arguments">
                ${childred.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="second-column-${index}" name="section-arguments">
                        <label for="second-column-${index}" 
                            class="section editable"
                            data-id="${index}"
                            data-parent-index="${firstColumnItemIndex}"
                            onblur="${secondColumnOnBlur}"
                    
                            ondblclick="${sectionOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(childArguments, newHtml);
        }



    };
};