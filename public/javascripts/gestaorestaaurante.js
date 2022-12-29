function createtableHTML(mesa){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:23%; position: absolute;'><h3 id='mesanumbername' style='margin-left: 1.6%; font-size: 27px;'>" + mesa.mesa_number + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + mesa.mesa_price + "</h3><h3 id='precoetiponame' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço: <i>" + mesa.mesa_size + "</i> | Tipo: <i>" + mesa.mesa_type_name + "</i></h3><button style='margin-left:50%; margin-top: -5%; position: absolute;' id='button9'>ELIMINAR MESA</button></div>";
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getMesas(id_restaurante){
  
  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeinforestauranttables"); //VERIFICAR O ID
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/gettables/" + id_restaurante,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let reserva of suggestedestacionamentos){
   console.log("Reserva: " + reserva);
   html += createtableHTML(reserva);
  }
 

    //document.getElementById("withoutresultsestacionamentos").style.visibility = "visible";
    console.log("NADA ENCONTRADO");

  
  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

   lugaresElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }

////////////////////////////////////////////////////////////////////////////////////////////////7

function createplateHTML(plate){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:23%; position: absolute;'><h3 id='pratoname' style='margin-left: 1.6%; font-size: 27px;'>" + plate.plate_name + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + plate.plate_type_description + "</h3><h3 id='precoetiponame' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço: <i>" + plate.plate_price + "</i> | Tipo: <i>" + plate.plate_type_name + "</i></h3><button style='margin-left:2%; margin-top: -0.2%; position: absolute;' id='button9'>ALTERAR DISPONIBILIDADE</button><button style='margin-left:65%; margin-top: -0.2%; position: absolute;' id='button9'>ELIMINAR PRATO</button></div>";
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getMenu(id_restaurante){
  
  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizemenu"); //VERIFICAR O ID
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getmenu/" + id_restaurante,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let reserva of suggestedestacionamentos){
   console.log("Reserva: " + reserva);
   html += createplateHTML(reserva);
  }
 

    //document.getElementById("withoutresultsestacionamentos").style.visibility = "visible";
    console.log("NADA ENCONTRADO");

  
  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

   lugaresElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }
 
 
 /////////////////////// OBTER A MORADA //////////////////////////



 async function getMorada(id_restaurante){
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/getlocation/restaurante/" + id_restaurante,
  method: "get",
  dataType: "json",
  
  });

  console.log("MORADA: " + suggestedrestaurants[0].local_morada) //detalhe


  //  document.getElementById("withoutresultsrestaurantes").style.visibility = "visible";
   // console.log("NADA ENCONTRADO");

  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
 // restaurantesElem.innerHTML = html;

 document.getElementById('restaurantmorada').innerHTML = "Morada: " + suggestedrestaurants[0].local_morada;
  
  
  } catch(err){
   console.log(err);
  }
  }

  ///////////////////////////////////////////////////////////////////////////////////

  function createreservaHTML(reserva){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 60%; height:23%; position: absolute;'><h3 id='utilizadorname' style='margin-left: 1.6%; font-size: 27px;'>" + reserva.utilizador_name + "</h3><h3 id='numeromesaname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + reserva.mesa_number + "</h3><h3 id='tipoetamanhoname' style='margin-left: 1.6%; margin-top: -1.6%;'>Tamanho: <i>" + reserva.mesa_size + "</i> | Tipo: <i>" + reserva.mesa_type_name + "</i></h3><h3 id='dataname' style='margin-left: 1.6%;  margin-top: -1.2%;'>Data: " + reserva.date_marcada_reservation + "</h3><button style='margin-left:73%; margin-top: -10%; position: absolute;' id='button9'>CANCELAR A RESERVA</button></div>";
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }
  
  async function getReservasRestaurante(id_restaurante){
  
    console.log("Obtendo os reports")
    
    // let recipeName = document.getElementById("nome1")
     let lugaresElem = document.getElementById("organizereserva"); //VERIFICAR O ID
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let suggestedestacionamentos = await $.ajax({
    
    url: "/users/getreservas/" + id_restaurante,
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
    
    let html = "";
    
   
    for(let reserva of suggestedestacionamentos){
     console.log("Reserva: " + reserva);
     html += createreservaHTML(reserva);
    }
   
  
      //document.getElementById("withoutresultsestacionamentos").style.visibility = "visible";
      console.log("NADA ENCONTRADO");
  
    
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     lugaresElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }


window.onload = function exampleFunction() {
    console.log('The Script will load now.');
  
    var utilizador_id = sessionStorage.getItem("utilizador_id")
    var utilizador_name = sessionStorage.getItem("utilizador_name");
    let utilizador_username = sessionStorage.getItem("utilizador_username");
    var utilizador_email = sessionStorage.getItem("utilizador_email");
    var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

    var estabelecimento_id = sessionStorage.getItem('establishment_id');
    var estabelecimento_name = sessionStorage.getItem('establishment_name');
    var estabelecimento_description = sessionStorage.getItem('establishment_description');
    var restaurant_id = sessionStorage.getItem('restaurant_id');
    var restaurante_number_tables = sessionStorage.getItem('restaurante_number_tables');
    var estabelecimento_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
    var type_service_identifier = sessionStorage.getItem('type_service_identifier');
    var type_restaurant_id = sessionStorage.getItem('type_restaurant_id');
    var type_restaurant_name = sessionStorage.getItem('type_restaurant_name');
    var state_id = sessionStorage.getItem('state_id');  //EXPLICAR
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);
    console.log("NOME DO RESTAURANTE: " + estabelecimento_name)

    document.getElementById('textomeusestabelecimentos').innerHTML = "" + estabelecimento_name;

  
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
 //   document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  
  //  document.getElementById('informacoesdiv').style.visibility = "hidden";
   // document.getElementById('tipocliente').style.visibility = "hidden";
    
   // getAleatorioRestaurantes();

   document.getElementById('restaurantnameinfo').innerHTML = "Nome: " + estabelecimento_name;
   document.getElementById('restauranttypeinfo').innerHTML = "Tipo: " + type_restaurant_name;
   document.getElementById('restaurantinfo').innerHTML = "Numero de Mesas: " + restaurante_number_tables;

   getMorada(restaurant_id);

   getReservasRestaurante(restaurant_id);

   getMenu(restaurant_id);

   getMesas(restaurant_id);

}


async function newChangeReports(){

  document.getElementById('textominhasreservas').style.visibility = "hidden";
  document.getElementById('textominhaconta').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Reports";
  document.getElementById('tipocliente').style.visibility = "hidden";
  document.getElementById('tipoestabelecimento').style.visibility = "visible";
  document.getElementById('textomeusfavoritos').style.visibility = "hidden";
  document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  document.getElementById('informacoesdiv').style.visibility = "hidden";
  document.getElementById('organizeitems').style.visibility = "visible";

}

async function newChangePromotion(){

  document.getElementById('textominhasreservas').style.visibility = "hidden";
  document.getElementById('textominhaconta').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Promoção";
  document.getElementById('tipocliente').style.visibility = "visible";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('textomeusfavoritos').style.visibility = "hidden";
  document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  document.getElementById('informacoesdiv').style.visibility = "hidden";
  document.getElementById('organizeitems').style.visibility = "visible";

}

async function newChange(){

  document.getElementById('textominhasreservas').style.visibility = "hidden";
  document.getElementById('textominhaconta').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Estabelecimentos em Análise";
  document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('textomeusfavoritos').style.visibility = "hidden";
  document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  document.getElementById('informacoesdiv').style.visibility = "hidden";
  document.getElementById('organizeitems').style.visibility = "visible";
  document.getElementById('tipocliente').style.visibility = "hidden";

}

async function myFavoritos(){

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