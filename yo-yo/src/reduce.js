


module.exports = function (bus, state) {
    bus.on("increment", function () {
        state.count ++;
        bus.emit("update");
    });
};