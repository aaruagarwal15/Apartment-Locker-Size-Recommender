(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
