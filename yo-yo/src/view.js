"use strict";


var html = require("yo-yo");
var sidebar = document.getElementById("section-sidebar");



module.exports = function (bus) {

    function sectionOnDblClick () {
        this.contentEditable = true;
    }
    function sectionOnBlur () {

        this.contentEditable = false;

        var index = this.getAttribute("data-id");
        var newValue = this.innerText;

        bus.emit("update-state", index, newValue);
    }


    return {
        updateSidebar: function (state) {
            var newSidebar = html
                `<div id="section-sidebar">
                ${state.map(function (item, index) {
                    return html`
                    <div class="section editable"
                        data-id="${index}"
                        onblur="${sectionOnBlur}"
                        ondblclick="${sectionOnDblClick}">${item.name}</div>`
                })}
            </div>`;

            html.update(sidebar, newSidebar);
        }
    };
};