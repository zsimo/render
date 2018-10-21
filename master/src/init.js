

var data = require("./data.json");
var root = document.querySelector("#root");


function renderMainList(data) {
    var root = document.querySelector("main-list");

    var container = document.createElement("div");
    container.id = "section-sidebar";

    data.forEach(function (datum) {
        if (datum.name) {
            var item = document.createElement("div");
            item.className = "ection editable";
            item.innerText = datum.name;
            item.addEventListener("click", function () {
                this.contentEditable = true;
                console.log(this);
            });
            container.appendChild(item);
        }
    });

    root.appendChild(container);
}



renderMainList(data);

console.log(data);