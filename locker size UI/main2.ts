import axios from 'axios'
import { newUnitHandler, createUnitCard } from './models/Unit'
import { newCarrierHandler, addCarrierHandler, retrieveData, createCarrierCards } from './models/Carrier'


/* ======================================================================= */
/* ====================== ONLOAD FUNCTION =========================== */
/* ======================================================================== */

window.onload = function () {

  var propertyId = localStorage.getItem("PropertyId");
  /* ================================ FETCH PROPERTY DETAILS =============================== */
  var url: string = 'http://localhost:8080/fetchPropertyDetails?propertyId=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {
    //console.log(response.data);
    document.getElementById('propertyName').innerHTML = response.data.propertyName;
    document.getElementById('propertyAddress').innerHTML = response.data.propertyAddress;
  }).catch(function (error) {
    console.log(error);
  });



  /* ======================================================================= */
  /* ====================== UNITS DATA =========================== */
  /* ======================================================================== */

  createUnitCard(propertyId);
  newUnitHandler(propertyId);



  /* =============================================================================== */
  /* ====================================== CARRIER DETAILS =============================== */
  /* =============================================================================== */


  createCarrierCards(propertyId);
  retrieveData();
  newCarrierHandler();
  addCarrierHandler(propertyId);


  let analyse = document.getElementById("analyse-btn");
  analyse.onclick = function () {
    window.open('index3.html');
  }


};

