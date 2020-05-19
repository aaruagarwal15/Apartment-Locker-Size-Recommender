"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Unit = /** @class */ (function () {
    function Unit(pId, uId, uName) {
        this.pId = pId;
        this.uId = uId;
        this.uName = uName;
    }
    Unit.prototype.createList = function () {
        var st;
        st = "<div class='card border-3' style='width: 18rem;margin:1%;'><div class='card-body'><h5 class='card-title'>";
        st = st.concat(this.uName);
        st = st.concat("</h5><h6 class='card-subtitle mb-2 text-muted'>");
        st = st.concat(this.uId.toString());
        st = st.concat("</h6><button type='button' class='btn btn-outline-secondary edit_unit_data' data-toggle=\"modal\" data-placement=\"bottom\" data-target=\"#editUnit\" title='Edit Details'>\n                        <i class='fa fa-edit'></i></button>&nbsp;&nbsp;\n                        <button type=\"button\" class=\"btn btn-outline-danger delete_unit_data\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Delete Unit\">\n                        <i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button></div></div>");
        //console.log(st);
        document.getElementById('new_units_data').innerHTML += st;
    };
    return Unit;
}());
;
window.onload = function () {
    var propertyId = localStorage.getItem("Property_id");
    console.log(propertyId);
    console.log("HIIII");
    /* ================================ FETCH PROPERTY DETAILS =============================== */
    var url = 'http://localhost:8080/fetch_details?P_id=';
    url = url.concat(propertyId);
    axios_1["default"].get(url).then(function (response) {
        console.log(response.data);
        document.getElementById('p_name').innerHTML = response.data.p_name;
        document.getElementById('p_address').innerHTML = response.data.p_address;
    })["catch"](function (error) {
        console.log(error);
    });
    /* ===================== EDIT UNIT DETAILS ================= */
    function setunitData(e) {
        console.log(e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML);
        console.log(e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML);
        var uid = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
        var uname = e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML;
        document.getElementById('edit_unit_id').value = uid;
        document.getElementById('edit_unit_name').value = uname;
        document.getElementById('add_edit_unit').onclick = function () {
            var params = new URLSearchParams();
            var u_id = document.getElementById('edit_unit_id').value;
            var u_name = document.getElementById('edit_unit_name').value;
            if (u_name != "" && u_id != "") {
                params.append('Property_Id', propertyId);
                params.append('Unit_Id_old', uid);
                params.append('Unit_Id', u_id);
                params.append('Unit_Name', u_name);
                console.log(u_id);
                axios_1["default"]({
                    method: 'POST',
                    url: 'http://localhost:8080/edit_unit',
                    data: params
                }).then(function (response) {
                    console.log(response);
                    if (response.data == "FAILED") {
                        alert("Enter Valid Entries");
                    }
                    else {
                        document.getElementById('new_units_data').innerHTML = "";
                        for (var i = 0; i < response.data.length; i++) {
                            var p = new Unit(response.data[i].p_id, response.data[i].u_id, response.data[i].u_name);
                            p.createList();
                        }
                    }
                })["catch"](function (error) {
                    console.log(error);
                });
            }
            else {
                alert("Fields cannot be empty");
            }
        };
    }
    /* ===================== DELETE UNIT DETAILS ================= */
    function deleteUnitData(e) {
        console.log("DELETE: " + e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML);
        var u_id = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
        var url2 = 'http://localhost:8080/delete_unit?U_Id=';
        url2 = url2.concat(u_id);
        axios_1["default"]["delete"](url2).then(function (response) {
            console.log("DELETE REQUEST SENT");
            console.log(response.data);
            document.getElementById('new_units_data').innerHTML = "";
            var url = 'http://localhost:8080/getallunits?PId=';
            url = url.concat(propertyId);
            axios_1["default"].get(url).then(function (response) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    var p = new Unit(response.data[i].p_id, response.data[i].u_id, response.data[i].u_name);
                    p.createList();
                }
            })["catch"](function (error) {
                console.log(error);
            });
        })["catch"](function (error) {
            console.log(error);
        });
    }
    /* ======================== RETRIEVE ALL UNITS DATA ================================== */
    var url = 'http://localhost:8080/getallunits?PId=';
    url = url.concat(propertyId);
    axios_1["default"].get(url).then(function (response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            var p = new Unit(response.data[i].p_id, response.data[i].u_id, response.data[i].u_name);
            p.createList();
        }
    })["catch"](function (error) {
        console.log(error);
    }).then(function () {
        /* ==== EDIT UNIT DETAILS ======== */
        var all_edit_buttons = document.querySelectorAll('.edit_unit_data');
        console.log("imhere");
        for (var i = 0; i < all_edit_buttons.length; i++) {
            all_edit_buttons[i].onclick = setunitData;
        }
        /* ==== DELETE UNIT DETAILS ======== */
        var all_delete_buttons = document.querySelectorAll('.delete_unit_data');
        for (var j = 0; j < all_delete_buttons.length; j++) {
            all_delete_buttons[j].onclick = deleteUnitData;
        }
    });
    /* ==================================== ADD NEW UNIT ========================================== */
    document.getElementById('add_new_unit').onclick = function () {
        var params = new URLSearchParams();
        var u_id = document.getElementById('new_unit_id').value;
        var u_name = document.getElementById('new_unit_name').value;
        if (u_name != "" && u_id != "") {
            params.append('Property_Id', propertyId);
            params.append('Unit_Id', u_id);
            params.append('Unit_Name', u_name);
            console.log(u_id);
            axios_1["default"]({
                method: 'POST',
                url: 'http://localhost:8080/save_unit',
                data: params
            }).then(function (response) {
                console.log(response);
                if (response.data == "FAILED") {
                    alert("Enter Valid Entries");
                }
                else {
                    document.getElementById('new_units_data').innerHTML = "";
                    for (var i = 0; i < response.data.length; i++) {
                        var p = new Unit(response.data[i].p_id, response.data[i].u_id, response.data[i].u_name);
                        p.createList();
                    }
                }
            })["catch"](function (error) {
                console.log(error);
            });
        }
        else {
            alert("Fields cannot be empty");
        }
    };
};
