import axios from 'axios'

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
  }
};



window.onload = function () {


  function getID(e) {
    console.log(e.srcElement.previousElementSibling.innerHTML);
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
    console.log(error);
  }).then(() => {

    /* ============================================ VIEW DETAILS ========================================= */
    var all_buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.get_details');
    console.log("imhere")
    for (var i: number = 0; i < all_buttons.length; i++) {
      all_buttons[i].onclick = getID;
    }

  });



  /* ============================ ADD NEW PROPERTY ================================================ */
  document.getElementById('addNewProperty').onclick = function () {
    const params = new URLSearchParams();
    var propertyName: string = (<HTMLSelectElement>document.getElementById('newProperty')).value;
    var propertyAddress: string = (<HTMLSelectElement>document.getElementById('newAddress')).value;
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

      }).catch(function (error) {
        console.log(error);
      });
    }
    else {
      alert("Fields cannot be empty");
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
      }
    }).catch(function (error) {
      console.log(error);
    });
  };

  /* ==================== SEARCH BOX ===================================== */
  function searchkey(e) {
    var searchField: string = (<HTMLInputElement>document.getElementById('txt-search')).value;
    if (searchField != '') {
      var regex = new RegExp(searchField, "i");
      document.getElementById('propertyDisplay').innerHTML = "";
      console.log(allProperties);
      allProperties.forEach((val, key) => {
        if ((val.propertyName.search(regex) != -1) || (val.propertyAddress.search(regex) != -1)) {
          let property = new Property(val.propertyId, val.propertyName, val.propertyAddress);
          property.createList();
        }
      })
    }
  }
  document.getElementById('txt-search').addEventListener('keyup', searchkey);






  console.log("hiiiiii");

}

