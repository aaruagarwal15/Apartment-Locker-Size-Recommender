import axios from 'axios'

class Unit {
  pId: number;
  uId: number;
  uName: string;
  constructor(pId: number, uId: number, uName: string) {
    this.pId = pId;
    this.uId = uId;
    this.uName = uName;
  }
  createList(): string {
    var st: string;
    var key: string = 'a' + Math.random().toString(36).slice(2);
    let card = document.createElement('div');
    let card_html = "<div class='card-body'><h5 class='card-title'>" + this.uName + "</h5><h6 class='card-subtitle mb-2 text-muted'>" + this.uId.toString() + "</h6><button type='button' class='btn btn-outline-secondary edit_unit_data' data-toggle='modal' data-placement='bottom' data-target='#editUnit' title='Edit Details'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;<button type='button' class='btn btn-outline-danger delete_unit_data' data-toggle='tooltip' data-placement='bottom' title='Delete Unit'><i class='fa fa-trash' aria-hidden='true'></i></button></div>"
    card.innerHTML = card_html
    card.classList.add(key)
    card.classList.add("card")
    card.classList.add("border-3")
    card.setAttribute('style', 'min-width: 18rem;margin:1%;')
    document.getElementById('new_units_data').appendChild(card);

    return key;

  }
};

/**=========================== CARRIER ================================ */
class Carrier {
  cId: number;
  cName: string;
  delivery_details;
  delivery_details_length: number;
  constructor(cId: number, cName: string, delivery_details) {
    this.cId = cId;
    this.cName = cName;
    this.delivery_details = [...delivery_details];
    this.delivery_details_length = this.delivery_details.length
  }
  createCard(): void {
    let mycard = document.createElement('div');
    let cardStructure: string = '<h4 class="card-header">\
                                  <span id="new_carrier_name">'+ this.cName + '</span>&emsp;\
                                  <div style="float:right;">\
                                    <button type="button" class="btn btn-outline-secondary" data-toggle="tooltip" data-placement="bottom" title="Edit Details">\
                                      <i class="fa fa-edit"></i>\
                                    </button>&nbsp;&nbsp;\
                                    <button type="button" class="btn btn-outline-danger" data-toggle="tooltip" data-placement="bottom" title="Delete Carrier">\
                                      <i class="fa fa-trash" aria-hidden="true"></i>\
                                    </button>\
                                  </div>\
                                </h4>\
                                <div class="card-body">\
                                  <h6 class="card-title">Delivery Details:</h6>\
                                    <p class="card-text">\
                                        <div style="display:flex;justify-content: space-evenly;">'
    cardStructure += '<div>'
    for (let i: number = 0; i < this.delivery_details_length; i++) {
      cardStructure += '<p>' + this.delivery_details[i].delivery_day + '</p>';
    }
    cardStructure += '</div><div>'
    for (let i: number = 0; i < this.delivery_details_length; i++) {
      cardStructure += '<p>' + this.delivery_details[i].delivery_time + '</p>';
    }
    cardStructure += '</div>'
    cardStructure += '</div>\
                                        </p>\
                                    </div>';
    mycard.classList.add('card')
    mycard.setAttribute('style', 'margin:1%;min-width: 250px;');
    mycard.innerHTML = cardStructure;
    document.getElementById('new_carrier_data').insertBefore(mycard, document.getElementById('new_carrier_data').firstChild);
  }
}

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
}

