import axios from 'axios'

class Unit{
  pId:number;
  uId:number;
  uName:string;
  constructor(pId:number, uId:number, uName:string){
    this.pId = pId;
    this.uId = uId;
    this.uName = uName;
  }
  createList():void{
    var st:string;
    st = "<div class='card border-3' style='width: 18rem;margin:1%;'><div class='card-body'><h5 class='card-title'>";
    st = st.concat(this.uName);
    st = st.concat("</h5><h6 class='card-subtitle mb-2 text-muted'>");
    st = st.concat(this.uId.toString());
    st = st.concat(`</h6><button type='button' class='btn btn-outline-secondary edit_unit_data' data-toggle="modal" data-placement="bottom" data-target="#editUnit" title='Edit Details'>
                        <i class='fa fa-edit'></i></button>&nbsp;&nbsp;
                        <button type="button" class="btn btn-outline-danger delete_unit_data" data-toggle="tooltip" data-placement="bottom" title="Delete Unit">
                        <i class="fa fa-trash" aria-hidden="true"></i></button></div></div>`);
    //console.log(st);
    document.getElementById('new_units_data').innerHTML += st;

    

  }
};


window.onload = function(){

  var propertyId = localStorage.getItem("Property_id");
  console.log(propertyId);
  console.log("HIIII");

  /* ================================ FETCH PROPERTY DETAILS =============================== */
  var url:string = 'http://localhost:8080/fetch_details?P_id=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {
      console.log(response.data);    
      document.getElementById('p_name').innerHTML = response.data.p_name;
      document.getElementById('p_address').innerHTML = response.data.p_address;
    }).catch(function (error) {
      console.log(error);
    });


  /* ===================== EDIT UNIT DETAILS ================= */
  function setunitData(e){
    console.log(e);
    console.log(e.srcElement);
    console.log(e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML);
    console.log(e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML);
    //console.log("UNITS: "+ e.srcElement.previousElementSibling.previousElementSibling.innerHTML);
    //console.log("UNITS: "+ e.srcElement.previousElementSibling.innerHTML);
    var uid = e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML;
    var uname = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    ( < HTMLSelectElement > document.getElementById('edit_unit_id')).value = uid;
    ( < HTMLSelectElement > document.getElementById('edit_unit_name')).value = uname;

  }

  /* ===================== DELETE UNIT DETAILS ================= */

  function deleteUnitData(e){

    console.log("DELETE: "+ e.srcElement.previousElementSibling.previousElementSibling.innerHTML);
    var u_id = e.srcElement.previousElementSibling.previousElementSibling.innerHTML;
    var url2:string = 'http://localhost:8080/delete_unit?U_Id=';
    url2 = url2.concat(u_id);

    axios.delete(url2).then(function (response) {
      console.log("DELETE REQUEST SENT");
      console.log(response.data);

       document.getElementById('new_units_data').innerHTML = "";
        var url:string = 'http://localhost:8080/getallunits?PId=';
        url = url.concat(propertyId);

        axios.get(url).then(function (response) {
            console.log(response.data);           
              for (var i:number = 0; i < response.data.length; i++) {
              let p = new Unit(response.data[i].p_id,response.data[i].u_id, response.data[i].u_name);
              p.createList();
            } 
        }).catch(function (error) {
          console.log(error);
        });
      
    }).catch(function (error) {
      console.log(error);
    });
  }


    /* ======================== RETRIEVE ALL UNITS DATA ================================== */
  var url:string = 'http://localhost:8080/getallunits?PId=';
  url = url.concat(propertyId);
  axios.get(url).then(function (response) {
    console.log(response.data);           
      for (var i:number = 0; i < response.data.length; i++) {
      let p = new Unit(response.data[i].p_id,response.data[i].u_id, response.data[i].u_name);
      p.createList();
    } 
  }).catch(function (error) {
    console.log(error);
  }).then(()=>{
    /* ==== EDIT UNIT DETAILS ======== */
    var all_edit_buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.edit_unit_data');
    console.log("imhere")
    for(var i:number = 0; i< all_edit_buttons.length; i++)
    {
      all_edit_buttons[i].onclick = setunitData;
    }

    /* ==== DELETE UNIT DETAILS ======== */
    var all_delete_buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.delete_unit_data');
    for(var j:number = 0; j< all_delete_buttons.length; j++)
    {
      all_delete_buttons[j].onclick = deleteUnitData;
    }
    
  });

};

