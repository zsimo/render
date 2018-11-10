

var data = require("./data.json");
var root = document.querySelector("#root");


function renderMainList(data) {
    var root = document.querySelector("main-list");

    var container = document.createElement("div");
    container.id = "section-sidebar";

    data.forEach(function (datum, index) {
        if (datum.name) {
            var item = document.createElement("div");
            item.className = "action editable";
            item.innerText = datum.name;
            item.setAttribute("data-index", index);
            item.addEventListener("click", function () {
                this.contentEditable = true;
                console.log(this);
            });
            item.addEventListener("blur", function () {
                // this.contentEditable = true;
                console.log(this.innerText);
            });
            container.appendChild(item);
        }
    });

    root.appendChild(container);
}



renderMainList(data);
// renderSubList(data);

console.log(data);