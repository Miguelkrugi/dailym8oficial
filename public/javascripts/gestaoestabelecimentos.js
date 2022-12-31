async function myAccountUtilizador(id){

  console.log("ID DO UTILIZADOR: " + id);

  try{
  
    let suggestedrestaurants = await $.ajax({
    
    url: "/users/getinformacao/" + id,
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
    
  
  
    document.getElementById("nomeuser").innerHTML = "Nome: " + suggestedrestaurants[0].utilizador_name;

    document.getElementById("usernameuser").innerHTML = "Username: " + suggestedrestaurants[0].utilizador_username;

    document.getElementById("emailuser").innerHTML = "Email: " + suggestedrestaurants[0].utilizador_email;
    
    
    } catch(err){
     console.log(err);
    }

}


function createreservaacomodacaoHTML(reserva){
  
  console.log("Função chamada para criar o div da acomodação");
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 70%; height:26%; position: absolute;'><h3 id='restaurantname' style='margin-left: 1.6%; font-size: 27px;'>Numero da Mesa: " + reserva.acomodacao_number + "</h3><h3 id='createdbyname' style='margin-left: 1.6%; margin-top: -1.6%;'>Restaurante: " + reserva.establishment_name + "</h3><h3 id='dataname' style='margin-left: 1.6%; margin-top: -1.6%;'>Data da Reserva: " + reserva.date_marcada_reservation + "</h3><h3 id='moradaname' style='margin-left: 1.6%; margin-top: -1.6%;'>Morada: " + reserva.local_morada + "</h3><h3 id='tipomesaname' style='margin-left: 1.6%; margin-top: -1.6%;'>Tipo de Acomodação: " + reserva.mesa_type_name + " | Linha: " + reserva.position_line + " | Coluna: " + reserva.position_column + "</h3><h3 id='tipomesaname' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço da Reserva: " + reserva.acomodacao_price + "</h3><button id='colocarsobanalise' style='margin-left: 80%; margin-top: -4.8%; position: absolute;'>CANCELAR RESERVA</button></div>" 
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getMyReservasAcomodacoes(id_user){

  console.log("Obtendo os restaurantes");
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("organize16");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/get/myreservas/acomodacao/" + id_user,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
  
  let html = "";
  
   

      for(let restaurant of suggestedrestaurants){
       console.log("Restaurante: " + restaurant);
       html += createreservaacomodacaoHTML(restaurant);
      }

    

      console.log("NADA ENCONTRADO");

    


  //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
   // console.log("NADA ENCONTRADO");

  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

   restaurantesElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }

/////////////////////// MINHAS RESERVAS - AINDA N FOI APLICADO //////////////////////


function createreservamesaHTML(reserva){
  
  console.log("Função chamada para criar o div da acomodação");
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 70%; height:26%; position: absolute;'><h3 id='restaurantname' style='margin-left: 1.6%; font-size: 27px;'>Numero da Mesa: " + reserva.mesa_number + "</h3><h3 id='createdbyname' style='margin-left: 1.6%; margin-top: -1.6%;'>Restaurante: " + reserva.establishment_name + "</h3><h3 id='dataname' style='margin-left: 1.6%; margin-top: -1.6%;'>Data da Reserva: " + reserva.date_marcada_reservation + "</h3><h3 id='moradaname' style='margin-left: 1.6%; margin-top: -1.6%;'>Morada: " + reserva.local_morada + "</h3><h3 id='tipomesaname' style='margin-left: 1.6%; margin-top: -1.6%;'>Tipo de Mesa: " + reserva.mesa_type_name + "</h3><h3 id='tipomesaname' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço da Reserva: " + reserva.mesa_price + "</h3><button id='colocarsobanalise' style='margin-left: 80%; margin-top: -4.8%; position: absolute;'>CANCELAR RESERVA</button></div>" 
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}



async function getMyReservasRestaurantes(id_user){

  console.log("Obtendo os restaurantes");
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("organize16");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/get/myreservas/restaurant/" + id_user,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
  
  let html = "";
  
   

      for(let restaurant of suggestedrestaurants){
       console.log("Restaurante: " + restaurant);
       html += createreservamesaHTML(restaurant);
      }

    

      console.log("NADA ENCONTRADO");

    


  //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
   // console.log("NADA ENCONTRADO");

  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

   restaurantesElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }

/////////////////// FAVORITOS ACOMODACOES ///////////////////////

function createlikedacomodacaoHTML(servico_acomodacao){
  
  console.log("Função chamada para criar o div da acomodação");
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div  style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-acomodacao.html'  class='strip_info' onclick='openacomodacao(" + JSON.stringify(servico_acomodacao) + ")'><div class='item_title'  class='item'><h3>" + servico_acomodacao.establishment_name + "</h3><small>" + servico_acomodacao.number_acomodacoes + "</small></div></a></figure></div></div>"
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getLikedAcomodacao(id_user){

  console.log("Obtendo os restaurantes");
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("organize16");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/getfavoritoss/acomodacao/" + id_user,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
  
  let html = "";
  
   

      for(let restaurant of suggestedrestaurants){
       console.log("Restaurante: " + restaurant);
       html += createlikedacomodacaoHTML(restaurant);
      }

    

      console.log("NADA ENCONTRADO");

    


  //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
   // console.log("NADA ENCONTRADO");

  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

   restaurantesElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }

  

  async function criarPosicao(rest_id){

    try {
   
      console.log("FUNCAO CHAMADA E COM ID DE RESTAURANTE: " + rest_id);
     
      var restaurant_id = rest_id;

      console.log(document.getElementById("latitude").value);

      var stringforpoint = "POINT(" + document.getElementById("latitude").value + " " + document.getElementById("longitude").value + ")";

      console.log(stringforpoint);

      console.log(document.getElementById("locality").value);

      var locality = document.getElementById("locality").value;
      var latitude = document.getElementById("latitude").value;
      var longitude = document.getElementById("longitude").value;


     //console.log("LATITUDE: " + document.getElementById("latitude").value + "| " + "LONGITUDE: " + document.getElementById("longitude").value)
   
  console.log("A METER A DATA");
      let data = {
   
       local_morada: locality,
       ref_system_id: 4326,
       geometry_info_point: stringforpoint,
       local_restaurante_id: restaurant_id, //DEFAULT FOR NOW
       local_latitude: latitude,
       local_longitude: longitude
   
      }
   
      //ENVIAR METODO
      let newExercise = await $.ajax({
       url: "/users/insertnewposicao/",
       method: "post",
       data: JSON.stringify(data),
       contentType: "application/json",
       dataType: "json"
       });
   
  

     //  console.log("POSIÇÃO ADICIONADA!");

   
   
    } catch (err){
   
     window.alert("Receita Criada.");
   
    }
   
   
   
   }

  async function openrestaurant2(restaurante){

    console.log("FUNÇÃO CHAMADA!");
    console.log("NOME: " + restaurante.establishment_name)
      console.log("DESCRICAO: " + restaurante.establishment_description)
      console.log("ID: " + restaurante.restaurant_id)
      console.log("STATE ID: " + restaurante.state_id)
      
      sessionStorage.setItem('establishment_id', restaurante.establishment_id);
      sessionStorage.setItem('establishment_name', restaurante.establishment_name);
      sessionStorage.setItem('establishment_description', restaurante.establishment_description);
      sessionStorage.setItem('restaurant_id', restaurante.restaurant_id);
      sessionStorage.setItem('restaurante_number_tables', restaurante.restaurante_number_tables);
      sessionStorage.setItem('establishment_utilizador_id', restaurante.establishment_utilizador_id);
      sessionStorage.setItem('type_service_identifier', restaurante.type_service_identifier);
      sessionStorage.setItem('type_restaurant_id', restaurante.type_restaurant_id);
      sessionStorage.setItem('type_restaurant_name', restaurante.type_restaurant_name);
      sessionStorage.setItem('state_id', restaurante.state_id);
  
  
  }

  function openmodal(restaurante){
    console.log("chamada");

    sessionStorage.setItem('restaurant_id', restaurante.restaurant_id);
    document.querySelector('.bg-modal15').style.display = "flex";

    var rest_id = restaurante.restaurant_id;

    document.getElementById("botaounico").addEventListener("click", myFunction(rest_id));

// -> FUNCIONAL -> document.getElementById("placeidtext").innerHTML = "ID do Local: " + restaurante.restaurant_id; //FUNCIONAL
////////// BUTTON TO SAVE POSITION /////////



/*document.querySelector('.button200').addEventListener("click", function() {
		  
  console.log("BOTAO CLICADO");
    //criarPosicao(rest_id);
		  
});*/

    

    
  }

  

function myFunction(rest_id) {
  console.log(document.getElementById("latitude").value);

  console.log("REST: " + rest_id);
  criarPosicao(rest_id);
}



/////////////////// FAVORITOS RESTAURANTES //////////////////////

function createlikedrestaurantHTML(restaurante){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-restaurant.html' onclick='openrestaurant2(" + JSON.stringify(restaurante) + ")' class='strip_info' ><small>" + restaurante.type_restaurant_name + "</small><div class='item_title'><h3>" + restaurante.establishment_name + "</h3><small>" + restaurante.restaurante_number_tables + "</small></div></a></figure></div></div>"
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}
///////////////////////////////////////////////////////////////

function createallrestaurantesincompletosHTML(restaurante){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div   class='item' style='width:23%; height:35%;'><div class='strip'><figure><a class='strip_info' ><small>" + restaurante.type_restaurant_name + "</small><div class='item_title'><h3>" + restaurante.establishment_name + "</h3><small>" + restaurante.restaurante_number_tables + "</small></div><button id='button15' onclick='openmodal(" + JSON.stringify(restaurante) + ")'' style='margin-left: 6%; margin-top:15%;'>EDITAR LOCAL</button></a></figure></div></div>"
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getAlllRestaurants(id_user){

  console.log("Obtendo os restaurantes");
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("organize16");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/getincomplete/restaurante/" + id_user,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
  
  let html = "";
  
   

      for(let restaurant of suggestedrestaurants){
       console.log("Restaurante: " + restaurant);
       html += createallrestaurantesincompletosHTML(restaurant);
      }

    

      console.log("NADA ENCONTRADO");

    


  //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
   // console.log("NADA ENCONTRADO");

  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

   restaurantesElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }

async function getLikedRestaurants(id_user){

  console.log("Obtendo os restaurantes");
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("organize16");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/getfavoritos/restaurante/" + id_user,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
  
  let html = "";
  
   

      for(let restaurant of suggestedrestaurants){
       console.log("Restaurante: " + restaurant);
       html += createlikedrestaurantHTML(restaurant);
      }

    

      console.log("NADA ENCONTRADO");

    


  //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
   // console.log("NADA ENCONTRADO");

  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

   restaurantesElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }

///////////////////////// aACOMODACOES DO UTILIZADOR ///////////////////////////

function createacomodacaoHTML(servico_acomodacao){
  
  console.log("Função chamada para criar o div da acomodação");
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-restaurant.html' onclick='openacomodacao(" + JSON.stringify(servico_acomodacao) + ")' class='strip_info'><small>Rua: " + servico_acomodacao.local_morada + "</small><div class='item_title'><h3>Nome: " + servico_acomodacao.establishment_name + "</h3><small>Estado: " + servico_acomodacao.state_name + "</small></div></a></figure></div></div>"
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getMyAcomodacoes(id_user){

  document.getElementById('criarestabelecimentobutton').style.visibility = "visible";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Estabelecimentos";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    
    console.log("Obtendo os restaurantes");
  
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize16");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let suggestedrestaurants = await $.ajax({
    
    url: "/users/get/myestablishments/acomodacao/" + id_user,
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
    
    let html = "";
    
  
        for(let restaurant of suggestedrestaurants){
         console.log("Restaurante: " + restaurant);
         html += createacomodacaoHTML(restaurant);
        }
  
    //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
     // console.log("NADA ENCONTRADO");
  
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     restaurantesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }

    console.log("chamada");
  }

/////////////////////////////////////////////////////////////////////////////

/////////////////////// RESTAURANTES DO UTILIZADOR //////////////////////////

function createrestaurantHTML(restaurante){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='gestaorestaaurante.html' onclick='openrestaurant2(" + JSON.stringify(restaurante) + ")' class='strip_info'><small>Tipo: " + restaurante.type_restaurant_name + "</small><div class='item_title'><h3>Nome: " + restaurante.establishment_name + "</h3><small>Rua: " + restaurante.local_morada + "</small></div></a></figure></div></div>"
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function myAllEstabelecimentos(id_user){

  document.getElementById('criarestabelecimentobutton').style.visibility = "visible";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Estabelecimentos";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    
    console.log("Obtendo os restaurantes");
  
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize16");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let suggestedrestaurants = await $.ajax({
    
    url: "/users/get/myestablishments/restaurant/" + id_user,
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
    
    let html = "";
    
  
        for(let restaurant of suggestedrestaurants){
         console.log("Restaurante: " + restaurant);
         html += createrestaurantHTML(restaurant);
        }
  
    //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
     // console.log("NADA ENCONTRADO");
  
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     restaurantesElem.innerHTML = "" + html;
    
    
    } catch(err){
     console.log(err);
    }

    console.log("chamada");
  }

////////////////////////// SAVE A POSITION TO AN EXISTING PLACE ////////////////////////////

async function criarPlate(rest_id, tipo_prato_id){

  var value_for_availability = 2;

  if(document.getElementById("platedisponibilidadeinput").value == "Sim"){

    value_for_availability = 0;

  } else if(document.getElementById("platedisponibilidadeinput").value == "Não"){

    value_for_availability = 1;
  } else {

    console.log("Nada selecionado!")
  }



  try {
 
   
   var restaurant_id = rest_id;
 

    let data = {
 
     plate_name: document.getElementById("platenameinput").value,
     plate_price: document.getElementById("plateprecoinput").value,
     plate_restaurant_id: restaurant_id,
     plate_availability: value_for_availability, //DEFAULT FOR NOW
     plate_type_identifier: tipo_prato_id,
     plate_type_description: document.getElementById("platedescricaoinput").value
 
    }
 
    //ENVIAR METODO
    let newExercise = await $.ajax({
     url: "/users/insertplate/",
     method: "post",
     data: JSON.stringify(data),
     contentType: "application/json",
     dataType: "json"
     });
 
     location.reload();
    // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
 
 
  } catch (err){
 
   window.alert("Receita Criada.");
 
  }
 }

////////////////////////////////////////////////////////////////////////////////////////////


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
   

  
  
  
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  
    document.getElementById('informacoesdiv').style.visibility = "hidden";
   // document.getElementById('tipocliente').style.visibility = "hidden";
   // getAleatorioRestaurantes();

   myAllEstabelecimentos(utilizador_id);

//////////////// MENU SIDEBAR OPTIONS ////////////////

document.getElementById('alloption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  myAllEstabelecimentos(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Estabelecimentos";
  document.getElementById("criarestabelecimentobutton").style.visibility = "visible";


});

document.getElementById('resteoption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  myAllEstabelecimentos(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Restaurantes";
 
});

document.getElementById('acomodacaooption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getMyAcomodacoes(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById("criarestabelecimentobutton").style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Acomodações";


});

document.getElementById('favoritosoption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getLikedRestaurants(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "visible";
  document.getElementById("criarestabelecimentobutton").style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Favoritos";


});

document.getElementById('incompletosoption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getAlllRestaurants(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "visible";
  document.getElementById("criarestabelecimentobutton").style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Estabelecimentos Incompletos";


});

