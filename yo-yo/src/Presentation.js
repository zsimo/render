"use strict";

var html = require("yo-yo");

var firstColumn = document.getElementById("first-column");
var secondColumn = document.getElementById("second-column");

module.exports = function (bus) {

    function itemOnDblClick () {
        this.contentEditable = true;
    }
    function itemOnMouseDown () {
        var itemIndex = this.getAttribute("data-id")
        bus.emit("domain.update-selected-item", itemIndex);
    }

    function firstColumnOnBlur () {
        this.contentEditable = false;
        var index = this.getAttribute("data-id");
        var newValue = this.innerText;
        bus.emit("domain.update-first-column", index, newValue);
    }
    function secondColumnOnBlur () {
        this.contentEditable = false;
        var index = this.getAttribute("data-id");
        var firstColumnItemIndex = this.getAttribute("data-parent-index");
        var newValue = this.innerText;
        bus.emit("domain.update-second-column", firstColumnItemIndex, index, newValue);
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
                            onblur="${firstColumnOnBlur}"
                            onmousedown="${itemOnMouseDown}"
                            ondblclick="${itemOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(firstColumn, newHtml);
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
                            ondblclick="${itemOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(secondColumn, newHtml);
        }



    };
};