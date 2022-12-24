window.onload = function exampleFunction() {
    console.log('The Script will load now.');
  
    var utilizador_id = sessionStorage.getItem("utilizador_id")
    var utilizador_name = sessionStorage.getItem("utilizador_name");
    let utilizador_username = sessionStorage.getItem("utilizador_username");
    var utilizador_email = sessionStorage.getItem("utilizador_email");
    var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);
   
    substituteFields(utilizador_name, utilizador_username, utilizador_email);

}

function substituteFields(utilizador_name, utilizador_username, utilizador_email){

    document.getElementById("nomeuser").innerHTML = "" + utilizador_name;
    document.getElementById("usernameuser").innerHTML = "" + utilizador_username;
    document.getElementById("emailuser").innerHTML = "" + utilizador_email;

}