document.getElementById('reservasoption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getMyReservasRestaurantes(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentoreservas').style.visibility = "visible";
  document.getElementById("criarestabelecimentobutton").style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Reservas";


});

document.getElementById('todosoption3').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getMyReservasRestaurantes(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentoreservas').style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Reservas - Restaurantes";


});


document.getElementById('resteoption3').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getMyReservasRestaurantes(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentoreservas').style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Reservas - Restaurantes";


});

document.getElementById('acomoption3').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getMyReservasAcomodacoes(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentoreservas').style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Reservas - Acomodações";


});

//////////////// FILTER FAVORITOS ////////////////

document.getElementById('todosoption2').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getLikedRestaurants(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Favoritos";
  

});

document.getElementById('resteoption2').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getLikedRestaurants(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Favoritos";
  

});

document.getElementById('acomoption2').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  getLikedAcomodacao(utilizador_id);
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('tipoestabelecimentofavoritos').style.visibility = "visible";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Favoritos";
  

});

//////////////////////////////////////////////////////

   document.getElementById('acomoption').addEventListener("click", function(){

    console.log("USER ID: " + utilizador_id)
    document.getElementById("organize16").style.visibility = "visible";
    getMyAcomodacoes(utilizador_id);


 });

 document.getElementById('todosoption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById("criarestabelecimentobutton").style.visibility = "visible";
  myAllEstabelecimentos(utilizador_id);


});

