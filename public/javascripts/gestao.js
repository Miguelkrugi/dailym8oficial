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

    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('tipoestabelecimento').style.visibility = "visible";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  
    document.getElementById('informacoesdiv').style.visibility = "hidden";

   // getAleatorioRestaurantes();



}

async function myFavoritos(){

    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "visible";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";

}

async function myReservas(){

    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "visible";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
   
  }

  async function myAccount(){

    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "visible";
    document.getElementById('textominhacontainformacoes').style.visibility = "visible";
    document.getElementById('informacoesdiv').style.visibility = "visible";
  
  }

  async function myRestaurantes(){

    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
  
  }

  async function myAcomodacoes(){

    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    console.log("new chamada");
  
  }

  async function myEstacionamentos(){

    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
  
    console.log("chamada");
  }

  async function myAllEstabelecimentos(){

    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
  
    console.log("chamada");
  }