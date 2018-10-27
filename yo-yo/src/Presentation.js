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
    function itemOnKeyDown (event) {

        if (event.keyCode !== 27) {
            // let react to the onkeydown event only once
            this.onkeydown = "";

            this.setAttribute("data-previous-text", this.innerText);

            this.contentEditable = true;
            this.innerText = "";
        }
    }

    function itemOnKeyUp (event) {

        if (event.keyCode === 27) {
            var previousText = this.getAttribute("data-previous-text");
            if (previousText) {
                this.innerText = previousText;
                this.contentEditable = false;
                this.removeAttribute("data-previous-text");
                this.onkeydown = itemOnKeyDown;
            }
        }
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
        updateFirstColumn: function (data) {
            var name = "first-column";

            var newHtml = html
                `<div id="${name}">
                ${data.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="section-${index}" name="${name}">
                        <label for="section-${index}" 
                            class="section editable"
                            data-id="${index}"
                            onblur="${firstColumnOnBlur}"
                            onmousedown="${itemOnMouseDown}"
                            tabindex="0"
                            onkeydown="${itemOnKeyDown}"
                            onkeyup="${itemOnKeyUp}"
                            ondblclick="${itemOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(firstColumn, newHtml);
        },

        updateSecondColumn: function (firstColumnItemIndex, data) {

            var name = "second-column";

            var newHtml = html
                `<div id="${name}">
                ${data.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="second-column-${index}" name="${name}">
                        <label for="second-column-${index}" 
                            class="section editable"
                            data-id="${index}"
                            data-parent-index="${firstColumnItemIndex}"
                            onblur="${secondColumnOnBlur}"
                            onmousedown="${itemOnMouseDown}"
                            ondblclick="${itemOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(secondColumn, newHtml);
        }



    };
};