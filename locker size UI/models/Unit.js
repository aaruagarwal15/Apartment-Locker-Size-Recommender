"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Snackbars_1 = require("../UIComponenets/Snackbars");
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
/* ==================================== ADD NEW UNIT ========================================== */
function newUnitHandler(propertyId) {
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
                    Snackbars_1.snackbar("Enter Valid Entries");
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
                        deleteUnitData(e, propertyId);
                    });
                    document.getElementById('new_unit_number').value = "";
                    document.getElementById('new_building_number').value = "";
                    Snackbars_1.greenSnackbar("Unit added successfully!");
                }
            })["catch"](function (error) {
                //console.log(error);
                Snackbars_1.snackbar("Oops!! Something went wrong. Please try again later.");
            });
        }
        else {
            Snackbars_1.snackbar("Fields cannot be empty");
        }
    };
}
exports.newUnitHandler = newUnitHandler;
/* ===================== DELETE UNIT DETAILS ================= */
function deleteUnitData(e, propertyId) {
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
            Snackbars_1.greenSnackbar("Successfully deleted.");
        }
        else {
            Snackbars_1.snackbar("Oops Something went wrong. Please Try againg after sometime.", 4000);
        }
    })["catch"](function (error) {
        Snackbars_1.snackbar("Oops!! Something went wrong. Please try again later.");
        //console.log(error);
    });
}
exports.deleteUnitData = deleteUnitData;
/* ======================== RETRIEVE ALL UNITS DATA ================================== */
function createUnitCard(propertyId) {
    var url = 'http://localhost:8080/getallunits?propertyId=';
    url = url.concat(propertyId);
    //console.log(propertyId);
    axios_1["default"].get(url).then(function (response) {
        //console.log(response.data, "---");
        for (var i = 0; i < response.data.length; i++) {
            var p = new Unit(response.data[i].propertyId, response.data[i].unitNumber, response.data[i].buildingNumber);
            var key = p.createList();
            /* let edit_button: HTMLElement = document.querySelector('.' + key + ' .edit_unit_data'); */
            var delete_button = document.querySelector('.' + key + ' .delete_unit_data');
            /* edit_button.addEventListener('click', function (e) {
              setunitData(e);
            }) */
            delete_button.addEventListener('click', function (e) {
                deleteUnitData(e, propertyId);
            });
        }
    })["catch"](function (error) {
        Snackbars_1.snackbar("Oops!! Something went wrong. Please try again later.", 5000);
        //console.log(error);
    });
}
exports.createUnitCard = createUnitCard;
exports["default"] = Unit;
