"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Property = /** @class */ (function () {
    function Property(p_id, p_name, p_address) {
        this.p_id = p_id;
        this.p_name = p_name;
        this.p_address = p_address;
    }
    Property.prototype.createList = function () {
        var st;
        st = "<div class='card border-info' style='margin:1%;'><div class='card-header'>";
        st = st.concat(this.p_name);
        st = st.concat("</div><div class='card-body'>");
        // st = st.concat(this.p_status);
        st = st.concat("<p class='card-text'>");
        st = st.concat(this.p_address);
        st = st.concat("<p hidden>");
        st = st.concat(this.p_id.toString());
        st = st.concat("</p><button type='button' class='btn btn-info get_details'> View Details </button></div></div>");
        //console.log(st);
        document.getElementById('body_middle').innerHTML += st;
    };
    return Property;
}());
;
window.onload = function () {
    function getID(e) {
        console.log(e.srcElement.previousElementSibling.innerHTML);
        var id = e.srcElement.previousElementSibling.innerHTML;
        localStorage.setItem("Property_id", id.toString());
        //window.open("index2.html?id="+ p_id.toString());
        window.open("index2.html");
    }
    var allProperties;
    /* ================== GET LIST OF PROPERTIES ======================================== */
    axios_1["default"].get('http://localhost:8080/getall').then(function (response) {
        console.log(response.data);
        allProperties = response.data;
        for (var i = 0; i < response.data.length; i++) {
            var p = new Property(response.data[i].p_id, response.data[i].p_name, response.data[i].p_address);
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
    document.getElementById('add_new').onclick = function () {
        var params = new URLSearchParams();
        var p_name = document.getElementById('new_property').value;
        var p_address = document.getElementById('new_address').value;
        //var p_status:string = ( < HTMLSelectElement > document.getElementById('new_status')).value;
        if (p_name != "" && p_address != "") {
            params.append('Property_name', p_name);
            params.append('Property_address', p_address);
            //params.append('Property_status', p_status);
            axios_1["default"]({
                method: 'POST',
                url: 'http://localhost:8080/save',
                data: params
            }).then(function (response) {
                console.log(response);
                document.getElementById('body_middle').innerHTML = "";
                for (var i = 0; i < response.data.length; i++) {
                    var p = new Property(response.data[i].p_id, response.data[i].p_name, response.data[i].p_address);
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
    document.getElementById('increasing_order').onclick = function () {
        //var f_val:string = ( < HTMLSelectElement > document.getElementById('status_filter')).value;
        var url = 'http://localhost:8080/increasing_filter';
        //url = url.concat(f_val);
        axios_1["default"].get(url).then(function (response) {
            console.log(response.data);
            document.getElementById('body_middle').innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                var p = new Property(response.data[i].p_id, response.data[i].p_name, response.data[i].p_address);
                p.createList();
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
    /* ==================== DECREASING ORDERED LIST ===================================== */
    document.getElementById('decreasing_order').onclick = function () {
        // var f_val:string = ( < HTMLSelectElement > document.getElementById('status_filter')).value;
        var url = 'http://localhost:8080/decreasing_filter';
        //url = url.concat(f_val);
        axios_1["default"].get(url).then(function (response) {
            console.log(response.data);
            document.getElementById('body_middle').innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                var p = new Property(response.data[i].p_id, response.data[i].p_name, response.data[i].p_address);
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
            document.getElementById('body_middle').innerHTML = "";
            console.log(allProperties);
            allProperties.forEach(function (val, key) {
                if ((val.p_name.search(regex) != -1) || (val.p_address.search(regex) != -1)) {
                    var property = new Property(val.p_id, val.p_name, val.p_address);
                    property.createList();
                }
            });
        }
    }
    document.getElementById('txt-search').addEventListener('keyup', searchkey);
    console.log("hiiiiii");
};
