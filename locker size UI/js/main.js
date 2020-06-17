"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Property = /** @class */ (function () {
    function Property(propertyId, propertyName, propertyAddress) {
        this.propertyId = propertyId;
        this.propertyName = propertyName;
        this.propertyAddress = propertyAddress;
    }
    Property.prototype.createList = function () {
        var st;
        var apartmentCard = document.createElement('div');
        apartmentCard.innerHTML = "\n    <div class='card-header'>" + this.propertyName + "</div>\n    <div class='card-body'>\n      <p class='card-text'>" + this.propertyAddress + "</p>\n      <p hidden>" + this.propertyId.toString() + "</p>\n      <button type='button' class='btn btn-info get_details'> View Details </button>\n    </div>\n    ";
        apartmentCard.classList.add('card');
        apartmentCard.classList.add('border-info');
        document.getElementById('propertyDisplay').appendChild(apartmentCard);
    };
    return Property;
}());
;
/* ====================== SNACKBARS ================== */
function snackbar(msg, time) {
    if (time === void 0) { time = 3000; }
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, time);
}
function greenSnackbar(msg, time) {
    if (time === void 0) { time = 3000; }
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "greenShow";
    setTimeout(function () { x.className = x.className.replace("greenShow", ""); }, time);
}
window.onload = function () {
    function getID(e) {
        //console.log(e.srcElement.previousElementSibling.innerHTML);
        var id = e.srcElement.previousElementSibling.innerHTML;
        localStorage.setItem("PropertyId", id.toString());
        //window.open("index2.html?id="+ propertyId.toString());
        window.open("index2.html");
    }
    var allProperties;
    /* ================== GET LIST OF PROPERTIES ======================================== */
    axios_1["default"].get('http://localhost:8080/getallProperty').then(function (response) {
        console.log(response.data);
        allProperties = response.data;
        for (var i = 0; i < response.data.length; i++) {
            var p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
            p.createList();
        }
    })["catch"](function (error) {
        snackbar("Oops!! Some error occured");
    }).then(function () {
        /* ============================================ VIEW DETAILS ========================================= */
        var all_buttons = document.querySelectorAll('.get_details');
        console.log("imhere");
        for (var i = 0; i < all_buttons.length; i++) {
            all_buttons[i].onclick = getID;
        }
    });
    /* ============================ ADD NEW PROPERTY ================================================ */
    document.getElementById('addNewProperty').onclick = function () {
        var params = new URLSearchParams();
        var propertyName = document.getElementById('newProperty').value;
        var propertyAddress = document.getElementById('newAddress').value;
        //var p_status:string = ( < HTMLSelectElement > document.getElementById('new_status')).value;
        if (propertyName != "" && propertyAddress != "") {
            params.append('PropertyName', propertyName);
            params.append('PropertyAddress', propertyAddress);
            //params.append('Property_status', p_status);
            axios_1["default"]({
                method: 'POST',
                url: 'http://localhost:8080/saveProperty',
                data: params
            }).then(function (response) {
                console.log(response);
                document.getElementById('propertyDisplay').innerHTML = "";
                for (var i = 0; i < response.data.length; i++) {
                    var p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
                    p.createList();
                }
                var all_buttons = document.querySelectorAll('.get_details');
                for (var i = 0; i < all_buttons.length; i++) {
                    all_buttons[i].onclick = getID;
                }
                document.getElementById('newProperty').value = "";
                document.getElementById('newAddress').value = "";
                greenSnackbar("Successfully Added");
            })["catch"](function (error) {
                console.log(error);
                document.getElementById('newProperty').value = "";
                document.getElementById('newAddress').value = "";
                snackbar("Oops!! Some error occured");
            });
        }
        else {
            snackbar("Fields cannot be empty", 4000);
        }
        //document.getElementById('newEntry')
    };
    /* ==================== INCREASING ORDERED LIST ===================================== */
    document.getElementById('increasingOrder').onclick = function () {
        //var f_val:string = ( < HTMLSelectElement > document.getElementById('status_filter')).value;
        var url = 'http://localhost:8080/increasingFilter';
        //url = url.concat(f_val);
        axios_1["default"].get(url).then(function (response) {
            console.log(response.data);
            document.getElementById('propertyDisplay').innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                var p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
                p.createList();
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
    /* ==================== DECREASING ORDERED LIST ===================================== */
    document.getElementById('decreasingOrder').onclick = function () {
        // var f_val:string = ( < HTMLSelectElement > document.getElementById('status_filter')).value;
        var url = 'http://localhost:8080/decreasingFilter';
        //url = url.concat(f_val);
        axios_1["default"].get(url).then(function (response) {
            console.log(response.data);
            document.getElementById('propertyDisplay').innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                var p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
                p.createList();
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
    /* ==================== SEARCH BOX ===================================== */
    function searchkey(e) {
        var searchField = document.getElementById('txt-search').value;
        var regex = new RegExp(searchField, "i");
        console.log(regex);
        document.getElementById('propertyDisplay').innerHTML = "";
        console.log(allProperties);
        allProperties.forEach(function (val, key) {
            if ((val.propertyName.search(regex) != -1) || (val.propertyAddress.search(regex) != -1)) {
                var property = new Property(val.propertyId, val.propertyName, val.propertyAddress);
                property.createList();
            }
        });
    }
    document.getElementById('txt-search').addEventListener('keyup', searchkey);
};
