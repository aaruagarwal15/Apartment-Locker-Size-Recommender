import axios from 'axios'
import { snackbar, greenSnackbar } from './UIComponenets/Snackbars';

class Property {
  propertyId: number;
  propertyName: string;
  propertyAddress: string;
  constructor(propertyId: number, propertyName: string, propertyAddress: string) {
    this.propertyId = propertyId;
    this.propertyName = propertyName;
    this.propertyAddress = propertyAddress;
  }
  createList(): void {
    var st: string;
    let apartmentCard: HTMLElement = document.createElement('div');
    apartmentCard.innerHTML = `
    <div class='card-header'>${this.propertyName}</div>
    <div class='card-body'>
      <p class='card-text'>${this.propertyAddress}</p>
      <p hidden>${this.propertyId.toString()}</p>
      <button type='button' class='btn btn-info get_details'> View Details </button>
    </div>
    `;
    apartmentCard.classList.add('card');
    apartmentCard.classList.add('border-info');
    document.getElementById('propertyDisplay').appendChild(apartmentCard);
  }
};


/* ====================== SNACKBARS ================== */
/* 
function snackbar(msg, time = 3000) {

  let x: HTMLElement = document.getElementById("snackbar");
  x.innerHTML = msg
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, time);
}

function greenSnackbar(msg, time = 3000) {

  let x: HTMLElement = document.getElementById("snackbar");
  x.innerHTML = msg
  x.className = "greenShow";
  setTimeout(function () { x.className = x.className.replace("greenShow", ""); }, time);
} */


window.onload = function () {


  function getID(e) {
    //console.log(e.srcElement.previousElementSibling.innerHTML);
    var id: number = e.srcElement.previousElementSibling.innerHTML;
    localStorage.setItem("PropertyId", id.toString());
    //window.open("index2.html?id="+ propertyId.toString());
    window.open("index2.html");
  }

  var allProperties;

  /* ================== GET LIST OF PROPERTIES ======================================== */
  axios.get('http://localhost:8080/getallProperty').then(function (response) {
    console.log(response.data);
    allProperties = response.data;
    for (var i: number = 0; i < response.data.length; i++) {
      let p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
      p.createList();
    }
  }).catch(function (error) {
    snackbar("Oops!! Some error occured");
  }).then(() => {

    /* ============================================ VIEW DETAILS ========================================= */
    let all_buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.get_details');
    console.log("imhere")
    for (var i: number = 0; i < all_buttons.length; i++) {
      all_buttons[i].onclick = getID;
    }
  });



  /* ============================ ADD NEW PROPERTY ================================================ */
  document.getElementById('addNewProperty').onclick = function () {
    const params = new URLSearchParams();
    let propertyName: string = (<HTMLSelectElement>document.getElementById('newProperty')).value;
    let propertyAddress: string = (<HTMLSelectElement>document.getElementById('newAddress')).value;
    //var p_status:string = ( < HTMLSelectElement > document.getElementById('new_status')).value;
    if (propertyName != "" && propertyAddress != "") {
      params.append('PropertyName', propertyName);
      params.append('PropertyAddress', propertyAddress);
      //params.append('Property_status', p_status);
      axios({
        method: 'POST',
        url: 'http://localhost:8080/saveProperty',
        data: params
      }).then(function (response) {
        console.log(response);
        document.getElementById('propertyDisplay').innerHTML = "";
        for (var i: number = 0; i < response.data.length; i++) {
          let p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
          p.createList();
        }
        let all_buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.get_details');
        for (var i: number = 0; i < all_buttons.length; i++) {
          all_buttons[i].onclick = getID;
        }
        (<HTMLSelectElement>document.getElementById('newProperty')).value = "";
        (<HTMLSelectElement>document.getElementById('newAddress')).value = "";
        greenSnackbar("Successfully Added")
      }).catch(function (error) {
        console.log(error);
        (<HTMLSelectElement>document.getElementById('newProperty')).value = "";
        (<HTMLSelectElement>document.getElementById('newAddress')).value = "";
        snackbar("Oops!! Some error occured")
      });
    }
    else {
      snackbar("Fields cannot be empty", 4000);
    }
    //document.getElementById('newEntry')

  }


  /* ==================== INCREASING ORDERED LIST ===================================== */
  document.getElementById('increasingOrder').onclick = function () {
    //var f_val:string = ( < HTMLSelectElement > document.getElementById('status_filter')).value;
    var url: string = 'http://localhost:8080/increasingFilter';
    //url = url.concat(f_val);
    axios.get(url).then(function (response) {
      console.log(response.data);
      document.getElementById('propertyDisplay').innerHTML = "";
      for (var i: number = 0; i < response.data.length; i++) {
        let p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
        p.createList();
        let all_buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.get_details');
        for (var i: number = 0; i < all_buttons.length; i++) {
          all_buttons[i].onclick = getID;
        }

      }
    }).catch(function (error) {
      console.log(error);
    });
  };



  /* ==================== DECREASING ORDERED LIST ===================================== */
  document.getElementById('decreasingOrder').onclick = function () {
    // var f_val:string = ( < HTMLSelectElement > document.getElementById('status_filter')).value;
    var url: string = 'http://localhost:8080/decreasingFilter';
    //url = url.concat(f_val);
    axios.get(url).then(function (response) {
      console.log(response.data);
      document.getElementById('propertyDisplay').innerHTML = "";
      for (var i: number = 0; i < response.data.length; i++) {
        let p = new Property(response.data[i].propertyId, response.data[i].propertyName, response.data[i].propertyAddress);
        p.createList();
        let all_buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.get_details');
        for (var i: number = 0; i < all_buttons.length; i++) {
          all_buttons[i].onclick = getID;
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  };

  /* ==================== SEARCH BOX ===================================== */
  function searchkey(e) {
    var searchField: string = (<HTMLInputElement>document.getElementById('txt-search')).value;

    var regex = new RegExp(searchField, "i");
    console.log(regex);
    document.getElementById('propertyDisplay').innerHTML = "";
    console.log(allProperties);
    allProperties.forEach((val, key) => {
      if ((val.propertyName.search(regex) != -1) || (val.propertyAddress.search(regex) != -1)) {
        let property = new Property(val.propertyId, val.propertyName, val.propertyAddress);
        property.createList();
      }
    })

  }
  document.getElementById('txt-search').addEventListener('keyup', searchkey);
}


