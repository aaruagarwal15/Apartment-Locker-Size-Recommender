"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Unit_1 = require("./models/Unit");
var Carrier_1 = require("./models/Carrier");
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
    Unit_1.createUnitCard(propertyId);
    Unit_1.newUnitHandler(propertyId);
    /* =============================================================================== */
    /* ====================================== CARRIER DETAILS =============================== */
    /* =============================================================================== */
    Carrier_1.createCarrierCards(propertyId);
    Carrier_1.retrieveData();
    Carrier_1.newCarrierHandler();
    Carrier_1.addCarrierHandler(propertyId);
    var analyse = document.getElementById("analyse-btn");
    analyse.onclick = function () {
        window.open('index3.html');
    };
};
