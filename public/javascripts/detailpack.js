



window.onload = function exampleFunction() {

    var utilizador_id = sessionStorage.getItem("utilizador_id")
    var utilizador_name = sessionStorage.getItem("utilizador_name");
    let utilizador_username = sessionStorage.getItem("utilizador_username");
    var utilizador_email = sessionStorage.getItem("utilizador_email");
    var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

 var establishment_id = sessionStorage.getItem('establishment_id');
 var establishment_name = sessionStorage.getItem('establishment_name');
 var establishment_description = sessionStorage.getItem('establishment_description');
 var restaurant_id = sessionStorage.getItem('restaurant_id');
 var restaurante_number_tables = sessionStorage.getItem('restaurante_number_tables');
 var establishment_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
 var type_service_identifier = sessionStorage.getItem('type_service_identifier');
 var type_restaurant_id = sessionStorage.getItem('type_restaurant_id');
 var type_restaurant_name = sessionStorage.getItem('type_restaurant_name');
 var state_id = sessionStorage.getItem('state_id');

    console.log('The Script will load now.');

    console.log("A chamar a funcao");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);

    console.log("RESTAURANTE NAME: " + establishment_name);
    console.log("RESTAURANTE ID: " + establishment_id);
    console.log("REST DEFINITIVO ID: " + restaurant_id);
    console.log("DESCRIPTION RESTAURANTE: " + establishment_description);
    console.log("STATE ID: " + state_id);
  
 document.getElementById("titulorestaurante").innerHTML = establishment_name;

 document.getElementById("descricaorestaurante").innerHTML = establishment_description;

 getMesasFromPack(pack_id);

 getAcomodacaoFromPackRestaurante(pack_id);

  

}