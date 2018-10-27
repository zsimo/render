"use strict";



// FIRTS COLUMN
// SECOND COLUMN
// EDIT COLUMN

var html = require("yo-yo");
var sidebar = document.getElementById("first-column");
var childArguments = document.getElementById("second-column");



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
        updateFirstColumn: function (state) {
            var newHtml = html
                `<div id="first-column">
                ${state.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="section-${index}" name="first-column">
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

        updateSecondColumn: function (firstColumnItemIndex, data) {
            var newHtml = html
                `<div id="second-column">
                ${data.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="second-column-${index}" name="second-column">
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