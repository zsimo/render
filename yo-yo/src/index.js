// yo-yo/bel/morphdom
// dom diffing with real dom node

var configs = require("../../configs.json");

var socket = io(`${configs.SERVER.HOST}:${configs.SERVER.PORT}`);

socket.on("saved", function () {
    console.log("saved!");
});

var html = require("yo-yo");
var EventEmitter = require("events");
var bus = new EventEmitter();

var sidebar = document.getElementById("section-sidebar");

var state = require("../../server/data.json");
state.push({name: ""});
require("./reduce.js")(bus, state);


// todo save via websocket

bus.on("update-sidebar", function () {
    updateSidebar();
});


updateSidebar();

function sectionOnClick () {
    this.contentEditable = true;
}
function sectionOnBlur () {

    var index = this.getAttribute("data-id");
    var newValue = this.innerText;
    state[index].name = newValue;
    this.contentEditable = false;
    bus.emit("update-sidebar");
    console.log("save");
    socket.emit("save", state);
}

function updateSidebar () {

    var newSidebar = html
        `<div id="section-sidebar">
            ${state.map(function (item, index) {
                return html`
                <div class="section editable"
                    data-id="${index}"
                    onblur="${sectionOnBlur}"
                    onclick="${sectionOnClick}">${item.name}</div>`
            })}
        </div>`;

    html.update(sidebar, newSidebar);

}




