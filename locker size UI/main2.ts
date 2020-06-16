import axios from 'axios'
import { response } from 'express';

/**=========================== UNIT CLASS ================================ */

class Unit {
  propertyId: number;
  unitId: number;
  unitName: string;
  constructor(propertyId: number, unitId: number, unitName: string) {
    this.propertyId = propertyId;
    this.unitId = unitId;
    this.unitName = unitName;
  }
  createList(): string {
    var key: string = 'a' + Math.random().toString(36).slice(2);
    let card = document.createElement('div');
    let card_html = "<div class='card-body'><h5 class='card-title'>" + this.unitName + "</h5><h6 class='card-subtitle mb-2 text-muted'>" + this.unitId.toString() + "</h6><button type='button' class='btn btn-outline-secondary edit_unit_data' data-toggle='modal' data-placement='bottom' data-target='#editUnit' title='Edit Details'><i class='fa fa-edit'></i></button>&nbsp;&nbsp;<button type='button' class='btn btn-outline-danger delete_unit_data' data-toggle='tooltip' data-placement='bottom' title='Delete Unit'><i class='fa fa-trash' aria-hidden='true'></i></button></div>"
    card.innerHTML = card_html
    card.classList.add(key)
    card.classList.add("card")
    card.classList.add("border-3")
    card.setAttribute('style', 'min-width: 18rem;margin:1%;')
    document.getElementById('new_units_data').appendChild(card);

    return key;

  }
};

/**=========================== CARRIER CLASS ================================ */
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
  createCard(): string {
    let mycard = document.createElement('div');
    var key: string = 'carrier_' + Math.random().toString(36).slice(2);
    let cardStructure: string = '<h4 class="card-header">\
                                        <input class="new_carrier_id" value="'+ this.cId + '" hidden>\
                                        <span class="new_carrier_name">'+ this.cName + '</span>&emsp;\
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
                                            <div class="carrier_details" style="display:flex;justify-content: space-evenly;">'
    cardStructure += '<div>'
    for (let i: number = 0; i < this.delivery_details_length; i++) {
      cardStructure += '<p>' + this.delivery_details[i].deliveryDay + '</p>';
    }
    cardStructure += '</div><div>'
    for (let i: number = 0; i < this.delivery_details_length; i++) {
      cardStructure += '<p>' + this.delivery_details[i].deliveryTime + '</p>';
    }
    cardStructure += '</div>'
    cardStructure += '</div></p></div>';
    mycard.classList.add('card');
    mycard.classList.add(key);
    mycard.setAttribute('style', 'margin:1%;width: 380px;');
    mycard.innerHTML = cardStructure;
    document.getElementById('new_carrier_data').insertBefore(mycard, document.getElementById('new_carrier_data').firstChild);
    return key;
  }
}