document.getElementById('restoption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  document.getElementById("organize16").style.visibility = "visible";
  document.getElementById("criarestabelecimentobutton").style.visibility = "visible";
  myAllEstabelecimentos(utilizador_id);


});

document.getElementById('myaccountoption').addEventListener("click", function(){

  console.log("USER ID: " + utilizador_id)
  document.getElementById("organize16").style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Informações";
  document.getElementById("informacoesdiv").style.visibility = "visible";
  document.getElementById("criarestabelecimentobutton").style.visibility = "hidden";
  myAccountUtilizador(utilizador_id);


});


  
}






async function myFavoritos(){

  document.getElementById('criarestabelecimentobutton').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Favoritos";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    document.getElementById('tipocliente').style.visibility = "hidden";

}

async function myReservas(){

  document.getElementById('criarestabelecimentobutton').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Reservas";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    document.getElementById('tipocliente').style.visibility = "hidden";
   
  }

  async function myAccount(){

    document.getElementById('criarestabelecimentobutton').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Minha Conta";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "visible";
    document.getElementById('informacoesdiv').style.visibility = "visible";
    document.getElementById('organizeitems').style.visibility = "hidden";
    document.getElementById('tipocliente').style.visibility = "hidden";
  
  }

  async function myRestaurantes(){

    document.getElementById('criarestabelecimentobutton').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Restaurantes";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
  
  }

  async function myAcomodacoes(){

    document.getElementById('criarestabelecimentobutton').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Acomodações";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    console.log("new chamada");
  
  }

  async function myEstacionamentos(){

    document.getElementById('criarestabelecimentobutton').style.visibility = "hidden";
    document.getElementById('criarestabelecimentobutton').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Estacionamentos";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
  
    console.log("chamada");
  }

 