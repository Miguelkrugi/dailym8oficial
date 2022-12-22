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

    
   document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Restaurante"
   document.getElementById('numeromesastexto').innerHTML = "Número de Mesas"

   document.getElementById('numeromesasinput').style.visibility = "visible"

    document.getElementById('numeroacomodacoesinput').style.visibility = "hidden"

    document.getElementById('numerolugaresinput').style.visibility = "hidden"
   
   
   // getAleatorioRestaurantes();

}

function createRestaurante() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Restaurante"

    document.getElementById('numeromesastexto').innerHTML = "Número de Mesas"

    document.getElementById('numeromesasinput').style.visibility = "visible"

    document.getElementById('numeroacomodacoesinput').style.visibility = "hidden"

    document.getElementById('numerolugaresinput').style.visibility = "hidden"

}

function createAcomodacao() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Serviço de Acomodação"

    document.getElementById('numeromesastexto').innerHTML = "Número de Acomodações"

    document.getElementById('numeromesasinput').style.visibility = "hidden"

    document.getElementById('numeroacomodacoesinput').style.visibility = "visible"

    document.getElementById('numerolugaresinput').style.visibility = "hidden"

}

function createEstacionamento() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Estacionamento"

    document.getElementById('numeromesastexto').innerHTML = "Número de Lugares"

    document.getElementById('numeromesasinput').style.visibility = "hidden"

    document.getElementById('numeroacomodacoesinput').style.visibility = "hidden"

    document.getElementById('numerolugaresinput').style.visibility = "visible"

}
