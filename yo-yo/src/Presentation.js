"use strict";

var html = require("yo-yo");

var firstColumn = document.getElementById("first-column");
var secondColumn = document.getElementById("second-column");

module.exports = function (bus) {

    function isvalidKeyCode (keycode) {
        return (keycode > 47 && keycode < 58)   || // number keys
                keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
                (keycode > 64 && keycode < 91)   || // letter keys
                (keycode > 95 && keycode < 112)  || // numpad keys
                (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                (keycode > 218 && keycode < 223);
    }

    function itemOnDblClick () {
        this.contentEditable = true;
    }
    function itemOnMouseDown () {
        var itemIndex = this.getAttribute("data-id")
        bus.emit("domain.update-selected-item", itemIndex);
    }
    function itemOnKeyDown (event) {

        if (isvalidKeyCode(event.keyCode)) {
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
        this.onkeydown = itemOnKeyDown
        bus.emit("domain.update-first-column", index, newValue);
    }
    function secondColumnOnBlur () {
        this.contentEditable = false;
        var index = this.getAttribute("data-id");
        var firstColumnItemIndex = this.getAttribute("data-parent-index");
        var newValue = this.innerText;
        this.onkeydown = itemOnKeyDown
        bus.emit("domain.update-second-column", firstColumnItemIndex, index, newValue);
    }


    return {
        updateFirstColumn: function (data) {
            var name = "first-column";
  
            var newHtml = html
                `<div id="${name}">
                ${data.map(function (item, index) {
                    var checked = item.checked ? "checked" : "";
                    return html`
                    <div>
                        <input type="radio" id="section-${index}" name="${name}" ${checked}>
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

        updateSecondColumn: function (firstColumnItemIndex, children) {


            var name = "second-column";

            var newHtml = html
                `<div id="${name}">
                ${children.map(function (item, index) {
                    return html`
                    <div>
                        <input type="radio" id="second-column-${index}" name="${name}">
                        <label for="second-column-${index}" 
                            class="section editable"
                            data-id="${index}"
                            data-parent-index="${firstColumnItemIndex}"
                            onblur="${secondColumnOnBlur}"
                            tabindex="0"
                            onkeydown="${itemOnKeyDown}"
                            onkeyup="${itemOnKeyUp}"
                            ondblclick="${itemOnDblClick}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(secondColumn, newHtml);
        }



    };
};