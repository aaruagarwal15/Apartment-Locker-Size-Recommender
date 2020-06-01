/* import axios from 'axios'

window.onload = function(){

    var propertyId = localStorage.getItem("Property_id");
    console.log("carrier" +propertyId);
    console.log("HIIII from carrier");

    var url:string = 'http://localhost:8080/fetch_carrier?PId=';
    url = url.concat(propertyId);
    axios.get(url).then(function (response) {
        console.log("CARRIER");
        console.log(response.data);           
    }).catch(function (error) {
        console.log(error);
    });

};
 */