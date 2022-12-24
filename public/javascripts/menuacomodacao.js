function createacomodacaoHTML(acom){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<hr><div class='menu_item'><em>Preço: " + acom.acomodacao_price + " $</em><h4>" + acom.acomodacao_type_name + "</h4><p>Descrição: " + acom.acomodacao_description + "| Linha: " + acom.position_line + " | Coluna: " + acom.position_column +  "</p></div><hr>"
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }

async function getAcomodacoes(equipment_service_id){

    console.log("Obtendo os servicos por numero de acomodacoes decrescente")
    
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize13");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let randomservices = await $.ajax({
    
    url: "/users/getacomodacoes/" + equipment_service_id,
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(randomservices));
    
    let html = "";
    
    for(let service of randomservices){
     console.log("Service: " + service);
     html += createacomodacaoHTML(service);
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     restaurantesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }

}


window.onload = function exampleFunction() {

    var utilizador_id = sessionStorage.getItem("utilizador_id")
    var utilizador_name = sessionStorage.getItem("utilizador_name");
    let utilizador_username = sessionStorage.getItem("utilizador_username");
    var utilizador_email = sessionStorage.getItem("utilizador_email");
    var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

 var establishment_id = sessionStorage.getItem('establishment_id');
 var establishment_name = sessionStorage.getItem('establishment_name');
 var establishment_description = sessionStorage.getItem('establishment_description');
 var equipment_service_id = sessionStorage.getItem('equipment_service_id');
 var number_acomodacoes = sessionStorage.getItem('number_acomodacoes');
 var establishment_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
 var type_service_identifier = sessionStorage.getItem('type_service_identifier');
 


 var local_id = sessionStorage.getItem('local_id');
 var local_morada = sessionStorage.getItem('local_morada');
 var ref_system_id = sessionStorage.getItem('ref_system_id');
 var geometry_info_id = sessionStorage.getItem('geometry_info_point');
 var local_servico_acomodacoes_id = sessionStorage.getItem('local_servico_acomodacoes_id');
 var local_latitude = sessionStorage.getItem('local_latitude');
 var local_longitude = sessionStorage.getItem('local_id');
 var state_id = sessionStorage.getItem('state_id');



    console.log('The Script will load now.');

    console.log("A chamar a funcao");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);

    console.log("RESTAURANTE NAME: " + establishment_name);
    console.log("RESTAURANTE ID: " + establishment_id);
    console.log("REST DEFINITIVO ID: " + equipment_service_id);
    console.log("DESCRIPTION RESTAURANTE: " + establishment_description);
    console.log("LATITUDE: " + local_latitude);
    console.log("LONGITUDE: " + local_longitude);
  
 //document.getElementById("titulorestaurante").innerHTML = establishment_name;

 //document.getElementById("descricaorestaurante").innerHTML = establishment_description;

 getAcomodacoes(equipment_service_id);

}