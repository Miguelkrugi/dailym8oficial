window.onload = function(){

const date = new Date();

const hours = date.getHours();

const minutes = date.getMinutes();

const seconds = date.getSeconds();

document.getElementById("tempohours").innerHTML = "" + hours + ":" + minutes + ":" + seconds;

}