export function snackbar(msg, time = 3000) {

    let x: HTMLElement = document.getElementById("snackbar");
    x.innerHTML = msg
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, time);
}

export function greenSnackbar(msg, time = 3000) {

    let x: HTMLElement = document.getElementById("snackbar");
    x.innerHTML = msg
    x.className = "greenShow";
    setTimeout(function () { x.className = x.className.replace("greenShow", ""); }, time);
}

