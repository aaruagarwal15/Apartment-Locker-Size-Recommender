import axios from 'axios'
import { snackbar, greenSnackbar } from '../UIComponenets/Snackbars';


class Unit {
    propertyId: number;
    unitNumber: number;
    buildingNumber: number;
    constructor(propertyId: number, unitNumber: number, buildingNumber: number) {
        this.propertyId = propertyId;
        this.unitNumber = unitNumber;
        this.buildingNumber = buildingNumber;
    }
    createList(): string {
        var key: string = 'a' + Math.random().toString(36).slice(2);
        let card = document.createElement('div');
        let card_html = "<div class='card-body'><h5 class='card-title'>" + "Unit Number: " + this.unitNumber + "</h5><h6 class='card-subtitle mb-2 text-muted'>" + "Building Number: " + this.buildingNumber + "</h6>" +
            "<button type='button' class='btn btn-outline-danger delete_unit_data' data-toggle='tooltip' data-placement='bottom' title='Delete Unit'><i class='fa fa-trash' aria-hidden='true'></i></button></div>"
        card.innerHTML = card_html
        card.classList.add(key)
        card.classList.add("card")
        card.classList.add("border-3")
        card.setAttribute('style', 'min-width: 18rem;margin:1%;')
        document.getElementById('new_units_data').appendChild(card);

        return key;

    }
};

/* ==================================== ADD NEW UNIT ========================================== */

export function newUnitHandler(propertyId) {
    document.getElementById('add_new_unit').onclick = function () {
        const params = new URLSearchParams();
        var unitNumber: string = (<HTMLSelectElement>document.getElementById('new_unit_number')).value;
        var buildingNumber: string = (<HTMLSelectElement>document.getElementById('new_building_number')).value;

        if (buildingNumber != "" && unitNumber != "") {
            params.append('PropertyId', propertyId);
            params.append('UnitNumber', unitNumber);
            params.append('BuildingNumber', buildingNumber);

            axios({
                method: 'POST',
                url: 'http://localhost:8080/saveUnit',
                data: params
            }).then(function (response) {
                if (response.data == "FAILED") {
                    snackbar("Enter Valid Entries");
                }
                else {
                    let p = new Unit(response.data.propertyId, response.data.unitNumber, response.data.buildingNumber);
                    let key: string = p.createList();
                    /* let edit_button: HTMLElement = document.querySelector('.' + key + ' .edit_unit_data'); */
                    let delete_button: HTMLElement = document.querySelector('.' + key + ' .delete_unit_data');
                    /*  edit_button.addEventListener('click', function (e) {
                       setunitData(e);
                     }); */
                    delete_button.addEventListener('click', function (e) {
                        deleteUnitData(e, propertyId);
                    });
                    (<HTMLSelectElement>document.getElementById('new_unit_number')).value = "";
                    (<HTMLSelectElement>document.getElementById('new_building_number')).value = "";
                    greenSnackbar("Unit added successfully!")
                }

            }).catch(function (error) {
                //console.log(error);
                snackbar("Oops!! Something went wrong. Please try again later.");
            });
        }
        else {
            snackbar("Fields cannot be empty");
        }

    }
}

/* ===================== DELETE UNIT DETAILS ================= */

export function deleteUnitData(e, propertyId) {

    let cardNode: HTMLElement = e.srcElement.parentNode.parentNode;
    e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML.substring(13)
    let unitNumber = e.srcElement.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML.substring(13);
    let buildingNumber = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML.substring(17);

    if (e.srcElement.nodeName == 'I') {
        cardNode = e.srcElement.parentNode.parentNode.parentElement;
        unitNumber = e.srcElement.parentNode.parentNode.parentNode.getElementsByTagName('h5')[0].innerHTML;
        buildingNumber = e.srcElement.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML;
    }
    let url2: string = 'http://localhost:8080/deleteUnit?unitNumber=';
    url2 = url2.concat(unitNumber);
    url2 = url2.concat("&buildingNumber=");
    url2 = url2.concat(buildingNumber);
    url2 = url2.concat("&propertyId=");
    url2 = url2.concat(propertyId);

    axios.delete(url2).then(function (response) {
        if (response.data.toString() == "SUCCESS") {
            cardNode.parentElement.removeChild(cardNode);
            greenSnackbar("Successfully deleted.")
        }
        else {
            snackbar("Oops Something went wrong. Please Try againg after sometime.", 4000);
        }
    }).catch(function (error) {
        snackbar("Oops!! Something went wrong. Please try again later.");
        //console.log(error);
    });
}

/* ======================== RETRIEVE ALL UNITS DATA ================================== */
export function createUnitCard(propertyId) {
    var url: string = 'http://localhost:8080/getallunits?propertyId=';
    url = url.concat(propertyId);
    //console.log(propertyId);
    axios.get(url).then(function (response) {
        //console.log(response.data, "---");
        for (var i: number = 0; i < response.data.length; i++) {
            let p = new Unit(response.data[i].propertyId, response.data[i].unitNumber, response.data[i].buildingNumber);
            let key: string = p.createList();
            /* let edit_button: HTMLElement = document.querySelector('.' + key + ' .edit_unit_data'); */
            let delete_button: HTMLElement = document.querySelector('.' + key + ' .delete_unit_data');
            /* edit_button.addEventListener('click', function (e) {
              setunitData(e);
            }) */
            delete_button.addEventListener('click', function (e) {
                deleteUnitData(e, propertyId);
            })
        }
    }).catch(function (error) {
        snackbar("Oops!! Something went wrong. Please try again later.", 5000);
        //console.log(error);
    });


}


export default Unit;