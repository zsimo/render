"use strict";

var html = require("yo-yo");
var configs = require("./configs.js");

var firstColumn = document.getElementById("first-column");
var secondColumn = document.getElementById("second-column");
var thirdColumn = document.getElementById("third-column");
var logArea = document.getElementById("log-area");

document.addEventListener("DOMContentLoaded", function() {
    try {
        document.getElementById("app-version").innerText = configs.VERSION;
    } catch (e) {}
});

module.exports = function (bus) {

    function isvalidKeyCode (keycode) {
        return (keycode > 47 && keycode < 58)   || // number keys
                keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
                (keycode > 64 && keycode < 91)   || // letter keys
                (keycode > 95 && keycode < 112)  || // numpad keys
                (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                (keycode > 218 && keycode < 223);
    }

    function itemOnDblClick (e) {
        e.preventDefault();
        this.contentEditable = true;
        this.focus();
    }
    function itemOnKeyDown (event) {

        if (isvalidKeyCode(event.keyCode)) {
            // let react to the onkeydown event only once, by removing the callback function
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

    /**
     * mark the item as selected (different background)
     */
    function firstColumnOnMouseUp () {
        var itemIndex = this.getAttribute("data-index")
        bus.emit("domain.update-first-column-selected-item", itemIndex);
        bus.emit("domain.update-second-column-selected-item", itemIndex, 0);
    }
    /**
     * mark the item as selected (different background)
     */
    function secondColumnOnMouseUp () {
        var secondColumnItemIndex = this.getAttribute("data-index");
        var firstColumnItemIndex = this.getAttribute("data-first-column-index");
        bus.emit("domain.update-second-column-selected-item", firstColumnItemIndex, secondColumnItemIndex);
    }

    function firstColumnOnBlur () {
        this.contentEditable = false;
        var index = this.getAttribute("data-index");
        var newValue = this.innerText;

        bus.emit("domain.update-first-column", index, newValue);

        this.onkeydown = itemOnKeyDown;
    }
    function secondColumnOnBlur () {
        this.contentEditable = false;

        var index = this.getAttribute("data-index");
        var firstColumnItemIndex = this.getAttribute("data-first-column-index");
        var newValue = this.innerText;

        bus.emit("domain.update-second-column", firstColumnItemIndex, index, newValue);

        this.onkeydown = itemOnKeyDown
    }

    function thirdColumnOnBlur () {
        var firstColumnItemIndex = this.getAttribute("data-first-column-index");
        var secondColumnItemIndex = this.getAttribute("data-second-column-index");
        var content = this.value;

        bus.emit("domain.update-third-column", firstColumnItemIndex, secondColumnItemIndex, content);
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
                            data-index="${index}"
                            onblur="${firstColumnOnBlur}"
                            onmouseup="${firstColumnOnMouseUp}"
                            onclick="${itemOnDblClick}"
                            tabindex="0"
                            onkeydown="${itemOnKeyDown}"
                            onkeyup="${itemOnKeyUp}">${item.name}</label>
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
                            data-index="${index}"
                            data-first-column-index="${firstColumnItemIndex}"
                            onblur="${secondColumnOnBlur}"
                            onmouseup="${secondColumnOnMouseUp}"
                            onclick="${itemOnDblClick}"
                            tabindex="0"
                            onkeydown="${itemOnKeyDown}"
                            onkeyup="${itemOnKeyUp}">${item.name}</label>
                    </div>`
                })}
            </div>`;

            html.update(secondColumn, newHtml);
        },


        updateThirdColumn: function (firstColumnItemIndex, secondColumnItemIndex, content) {
            var name = "third-column";
            var height =  window.innerHeight - 90; // - header
            var newHtml = html
                `<div id="${name}">
                    <textarea style="height: ${height}px;"
                    data-first-column-index="${firstColumnItemIndex}"
                    data-second-column-index="${secondColumnItemIndex}"
                    onblur="${thirdColumnOnBlur}">${content}</textarea>
                </div>`;

            html.update(thirdColumn, newHtml);
        },


        log: function (message) {
            logArea.innerText = message;
        }



    };
};