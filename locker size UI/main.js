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
        st = "<div class='card border-info' style='margin:1%;'><div class='card-header'>";
        st = st.concat(this.propertyName);
        st = st.concat("</div><div class='card-body'>");
        // st = st.concat(this.p_status);
        st = st.concat("<p class='card-text'>");
        st = st.concat(this.propertyAddress);
        st = st.concat("<p hidden>");
        st = st.concat(this.propertyId.toString());
        st = st.concat("</p><button type='button' class='btn btn-info get_details'> View Details </button></div></div>");
        //console.log(st);
        document.getElementById('propertyDisplay').innerHTML += st;
    };
    return Property;
}());
;
window.onload = function () {
    function getID(e) {
        console.log(e.srcElement.previousElementSibling.innerHTML);
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
        console.log(error);
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
            })["catch"](function (error) {
                console.log(error);
            });
        }
        else {
            alert("Fields cannot be empty");
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
        if (searchField != '') {
            var regex = new RegExp(searchField, "i");
            document.getElementById('propertyDisplay').innerHTML = "";
            console.log(allProperties);
            allProperties.forEach(function (val, key) {
                if ((val.propertyName.search(regex) != -1) || (val.propertyAddress.search(regex) != -1)) {
                    var property = new Property(val.propertyId, val.propertyName, val.propertyAddress);
                    property.createList();
                }
            });
        }
    }
    document.getElementById('txt-search').addEventListener('keyup', searchkey);
    console.log("hiiiiii");
};