/* ====================== SNACKBARS ================== */

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


  /* ===================== EDIT UNIT DETAILS ================= */
  function setunitData(e) {
    var uid = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    var uname = e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML;
    (<HTMLSelectElement>document.getElementById('edit_unit_id')).value = uid;
    (<HTMLSelectElement>document.getElementById('edit_unit_name')).value = uname;

    document.getElementById('add_edit_unit').onclick = function () {
      const params = new URLSearchParams();
      var unitId: string = (<HTMLSelectElement>document.getElementById('edit_unit_id')).value;
      var unitName: string = (<HTMLSelectElement>document.getElementById('edit_unit_name')).value;
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



  }

  /* ===================== DELETE UNIT DETAILS ================= */

  function deleteUnitData(e) {

    let cardNode: HTMLElement = e.srcElement.parentNode.parentNode;
    let unitId = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    if (e.srcElement.nodeName == 'I') {
      cardNode = e.srcElement.parentNode.parentNode.parentElement;
      unitId = e.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    }
    let url2: string = 'http://localhost:8080/deleteUnit?unitId=';
    url2 = url2.concat(unitId);

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
  var url: string = 'http://localhost:8080/getallunits?propertyId=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {
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
  }).catch(function (error) {
    snackbar("Oops!! Something went wrong. Please try again later.", 5000);
    console.log(error);
  });


  /* ==================================== ADD NEW UNIT ========================================== */
  document.getElementById('add_new_unit').onclick = function () {
    const params = new URLSearchParams();
    var unitId: string = (<HTMLSelectElement>document.getElementById('new_unit_id')).value;
    var unitName: string = (<HTMLSelectElement>document.getElementById('new_unit_name')).value;

    if (unitName != "" && unitId != "") {
      params.append('PropertyId', propertyId);
      params.append('UnitId', unitId);
      params.append('UnitName', unitName);

      axios({
        method: 'POST',
        url: 'http://localhost:8080/saveUnit',
        data: params
      }).then(function (response) {
        if (response.data == "FAILED") {
          snackbar("Enter Valid Entries");
        }
        else {
          console.log(response.data)
          let p = new Unit(response.data.propertyId, response.data.unitId, response.data.unitName);
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





  /* =============================================================================== */
  /* ====================================== CARRIER DETAILS =============================== */
  /* =============================================================================== */


  /**========================= Carrier Edit Point ============================= */
  function editCarrierBtn(e) {

    let baseE = e.srcElement.parentNode.parentNode.parentNode;
    if (e.srcElement.nodeName == 'I') {
      baseE = baseE.parentNode;
    }
    (<HTMLSelectElement>document.getElementById('n_carrier_id')).value = baseE.getElementsByClassName('new_carrier_id')[0].value;
    (<HTMLSelectElement>document.getElementById('n_carrier_name')).value = baseE.getElementsByClassName('new_carrier_name')[0].innerHTML;
   /*  (<HTMLSelectElement>document.getElementById('n_carrier_id')).disabled = true; */
    (<HTMLSelectElement>document.getElementById('n_carrier_name')).disabled = true;
    document.getElementById('add_new_carrier').style.display = 'none';
    document.getElementById('edit_new_carrier').style.display = 'block';
    console.log("BASE E");
    console.log(baseE);
    /* let selectedCarrierName:string = baseE.getElementsByClassName('new_carrier_name')[0].value;
    (<HTMLSelectElement>document.getElementById('carrierSelect')).innerHTML = "<option value="+ selectedCarrierName
                                                                                          +" selected disabled>"+selectedCarrierName+"</option>";

 */
    let details_block: HTMLElement = baseE.getElementsByClassName('carrier_details')[0];
    let days_block: any = details_block.children[0].children;
    let times_block: any = details_block.children[1].children;
    let days_array: string[] = [];
    let times_array: string[] = [];
    for (let i: number = 0; i < days_block.length; i++) {
      days_array.push(days_block[i].innerHTML);
      times_array.push(times_block[i].innerHTML);
    }
    let all_new_checkbox: any = document.getElementsByClassName("checkbox_new");
    for (let i: number = 0; i < all_new_checkbox.length; i++) {
      all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
      all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
      all_new_checkbox[i].checked = false;
    }
    for (let j: number = 0; j < days_array.length; j++) {
      for (let i: number = 0; i < all_new_checkbox.length; i++) {
        if (days_array[j] == all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('form-check-label')[0].innerHTML) {
          all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = times_array[j];
          all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = false;
          all_new_checkbox[i].checked = true;
        }
      }
    }
    document.getElementById('edit_new_carrier').addEventListener('click', (e) => {

      let carrierId: string = (<HTMLSelectElement>document.getElementById('n_carrier_id')).value;
      let car_name: string = (<HTMLSelectElement>document.getElementById('n_carrier_name')).value;
      if (carrierId.length == 0 || car_name.length == 0) {
        snackbar("Enter valid entries");
      }
      else {
        let all_new_checkbox: any = document.getElementsByClassName("checkbox_new");
        let day_array: string[] = [];
        let time_array: string[] = [];
        let i: number = 0
        for (; i < all_new_checkbox.length; i++) {
          if (all_new_checkbox[i].checked) {
            //console.log(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
            time_array.push(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
            day_array.push(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('form-check-label')[0].innerHTML);
            all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
            all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
          }
          all_new_checkbox[i].checked = false;
        }
        if (i == all_new_checkbox.length && (day_array.length == 0 || time_array.length == 0)) {
          // console.log(day_array);
          // console.log(time_array);
          // snackbar("Enter valid entries 2");
        }
        else {
          console.log(time_array, day_array);
          const params = new URLSearchParams();
          params.append('PropertyId', propertyId);
          params.append('CarrierId', carrierId);
          for (let i: number = 0; i < day_array.length; i++) {
            params.append('Days', day_array[i]);
            params.append('Time', time_array[i]);
          }
          axios({
            method: 'POST',
            url: 'http://localhost:8080/editCarrier',
            data: params
          }).then((response) => {
            let carrier_array: any = [...response.data];
            carrier_array.sort(ObjComp);
            console.log(carrier_array);
            let carrier_array_length: number = carrier_array.length
            document.getElementById('new_carrier_data').innerHTML = "";

            if (carrier_array_length != 0) {
              let cur_cid: number = carrier_array[0].carrierId;
              let cur_cname = carrier_array[0].carrierName;
              let carrier_card_array: any = [{ 'deliveryDay': carrier_array[0].deliveryDay, 'deliveryTime': carrier_array[0].deliveryTime }]
              for (let i: number = 1; i < carrier_array_length; i++) {
                if (carrier_array[i].carrierId != cur_cid) {
                  let carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
                  let key: string = carrier.createCard();
                  let edit_button: HTMLElement = document.querySelector('.' + key + ' .carrier_edit_btn');
                  let delete_button: HTMLElement = document.querySelector('.' + key + ' .carrier_delete_btn');
                  edit_button.addEventListener('click', function (e) {
                    editCarrierBtn(e);
                  });
                  delete_button.addEventListener('click', function (e) {
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
              let carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
              let key: string = carrier.createCard();
              let edit_button: HTMLElement = document.querySelector('.' + key + ' .carrier_edit_btn');
              let delete_button: HTMLElement = document.querySelector('.' + key + ' .carrier_delete_btn');
              edit_button.addEventListener('click', function (e) {
                editCarrierBtn(e);
              });
              delete_button.addEventListener('click', function (e) {
                deleteCarrierBtn(e);
              });
            }
          });
        };
      }
    });
  }

  /**============================ Carrier Delete =================================== */

  function deleteCarrierBtn(e) {
    let cardNode: HTMLElement = e.srcElement.parentNode.parentNode.parentNode;
    let carrierId = e.srcElement.parentNode.parentNode.parentNode.getElementsByClassName('new_carrier_id')[0].value;
    if (e.srcElement.nodeName == 'I') {
      cardNode = e.srcElement.parentNode.parentNode.parentNode.parentElement;
      carrierId = e.srcElement.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('new_carrier_id')[0].value;
    }

    let url2: string = 'http://localhost:8080/deleteCarrier?PropertyId=';
    url2 = url2.concat(propertyId);
    url2 = url2.concat('&CarrierId=' + carrierId);
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


  /* ========================== Object Sorter ================================== */

  function ObjComp(a, b) {
    if (a.carrierId < b.carrierId)
      return -1;
    else if (a.carrierId > b.carrierId)
      return 1;
    return 0;
  }

  /* ====================================== CARRIER API RETRIEVE =============================== */


  var url: string = 'http://localhost:8080/fetchCarrier?PropertyId=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {

    let carrier_array: any = [...response.data];
    carrier_array.sort(ObjComp);
    console.log(carrier_array);
    let carrier_array_length: number = carrier_array.length
    if (carrier_array_length != 0) {
      let cur_cid: number = carrier_array[0].carrierId;
      let cur_cname = carrier_array[0].carrierName;
      let carrier_card_array: any = [{ 'deliveryDay': carrier_array[0].deliveryDay, 'deliveryTime': carrier_array[0].deliveryTime }]

      for (let i: number = 1; i < carrier_array_length; i++) {
        if (carrier_array[i].carrierId != cur_cid) {
          let carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
          let key: string = carrier.createCard();
          let edit_button: HTMLElement = document.querySelector('.' + key + ' .carrier_edit_btn');
          let delete_button: HTMLElement = document.querySelector('.' + key + ' .carrier_delete_btn');
          edit_button.addEventListener('click', function (e) {
            editCarrierBtn(e);
          });
          delete_button.addEventListener('click', function (e) {
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
      let carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
      let key: string = carrier.createCard();
      let edit_button: HTMLElement = document.querySelector('.' + key + ' .carrier_edit_btn');
      let delete_button: HTMLElement = document.querySelector('.' + key + ' .carrier_delete_btn');
      edit_button.addEventListener('click', function (e) {
        editCarrierBtn(e);
      });
      delete_button.addEventListener('click', function (e) {
        deleteCarrierBtn(e);
      });
    }
  }).catch(function (error) {
    console.log(error);
  });

  /**================================= CheckBox-EventListener ======================================= */

  let all_new_checkbox: any = document.getElementsByClassName("checkbox_new");
  for (let i: number = 0; i < all_new_checkbox.length; i++) {
    all_new_checkbox[i].checked = false;
    all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = ""
    all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
    all_new_checkbox[i].addEventListener('change', (e) => {
      e.srcElement.parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = ""
      e.srcElement.parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = !e.srcElement.parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled;
    })
  }
  

  /**================================= ADD NEW CARRIER ====================================================== */

  document.getElementById('new_carrier_btn').addEventListener('click', () => {

    /* (<HTMLSelectElement>document.getElementById('n_carrier_id')).disabled = false; */
    (<HTMLSelectElement>document.getElementById('n_carrier_name')).disabled = false;
    
    let carrierSelect:string = `<option value="" selected disabled>Choose carrier</option>`;
    var url: string = 'http://localhost:8080/allCarrier';
    axios.get(url).then(function (response) {
      console.log(response.data);
      for (var i: number = 0; i < response.data.length; i++) {
        carrierSelect += ` <option value="${response.data[i]}">${response.data[i]}</option>`
      }      
      (<HTMLSelectElement>document.getElementById('n_carrier_name')).innerHTML = carrierSelect;
    }).catch(function (error) {
      console.log(error);
    });


    document.getElementById('add_new_carrier').style.display = 'block';
    document.getElementById('edit_new_carrier').style.display = 'none';
    /* (<HTMLSelectElement>document.getElementById('n_carrier_id')).value = ""; */
    (<HTMLSelectElement>document.getElementById('n_carrier_name')).value = "";
    let all_new_checkbox: any = document.getElementsByClassName("checkbox_new");
    for (let i: number = 0; i < all_new_checkbox.length; i++) {
      all_new_checkbox[i].checked = false;
      all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = ""
      all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
    }
  });

  document.getElementById('add_new_carrier').addEventListener('click', (e) => {
    let carrierId: string = (<HTMLSelectElement>document.getElementById('n_carrier_id')).value;
    let car_name: string = (<HTMLSelectElement>document.getElementById('n_carrier_name')).value;
    if (carrierId.length == 0 || car_name.length == 0) {
      snackbar("Enter valid entries");
    }
    else {
      let all_new_checkbox: any = document.getElementsByClassName("checkbox_new");
      let day_array: string[] = [];
      let time_array: string[] = [];
      for (let i: number = 0; i < all_new_checkbox.length; i++) {
        if (all_new_checkbox[i].checked) {
          //console.log(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
          time_array.push(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value);
          day_array.push(all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('form-check-label')[0].innerHTML);
          all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].value = "";
          all_new_checkbox[i].parentNode.parentNode.getElementsByClassName('carrier_time')[0].disabled = true;
        }
        all_new_checkbox[i].checked = false;
      }
      if (day_array.length == 0 || time_array.length == 0) {
        snackbar("Enter valid entries");
      }
      else {
        const params = new URLSearchParams();
        params.append('PropertyId', propertyId);
        params.append('CarrierId', carrierId);
        params.append('CarrierName', car_name);
        for (let i: number = 0; i < day_array.length; i++) {
          params.append('Days', day_array[i]);
          params.append('Time', time_array[i]);
        }
        axios({
          method: 'POST',
          url: 'http://localhost:8080/saveCarrier',
          data: params
        }).then((response) => {
          if (response.data == "FAILED") {
            snackbar("Oops!! Something went wrong. Check your entries ", 4000)
          }
          else {
            let carrier_array: any = [...response.data];
            let carrier_array_length: number = carrier_array.length
            if (carrier_array_length != 0) {
              let cur_cid: number = carrier_array[0].carrierId;
              let cur_cname = carrier_array[0].carrierName;
              let carrier_card_array: any = [{ 'deliveryDay': carrier_array[0].deliveryDay, 'deliveryTime': carrier_array[0].deliveryTime }]
              for (let i: number = 1; i < carrier_array_length; i++) {
                carrier_card_array.push({ 'deliveryDay': carrier_array[i].deliveryDay, 'deliveryTime': carrier_array[i].deliveryTime });
              }
              let carrier = new Carrier(cur_cid, cur_cname, carrier_card_array);
              let key: string = carrier.createCard();
              let edit_button: HTMLElement = document.querySelector('.' + key + ' .carrier_edit_btn');
              let delete_button: HTMLElement = document.querySelector('.' + key + ' .carrier_delete_btn');
              edit_button.addEventListener('click', function (e) {
                editCarrierBtn(e);
              });
              delete_button.addEventListener('click', function (e) {
                deleteCarrierBtn(e);
              });
              greenSnackbar("Added Successfully");
            }
            else {
              snackbar("Oops!! Something went wrong")
            }
          }
        });

        /* (<HTMLSelectElement>document.getElementById('n_carrier_id')).value = ""; */
        (<HTMLSelectElement>document.getElementById('n_carrier_name')).value = "";
      }
    }
  })


  let analyse = document.getElementById("analyse-btn");
  analyse.onclick = function () {
    window.open('index3.html');
  }


};