window.onload = function () {

  var propertyId = localStorage.getItem("Property_id");

  /* ================================ FETCH PROPERTY DETAILS =============================== */
  var url: string = 'http://localhost:8080/fetch_details?P_id=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {
    //console.log(response.data);
    document.getElementById('p_name').innerHTML = response.data.p_name;
    document.getElementById('p_address').innerHTML = response.data.p_address;
  }).catch(function (error) {
    //console.log(error);
  });


  /* ===================== EDIT UNIT DETAILS ================= */
  function setunitData(e) {
    var uid = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    var uname = e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML;
    (<HTMLSelectElement>document.getElementById('edit_unit_id')).value = uid;
    (<HTMLSelectElement>document.getElementById('edit_unit_name')).value = uname;

    document.getElementById('add_edit_unit').onclick = function () {
      const params = new URLSearchParams();
      var u_id: string = (<HTMLSelectElement>document.getElementById('edit_unit_id')).value;
      var u_name: string = (<HTMLSelectElement>document.getElementById('edit_unit_name')).value;
      if (u_name != "" && u_id != "") {
        params.append('Property_Id', propertyId);
        params.append('Unit_Id_old', uid);
        params.append('Unit_Id', u_id);
        params.append('Unit_Name', u_name);

        axios({
          method: 'POST',
          url: 'http://localhost:8080/edit_unit',
          data: params
        }).then(function (response) {
          console.log(response.data);
          if (response.data == "FAILED") {
            snackbar("Oops!! Something went wrong. Check your entries.", 4000);
          }
          else {
            document.getElementById('new_units_data').innerHTML = "";
            for (var i: number = 0; i < response.data.length; i++) {
              let p = new Unit(response.data[i].p_id, response.data[i].u_id, response.data[i].u_name);
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



  }

  /* ===================== DELETE UNIT DETAILS ================= */

  function deleteUnitData(e) {

    let cardNode: HTMLElement = e.srcElement.parentNode.parentNode;
    let u_id = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    if (e.srcElement.nodeName == 'I') {
      cardNode = e.srcElement.parentNode.parentNode.parentElement;
      u_id = e.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    }
    let url2: string = 'http://localhost:8080/delete_unit?U_Id=';
    url2 = url2.concat(u_id);

    axios.delete(url2).then(function (response) {
      if (response.data.toString() == "SUCCESS") {
        console.log(cardNode);
        cardNode.parentElement.removeChild(cardNode);
        greenSnackbar("Successfully deleted a Unit.")
      }
      else {
        snackbar("Oops Something went wrong. Please Try againg after sometime.", 4000);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }


  /* ======================== RETRIEVE ALL UNITS DATA ================================== */
  var url: string = 'http://localhost:8080/getallunits?PId=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {
    for (var i: number = 0; i < response.data.length; i++) {
      let p = new Unit(response.data[i].p_id, response.data[i].u_id, response.data[i].u_name);
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
  }).catch(function (error) {
    snackbar("Oops!! Something went wrong. Please try again later.", 5000);
    console.log(error);
  });


  /* ==================================== ADD NEW UNIT ========================================== */
  document.getElementById('add_new_unit').onclick = function () {
    const params = new URLSearchParams();
    var u_id: string = (<HTMLSelectElement>document.getElementById('new_unit_id')).value;
    var u_name: string = (<HTMLSelectElement>document.getElementById('new_unit_name')).value;

    if (u_name != "" && u_id != "") {
      params.append('Property_Id', propertyId);
      params.append('Unit_Id', u_id);
      params.append('Unit_Name', u_name);

      axios({
        method: 'POST',
        url: 'http://localhost:8080/save_unit',
        data: params
      }).then(function (response) {
        if (response.data == "FAILED") {
          snackbar("Enter Valid Entries");
        }
        else {
          console.log(response.data)
          let p = new Unit(response.data.p_id, response.data.u_id, response.data.u_name);
          let key: string = p.createList();
          let edit_button: HTMLElement = document.querySelector('.' + key + ' .edit_unit_data');
          let delete_button: HTMLElement = document.querySelector('.' + key + ' .delete_unit_data');
          edit_button.addEventListener('click', function (e) {
            setunitData(e);
          });
          delete_button.addEventListener('click', function (e) {
            deleteUnitData(e);
          });
          (<HTMLSelectElement>document.getElementById('new_unit_id')).value = "";
          (<HTMLSelectElement>document.getElementById('new_unit_name')).value = "";
          greenSnackbar("Unit added successfully!")
        }

      }).catch(function (error) {
        console.log(error);
      });
    }
    else {
      snackbar("Fields cannot be empty");
    }

  }






  /* ====================================== CARRIERS =============================== */

  /* ==========================Object Sorter================================== */

  function ObjComp(a, b) {
    if (a.c_id < b.c_id)
      return -1;
    else if (a.c_id > b.c_id)
      return 1;
    return 0;
  }

  /* ====================================== CARRIER API =============================== */


  var url: string = 'http://localhost:8080/fetch_carrier?PId=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {

    let carrier_array: any = [...response.data];
    carrier_array.sort(ObjComp);
    console.log(carrier_array);

    let carrier_array_length: number = carrier_array.length
    if (carrier_array_length != 0) {
      let cur_cid: number = carrier_array[0].c_id;
      let cur_cname = carrier_array[0].c_name;
      let carrier_card_array: any = [{ 'delivery_day': carrier_array[0].delivery_day, 'delivery_time': carrier_array[0].delivery_time }]
      
      for (let i: number = 1; i < carrier_array_length; i++) {
        if (carrier_array[i].c_id != cur_cid) {
          let carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
          carrier.createCard();
          cur_cid = carrier_array[i].c_id; //5101
          cur_cname = carrier_array[i].c_name;
          carrier_card_array = [{ 'delivery_day': carrier_array[i].delivery_day, 'delivery_time': carrier_array[i].delivery_time }];
        }
        else {
          carrier_card_array.push({ 'delivery_day': carrier_array[i].delivery_day, 'delivery_time': carrier_array[i].delivery_time });
        }
      }
      let carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
      carrier.createCard();
    }
  }).catch(function (error) {
    console.log(error);
  });

};

