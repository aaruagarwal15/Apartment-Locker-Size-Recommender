"use strict";
exports.__esModule = true;
function snackbar(msg, time) {
    if (time === void 0) { time = 3000; }
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, time);
}
exports.snackbar = snackbar;
function greenSnackbar(msg, time) {
    if (time === void 0) { time = 3000; }
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "greenShow";
    setTimeout(function () { x.className = x.className.replace("greenShow", ""); }, time);
}
exports.greenSnackbar = greenSnackbar;
