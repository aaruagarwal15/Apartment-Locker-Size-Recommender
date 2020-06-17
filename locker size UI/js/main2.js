"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var axios_1 = require("axios");
/**=========================== UNIT CLASS ================================ */
var Unit = /** @class */ (function () {
    function Unit(propertyId, unitNumber, buildingNumber) {
        this.propertyId = propertyId;
        this.unitNumber = unitNumber;
        this.buildingNumber = buildingNumber;
    }
    Unit.prototype.createList = function () {
        var key = 'a' + Math.random().toString(36).slice(2);
        var card = document.createElement('div');
        var card_html = "<div class='card-body'><h5 class='card-title'>" + "Unit Number: " + this.unitNumber + "</h5><h6 class='card-subtitle mb-2 text-muted'>" + "Building Number: " + this.buildingNumber + "</h6>" +
            "<button type='button' class='btn btn-outline-danger delete_unit_data' data-toggle='tooltip' data-placement='bottom' title='Delete Unit'><i class='fa fa-trash' aria-hidden='true'></i></button></div>";
        card.innerHTML = card_html;
        card.classList.add(key);
        card.classList.add("card");
        card.classList.add("border-3");
        card.setAttribute('style', 'min-width: 18rem;margin:1%;');
        document.getElementById('new_units_data').appendChild(card);
        return key;
    };
    return Unit;
}());
;
/**=========================== CARRIER CLASS ================================ */
var Carrier = /** @class */ (function () {
    function Carrier(cId, cName, delivery_details) {
        this.cId = cId;
        this.cName = cName;
        this.delivery_details = __spreadArrays(delivery_details);
        this.delivery_details_length = this.delivery_details.length;
    }
    Carrier.prototype.createCard = function () {
        var mycard = document.createElement('div');
        var key = 'carrier_' + Math.random().toString(36).slice(2);
        var cardStructure = '<h4 class="card-header">\
                                        <input class="new_carrier_id" value="' + this.cId + '" hidden>\
                                        <span class="new_carrier_name">' + this.cName + '</span>&emsp;\
                                        <div style="float:right;">\
                                            <button type="button" class="btn carrier_edit_btn btn-outline-secondary"data-toggle="modal" data-target="#newCarrier"\
                                                data-placement="bottom" title="Edit Details"><i\
                                                    class="fa fa-edit"></i></button>&nbsp;&nbsp;\
                                            <button type="button" class="btn carrier_delete_btn btn-outline-danger" data-toggle="tooltip"\
                                                data-placement="bottom" title="Delete Carrier"><i class="fa fa-trash"\
                                                    aria-hidden="true"></i></button>\
                                        </div>\
                                    </h4>\
                                    <div class="card-body">\
                                        <h6 class="card-title">Delivery Details:</h6>\
                                        <p class="card-text">\
                                            <div class="carrier_details" style="display:flex;justify-content: space-evenly;">';
        cardStructure += '<div>';
        for (var i = 0; i < this.delivery_details_length; i++) {
            cardStructure += '<p>' + this.delivery_details[i].deliveryDay + '</p>';
        }
        cardStructure += '</div><div>';
        for (var i = 0; i < this.delivery_details_length; i++) {
            cardStructure += '<p>' + this.delivery_details[i].deliveryTime + '</p>';
        }
        cardStructure += '</div>';
        cardStructure += '</div></p></div>';
        mycard.classList.add('card');
        mycard.classList.add(key);
        mycard.setAttribute('style', 'margin:1%;width: 380px;');
        mycard.innerHTML = cardStructure;
        document.getElementById('new_carrier_data').insertBefore(mycard, document.getElementById('new_carrier_data').firstChild);
        return key;
    };
    return Carrier;
}());
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
/* ======================================================================= */
/* ====================== ONLOAD FUNCTION =========================== */
/* ======================================================================== */
window.onload = function () {
    var propertyId = localStorage.getItem("PropertyId");
    /* ================================ FETCH PROPERTY DETAILS =============================== */
    var url = 'http://localhost:8080/fetchPropertyDetails?propertyId=';
    url = url.concat(propertyId);
    axios_1["default"].get(url).then(function (response) {
        //console.log(response.data);
        document.getElementById('propertyName').innerHTML = response.data.propertyName;
        document.getElementById('propertyAddress').innerHTML = response.data.propertyAddress;
    })["catch"](function (error) {
        console.log(error);
    });
    /* ======================================================================= */
    /* ====================== UNITS DATA =========================== */
    /* ======================================================================== */
    /* ===================== EDIT UNIT DETAILS ================= */
    /* function setunitData(e) {
      var uid = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
      var uname = e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML;
      (<HTMLSelectElement>document.getElementById('edit_unit_number')).value = uid;
      (<HTMLSelectElement>document.getElementById('edit_building_number')).value = uname;
  
      document.getElementById('add_edit_unit').onclick = function () {
        const params = new URLSearchParams();
        var unitId: string = (<HTMLSelectElement>document.getElementById('edit_unit_number')).value;
        var unitName: string = (<HTMLSelectElement>document.getElementById('edit_building_number')).value;
        if (unitName != "" && unitId != "") {
          params.append('PropertyId', propertyId);
          params.append('UnitIdold', uid);
          params.append('UnitId', unitId);
          params.append('UnitName', unitName);
  
          axios({
            method: 'POST',
            url: 'http://localhost:8080/editUnit',
            data: params
          }).then(function (response) {
            console.log(response.data);
            if (response.data == "FAILED") {
              snackbar("Oops!! Something went wrong. Check your entries.", 4000);
            }
            else {
              document.getElementById('new_units_data').innerHTML = "";
              for (var i: number = 0; i < response.data.length; i++) {
                let p = new Unit(response.data[i].propertyId, response.data[i].unitId, response.data[i].unitName);
                let key: string = p.createList();
                let edit_button: HTMLElement = document.querySelector('.' + key + ' .edit_unit_data');
                let delete_button: HTMLElement = document.querySelector('.' + key + ' .delete_unit_data');
                edit_button.addEventListener('click', function (e) {
                  setunitData(e);
                })
                delete_button.addEventListener('click', function (e) {
                  deleteUnitData(e);
                })
              }
              greenSnackbar("Changes saved")
            }
  
          }).catch(function (error) {
            console.log(error);
          });
        }
        else {
          snackbar("Fields cannot be empty");
        }
  
      }
    } */
    /* ===================== DELETE UNIT DETAILS ================= */
    function deleteUnitData(e) {
        var cardNode = e.srcElement.parentNode.parentNode;
        e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML.substring(13);
        var unitNumber = e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML.substring(13);
        var buildingNumber = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML.substring(17);
        if (e.srcElement.nodeName == 'I') {
            cardNode = e.srcElement.parentNode.parentNode.parentElement;
            unitNumber = e.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML;
            buildingNumber = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
        }
        var url2 = 'http://localhost:8080/deleteUnit?unitNumber=';
        url2 = url2.concat(unitNumber);
        url2 = url2.concat("&buildingNumber=");
        url2 = url2.concat(buildingNumber);
        url2 = url2.concat("&propertyId=");
        url2 = url2.concat(propertyId);
        axios_1["default"]["delete"](url2).then(function (response) {
            if (response.data.toString() == "SUCCESS") {
                cardNode.parentElement.removeChild(cardNode);
                greenSnackbar("Successfully deleted.");
            }
            else {
                snackbar("Oops Something went wrong. Please Try againg after sometime.", 4000);
            }
        })["catch"](function (error) {
            snackbar("Oops!! Something went wrong. Please try again later.");
            //console.log(error);
        });
    }
    /* ======================== RETRIEVE ALL UNITS DATA ================================== */
    var url = 'http://localhost:8080/getallunits?propertyId=';
    url = url.concat(propertyId);
    axios_1["default"].get(url).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var p = new Unit(response.data[i].propertyId, response.data[i].unitNumber, response.data[i].buildingNumber);
            var key = p.createList();
            /* let edit_button: HTMLElement = document.querySelector('.' + key + ' .edit_unit_data'); */
            var delete_button = document.querySelector('.' + key + ' .delete_unit_data');
            /* edit_button.addEventListener('click', function (e) {
              setunitData(e);
            }) */
            delete_button.addEventListener('click', function (e) {
                deleteUnitData(e);
            });
        }
    })["catch"](function (error) {
        snackbar("Oops!! Something went wrong. Please try again later.", 5000);
        //console.log(error);
    });
    /* ==================================== ADD NEW UNIT ========================================== */
    document.getElementById('add_new_unit').onclick = function () {
        var params = new URLSearchParams();
        var unitNumber = document.getElementById('new_unit_number').value;
        var buildingNumber = document.getElementById('new_building_number').value;
        if (buildingNumber != "" && unitNumber != "") {
            params.append('PropertyId', propertyId);
            params.append('UnitNumber', unitNumber);
            params.append('BuildingNumber', buildingNumber);
            axios_1["default"]({
                method: 'POST',
                url: 'http://localhost:8080/saveUnit',
                data: params
            }).then(function (response) {
                if (response.data == "FAILED") {
                    snackbar("Enter Valid Entries");
                }
                else {
                    var p = new Unit(response.data.propertyId, response.data.unitNumber, response.data.buildingNumber);
                    var key = p.createList();
                    /* let edit_button: HTMLElement = document.querySelector('.' + key + ' .edit_unit_data'); */
                    var delete_button = document.querySelector('.' + key + ' .delete_unit_data');
                    /*  edit_button.addEventListener('click', function (e) {
                       setunitData(e);
                     }); */
                    delete_button.addEventListener('click', function (e) {
                        deleteUnitData(e);
                    });
                    document.getElementById('new_unit_number').value = "";
                    document.getElementById('new_building_number').value = "";
                    greenSnackbar("Unit added successfully!");
                }
            })["catch"](function (error) {
                //console.log(error);
                snackbar("Oops!! Something went wrong. Please try again later.");
            });
        }
        else {
            snackbar("Fields cannot be empty");
        }
    };
    /* =============================================================================== */
    /* ====================================== CARRIER DETAILS =============================== */
    /* =============================================================================== */
    /**========================= Carrier Edit Point ============================= */
    function editCarrierBtn(e) {
        var baseE = e.srcElement.parentNode.parentNode.parentNode;
        if (e.srcElement.nodeName == 'I') {
            baseE = baseE.parentNode;
        }
        document.getElementById('n_carrier_id').value = baseE.getElementsByClassName('new_carrier_id')[0].value;
        document.getElementById('n_carrier_name').value = baseE.getElementsByClassName('new_carrier_id')[0].value;
        document.getElementById('n_carrier_name').disabled = true;
        document.getElementById('add_new_carrier').style.display = 'none';
        document.getElementById('edit_new_carrier').style.display = 'block';
        /* let selectedCarrierName:string = baseE.getElementsByClassName('new_carrier_name')[0].value;
        (<HTMLSelectElement>document.getElementById('carrierSelect')).innerHTML = "<option value="+ selectedCarrierName
                                                                                              +" selected disabled>"+selectedCarrierName+"</option>";
    
     */
        var details_block = baseE.getElementsByClassName('carrier_details')[0];
        var days_block = details_block.children[0].children;
        var times_block = details_block.children[1].children;
        var days_array = [];
        var times_array = [];
        for (var i = 0; i < days_block.length; i++) {
            days_array.push(days_block[i].innerHTML);
            times_array.push(times_block[i].innerHTML);
        }
        var all_new_checkbox = document.getElementsByClassName("checkbox_new");
        for (var i = 0; i < all_new_checkbox.length; i++) {
            all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
            all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
            all_new_checkbox[i].checked = false;
        }
        for (var j = 0; j < days_array.length; j++) {
            for (var i = 0; i < all_new_checkbox.length; i++) {
                if (days_array[j] == all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('form-check-label')[0].innerHTML) {
                    all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = times_array[j];
                    all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = false;
                    all_new_checkbox[i].checked = true;
                }
            }
        }
        document.getElementById('edit_new_carrier').addEventListener('click', function (e) {
            var carrierId = document.getElementById('n_carrier_id').value;
            var car_name = document.getElementById('n_carrier_name').value;
            if (carrierId.length == 0 || car_name.length == 0) {
                snackbar("Enter valid entries");
            }
            else {
                var all_new_checkbox_1 = document.getElementsByClassName("checkbox_new");
                var day_array = [];
                var time_array = [];
                var i = 0;
                for (; i < all_new_checkbox_1.length; i++) {
                    if (all_new_checkbox_1[i].checked) {
                        //console.log(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
                        time_array.push(all_new_checkbox_1[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
                        day_array.push(all_new_checkbox_1[i].parentNode.parentNode.getElementsByClassName('form-check-label')[0].innerHTML);
                        all_new_checkbox_1[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
                        all_new_checkbox_1[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
                    }
                    all_new_checkbox_1[i].checked = false;
                }
                if (i == all_new_checkbox_1.length && (day_array.length == 0 || time_array.length == 0)) {
                    // console.log(day_array);
                    // console.log(time_array);
                    // snackbar("Enter valid entries 2");
                }
                else {
                    console.log(time_array, day_array);
                    var params = new URLSearchParams();
                    params.append('PropertyId', propertyId);
                    params.append('CarrierId', carrierId);
                    for (var i_1 = 0; i_1 < day_array.length; i_1++) {
                        params.append('Days', day_array[i_1]);
                        params.append('Time', time_array[i_1]);
                    }
                    axios_1["default"]({
                        method: 'POST',
                        url: 'http://localhost:8080/editCarrier',
                        data: params
                    }).then(function (response) {
                        var carrier_array = __spreadArrays(response.data);
                        carrier_array.sort(ObjComp);
                        console.log(carrier_array);
                        var carrier_array_length = carrier_array.length;
                        document.getElementById('new_carrier_data').innerHTML = "";
                        if (carrier_array_length != 0) {
                            var cur_cid = carrier_array[0].carrierId;
                            var cur_cname = carrier_array[0].carrierName;
                            var carrier_card_array = [{ 'deliveryDay': carrier_array[0].deliveryDay, 'deliveryTime': carrier_array[0].deliveryTime }];
                            for (var i_2 = 1; i_2 < carrier_array_length; i_2++) {
                                if (carrier_array[i_2].carrierId != cur_cid) {
                                    var carrier_1 = new Carrier(cur_cid, cur_cname, carrier_card_array);
                                    var key_1 = carrier_1.createCard();
                                    var edit_button_1 = document.querySelector('.' + key_1 + ' .carrier_edit_btn');
                                    var delete_button_1 = document.querySelector('.' + key_1 + ' .carrier_delete_btn');
                                    edit_button_1.addEventListener('click', function (e) {
                                        editCarrierBtn(e);
                                    });
                                    delete_button_1.addEventListener('click', function (e) {
                                        deleteCarrierBtn(e);
                                    });
                                    cur_cid = carrier_array[i_2].carrierId;
                                    cur_cname = carrier_array[i_2].carrierName;
                                    carrier_card_array = [{ 'deliveryDay': carrier_array[i_2].deliveryDay, 'deliveryTime': carrier_array[i_2].deliveryTime }];
                                }
                                else {
                                    carrier_card_array.push({ 'deliveryDay': carrier_array[i_2].deliveryDay, 'deliveryTime': carrier_array[i_2].deliveryTime });
                                }
                            }
                            var carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
                            var key = carrier.createCard();
                            var edit_button = document.querySelector('.' + key + ' .carrier_edit_btn');
                            var delete_button = document.querySelector('.' + key + ' .carrier_delete_btn');
                            edit_button.addEventListener('click', function (e) {
                                editCarrierBtn(e);
                            });
                            delete_button.addEventListener('click', function (e) {
                                deleteCarrierBtn(e);
                            });
                        }
                    });
                }
                ;
            }
        });
    }
    /**============================ Carrier Delete =================================== */
    function deleteCarrierBtn(e) {
        var cardNode = e.srcElement.parentNode.parentNode.parentNode;
        var carrierId = e.srcElement.parentNode.parentNode.parentNode.getElementsByClassName('new_carrier_id')[0].value;
        if (e.srcElement.nodeName == 'I') {
            cardNode = e.srcElement.parentNode.parentNode.parentNode.parentElement;
            carrierId = e.srcElement.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('new_carrier_id')[0].value;
        }
        var url2 = 'http://localhost:8080/deleteCarrier?PropertyId=';
        url2 = url2.concat(propertyId);
        url2 = url2.concat('&CarrierId=' + carrierId);
        axios_1["default"]["delete"](url2).then(function (response) {
            if (response.data.toString() == "SUCCESS") {
                console.log(cardNode);
                cardNode.parentElement.removeChild(cardNode);
                greenSnackbar("Successfully deleted a Unit.");
            }
            else {
                snackbar("Oops Something went wrong. Please Try againg after sometime.", 4000);
            }
        })["catch"](function (error) {
            console.log(error);
        });
    }
    /* ========================== Object Sorter ================================== */
    function ObjComp(a, b) {
        if (a.carrierId < b.carrierId)
            return -1;
        else if (a.carrierId > b.carrierId)
            return 1;
        return 0;
    }
    /* ====================================== CARRIER API RETRIEVE =============================== */
    var url = 'http://localhost:8080/fetchCarrier?PropertyId=';
    url = url.concat(propertyId);
    axios_1["default"].get(url).then(function (response) {
        var carrier_array = __spreadArrays(response.data);
        carrier_array.sort(ObjComp);
        console.log(carrier_array);
        var carrier_array_length = carrier_array.length;
        if (carrier_array_length != 0) {
            var cur_cid = carrier_array[0].carrierId;
            var cur_cname = carrier_array[0].carrierName;
            var carrier_card_array = [{ 'deliveryDay': carrier_array[0].deliveryDay, 'deliveryTime': carrier_array[0].deliveryTime }];
            for (var i = 1; i < carrier_array_length; i++) {
                if (carrier_array[i].carrierId != cur_cid) {
                    var carrier_2 = new Carrier(cur_cid, cur_cname, carrier_card_array);
                    var key_2 = carrier_2.createCard();
                    var edit_button_2 = document.querySelector('.' + key_2 + ' .carrier_edit_btn');
                    var delete_button_2 = document.querySelector('.' + key_2 + ' .carrier_delete_btn');
                    edit_button_2.addEventListener('click', function (e) {
                        editCarrierBtn(e);
                    });
                    delete_button_2.addEventListener('click', function (e) {
                        deleteCarrierBtn(e);
                    });
                    cur_cid = carrier_array[i].carrierId;
                    cur_cname = carrier_array[i].carrierName;
                    carrier_card_array = [{ 'deliveryDay': carrier_array[i].deliveryDay, 'deliveryTime': carrier_array[i].deliveryTime }];
                }
                else {
                    carrier_card_array.push({ 'deliveryDay': carrier_array[i].deliveryDay, 'deliveryTime': carrier_array[i].deliveryTime });
                }
            }
            var carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
            var key = carrier.createCard();
            var edit_button = document.querySelector('.' + key + ' .carrier_edit_btn');
            var delete_button = document.querySelector('.' + key + ' .carrier_delete_btn');
            edit_button.addEventListener('click', function (e) {
                editCarrierBtn(e);
            });
            delete_button.addEventListener('click', function (e) {
                deleteCarrierBtn(e);
            });
        }
    })["catch"](function (error) {
        console.log(error);
    });
    /**================================= CheckBox-EventListener ======================================= */
    var all_new_checkbox = document.getElementsByClassName("checkbox_new");
    for (var i = 0; i < all_new_checkbox.length; i++) {
        all_new_checkbox[i].checked = false;
        all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
        all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
        all_new_checkbox[i].addEventListener('change', function (e) {
            e.srcElement.parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
            e.srcElement.parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = !e.srcElement.parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled;
        });
    }
    /**=========================================ALL CARRIER RETRIEVE=============================================== */
    var carrierSelect = "<option value=\"\" selected disabled>Choose carrier</option>";
    var url = 'http://localhost:8080/allCarrier';
    axios_1["default"].get(url).then(function (response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            carrierSelect += " <option value=\"" + response.data[i][1] + "\">" + response.data[i][0] + "</option>";
        }
        document.getElementById('n_carrier_name').innerHTML = carrierSelect;
    })["catch"](function (error) {
        console.log(error);
    });
    /**================================= ADD NEW CARRIER ====================================================== */
    document.getElementById('new_carrier_btn').addEventListener('click', function () {
        /* (<HTMLSelectElement>document.getElementById('n_carrier_id')).disabled = false; */
        document.getElementById('n_carrier_name').disabled = false;
        var carrierSelect = "<option value=\"\" selected disabled>Choose carrier</option>";
        var url = 'http://localhost:8080/allCarrier';
        axios_1["default"].get(url).then(function (response) {
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                carrierSelect += " <option value=\"" + response.data[i][1] + "\">" + response.data[i][0] + "</option>";
            }
            document.getElementById('n_carrier_name').innerHTML = carrierSelect;
        })["catch"](function (error) {
            console.log(error);
        });
        document.getElementById('add_new_carrier').style.display = 'block';
        document.getElementById('edit_new_carrier').style.display = 'none';
        /* (<HTMLSelectElement>document.getElementById('n_carrier_id')).value = ""; */
        document.getElementById('n_carrier_name').value = "";
        var all_new_checkbox = document.getElementsByClassName("checkbox_new");
        for (var i = 0; i < all_new_checkbox.length; i++) {
            all_new_checkbox[i].checked = false;
            all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
            all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
        }
    });
    document.getElementById('add_new_carrier').addEventListener('click', function (e) {
        var carrierId = document.getElementById('n_carrier_name').value;
        var select_element = document.getElementById('n_carrier_name');
        var car_name = select_element.options[select_element.selectedIndex].text;
        if (carrierId.length == 0 || car_name.length == 0) {
            snackbar("Enter valid entries");
        }
        else {
            var all_new_checkbox_2 = document.getElementsByClassName("checkbox_new");
            var day_array = [];
            var time_array = [];
            for (var i = 0; i < all_new_checkbox_2.length; i++) {
                if (all_new_checkbox_2[i].checked) {
                    //console.log(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
                    time_array.push(all_new_checkbox_2[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
                    day_array.push(all_new_checkbox_2[i].parentNode.parentNode.getElementsByClassName('form-check-label')[0].innerHTML);
                    all_new_checkbox_2[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
                    all_new_checkbox_2[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
                }
                all_new_checkbox_2[i].checked = false;
            }
            if (day_array.length == 0 || time_array.length == 0) {
                snackbar("Enter valid entries");
            }
            else {
                var params = new URLSearchParams();
                params.append('PropertyId', propertyId);
                params.append('CarrierId', carrierId);
                params.append('CarrierName', car_name);
                for (var i = 0; i < day_array.length; i++) {
                    params.append('Days', day_array[i]);
                    params.append('Time', time_array[i]);
                }
                console.log(carrierId, propertyId, car_name);
                axios_1["default"]({
                    method: 'POST',
                    url: 'http://localhost:8080/saveCarrier',
                    data: params
                }).then(function (response) {
                    if (response.data == "FAILED") {
                        snackbar("Oops!! Something went wrong. Check your entries ", 4000);
                    }
                    else {
                        var carrier_array = __spreadArrays(response.data);
                        var carrier_array_length = carrier_array.length;
                        if (carrier_array_length != 0) {
                            var cur_cid = carrier_array[0].carrierId;
                            var cur_cname = carrier_array[0].carrierName;
                            var carrier_card_array = [{ 'deliveryDay': carrier_array[0].deliveryDay, 'deliveryTime': carrier_array[0].deliveryTime }];
                            for (var i = 1; i < carrier_array_length; i++) {
                                carrier_card_array.push({ 'deliveryDay': carrier_array[i].deliveryDay, 'deliveryTime': carrier_array[i].deliveryTime });
                            }
                            var carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
                            var key = carrier.createCard();
                            var edit_button = document.querySelector('.' + key + ' .carrier_edit_btn');
                            var delete_button = document.querySelector('.' + key + ' .carrier_delete_btn');
                            edit_button.addEventListener('click', function (e) {
                                editCarrierBtn(e);
                            });
                            delete_button.addEventListener('click', function (e) {
                                deleteCarrierBtn(e);
                            });
                            greenSnackbar("Added Successfully");
                        }
                        else {
                            snackbar("Oops!! Something went wrong");
                        }
                    }
                });
                /* (<HTMLSelectElement>document.getElementById('n_carrier_id')).value = ""; */
                document.getElementById('n_carrier_name').value = "";
            }
        }
    });
    var analyse = document.getElementById("analyse-btn");
    analyse.onclick = function () {
        window.open('index3.html');
    };
};
