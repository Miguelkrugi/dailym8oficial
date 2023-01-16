async function criarMesa(rest_id, tipo_mesa_id){

  var value_for_availability = 2;

  if(document.getElementById("mesadisponibilidadeinput").value == "Sim"){

    value_for_availability = 0;

  } else if(document.getElementById("mesadisponibilidadeinput").value == "Não"){

    value_for_availability = 1;
  } else {

    console.log("Nada selecionado!")
  }



  try {
 
   
   var restaurant_id = rest_id;
 

    let data = {
 
     mesa_availability: value_for_availability, //DEFAULT FOR NOW,
     mesa_number: document.getElementById("mesanumberinput").value,
     mesa_size: document.getElementById("mesasizeinput").value,
     mesa_restaurant_id: restaurant_id,
     mesa_type_id: tipo_mesa_id,
     mesa_price: document.getElementById("mesaprecoinput").value
 
    }
 
    //ENVIAR METODO
    let newExercise = await $.ajax({
     url: "/users/insertnewmesa/",
     method: "post",
     data: JSON.stringify(data),
     contentType: "application/json",
     dataType: "json"
     });
 
    // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
 
 
  } catch (err){
 
   window.alert("Mesa criada com sucesso.");
 
  }
 
 
 
 }

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
 
    // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
 
 
  } catch (err){
 
   window.alert("Prato criado com sucesso.");
 
  }
 
 
 
 }


 async function removerMesa(mesa){

  var del = mesa.spot_id;
  console.log("ID da mesa: "+del);
 try {

   //ENVIAR METODO
   let asd = await $.ajax({

    url: "/users/deletelugar/" + del,
    method: "delete",
    contentType: "application/json",
    dataType: "json"
  
  });


 } catch (err){
console.log(err);
  window.alert("Não pode apagar a mesa, pois tem reservas associadas à mesma.");

 }

}

async function removerReserva(reserva){

  var del = reserva.id_reservation;
  console.log("ID da mesa: "+del);
 try {

   //ENVIAR METODO
   let asd = await $.ajax({

    url: "/users/deletereserva/" + del,
    method: "delete",
    contentType: "application/json",
    dataType: "json"
  
  });


 } catch (err){
console.log(err);
  window.alert("Não pode apagar a mesa, pois tem reservas associadas à mesma.");

 }

}



function createtableHTML(mesa){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px; display: inline-block ; position: relative; border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:35%;'><h3 id='mesanumbername' style='margin-left: 1.6%; font-size: 27px;'>Número do Lugar: <i>" + mesa.spot_number + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%;padding-top: 10px; font-size: 27px; margin-top: -2%;'>Preço: <i>" + mesa.spot_price + " </i></h3><button padding-top: 10px;style='margin-left:50%; margin-top: -5%; position: absolute;' id='button9' onclick='removerMesa(" + JSON.stringify(mesa) + ")'>ELIMINAR LUGAR</button></div>";  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getMesas(id_restaurante){
  
  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeinfoestauranttables"); //VERIFICAR O ID
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getlugares/" + id_restaurante,
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


async function setUnnavailable(plate){
  var ind = plate.plate_id;  
    try{
    
        let plates = await $.ajax({
          
          url: "/users/become/plateavailability/off/" + ind,
          method: "put",
          dataType: "json",
    
        });

    
     } catch(err){
       console.log(err);
     }
    
    
}

async function setAvailable(plate){
  var ind = plate.plate_id;
    try{
  
      let plates = await $.ajax({
  
        url: "/users/become/plateavailability/on/" + ind,
        method: "put",
        dataType: "json",
  
      });
  
      //console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
  
      
  
  
   } catch(err){
     console.log(err);
   }
  
  
}

async function deletePrato(plate){

  var del = plate.plate_id;
  console.log("ID do prato: "+del);
 try {

   //ENVIAR METODO
   let asd = await $.ajax({

    url: "/users/deletepratos/" + del,
    method: "delete",
    contentType: "application/json",
    dataType: "json"
  
  });
    console.log("ai");
   location.reload();

 } catch (err){

  window.alert("O prato não foi apagado");

 }

}



function updateAvailability(plate){


  if(plate.plate_availability == 0){
    setUnnavailable(plate);
  }else{
    setAvailable(plate);
  }

}

function deletePlates(plate){

  deletePrato(plate);

}

function createplateHTML(plate){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  //return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:23%; position: absolute;'><h3 id='pratoname' style='margin-left: 1.6%; font-size: 27px;'>" + plate.plate_name + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + plate.plate_type_description + "</h3><h3 id='precoetiponame' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço: <i>" + plate.plate_price + "</i> | Tipo: <i>" + plate.plate_type_name + "</i></h3><button style='margin-left:2%; margin-top: -0.2%; position: absolute;' id='button9'>ALTERAR DISPONIBILIDADE</button><button style='margin-left:65%; margin-top: -0.2%; position: absolute;' id='button9'>ELIMINAR PRATO</button></div>";
  return "<div id='reportitem' style='border: 2px; display: inline-block ;position: relative ; border-color: black; background-color: rgb(236, 236, 236); width: 88%; height:30%;'><h3 id='pratoname' style='margin-left: 1.6%; font-size: 27px;'>" + plate.plate_name + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + plate.plate_type_description + "</h3><h3 id='precoetiponame' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço: <i>" + plate.plate_price + "</i> | Tipo: <i>" + plate.plate_type_name + "</i></h3><button style='margin-left:2%; margin-top: -0.2%; position: absolute;' id='button9' onclick='updateAvailability(" + JSON.stringify(plate)+")'>ALTERAR DISPONIBILIDADE</button><button style='margin-left:65%; margin-top: -0.2%; ' id='button9' onclick='deletePlates(" + JSON.stringify(plate)+")'>ELIMINAR PRATO</button></div>";
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
   
    return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 60%; height:23%; position: absolute;'><h3 id='utilizadorname' style='margin-left: 1.6%; font-size: 27px;'>" + reserva.utilizador_name + "</h3><h3 id='numeromesaname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + reserva.spot_number + "</h3><h3 id='tipoetamanhoname' style='margin-left: 1.6%; margin-top: -1.6%;'>Tamanho: <i>" + reserva.spot_price + "</i></h3><h3 id='dataname' style='margin-left: 1.6%;  margin-top: -1.2%;'>Data: " + reserva.date_marcada_reservation + "</h3><button style='margin-left:73%; margin-top: -10%; position: absolute;' id='button9' onclick='removerReserva(" + JSON.stringify(reserva) + ")'>CANCELAR A RESERVA</button></div>";
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }
  
  async function getReservasRestaurante(id_restaurante){
  
    console.log("Obtendo os reports")
    
    // let recipeName = document.getElementById("nome1")
     let lugaresElem = document.getElementById("organizereserva2"); //VERIFICAR O ID
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let suggestedestacionamentos = await $.ajax({
    
    url: "/users/getreservas/estacionamento/" + id_restaurante,
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


    ////// ADICIONAR UM LUGAR \\\\\\

    async function criarLugar(rest_id){

      var value_for_availability = 2;
    
      if(document.getElementById("lugardisponibilidadeinput").value == "Sim"){
    
        value_for_availability = 0;
    
      } else if(document.getElementById("lugardisponibilidadeinput").value == "Não"){
    
        value_for_availability = 1;
      } else {
    
        console.log("Nada selecionado!")
      }
    
    
    
      try {
     
       
       var parking_lot_id = rest_id;
     
    
        let data = {
     
         spot_price: document.getElementById("lugarprecoinput").value,
         spot_availability: value_for_availability,
         spot_parking_lot_id: parking_lot_id,
         spot_number: document.getElementById("lugarnumberinput").value
     
        }
     
        //ENVIAR METODO
        let newExercise = await $.ajax({
         url: "/users/insertlugar/",
         method: "post",
         data: JSON.stringify(data),
         contentType: "application/json",
         dataType: "json"
         });
     
        // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
     
     
      } catch (err){
     
       window.alert("Prato criado com sucesso.");
     
      }
     
     
     
     }
    

    ////////////////////////////////

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
    var restaurant_id = sessionStorage.getItem('parking_lot_id');
    var restaurante_number_tables = sessionStorage.getItem('parking_lot_number_spots');
    var estabelecimento_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
    var type_service_identifier = sessionStorage.getItem('type_service_identifier');
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
  // document.getElementById('restauranttypeinfo').innerHTML = "Tipo: " + type_restaurant_name;
   document.getElementById('restaurantinfo').innerHTML = "Numero de Lugares: " + restaurante_number_tables;

   document.getElementById('button9').addEventListener("click", function() {
	  
    //console.log("TIPO MESA: " + tipo_mesa_id);
   // criarMesa(restaurant_id, tipo_mesa_id);

    document.getElementById("bg-modal666").style.display = "flex";
  });

   getMorada(restaurant_id);

   getReservasRestaurante(restaurant_id);

  // getMenu(restaurant_id);

   getMesas(restaurant_id);

   //VARIAVEL QUE ARMAZENA O VALOR DO TIPO DE PRATO

    var tipo_prato_id = 0;


    document.getElementById('aperitivooption').addEventListener("click", function() {
	    
      tipo_prato_id = 1;
      console.log(tipo_prato_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Aperitivo" 

    });

    document.getElementById('entradaoption').addEventListener("click", function() {
	    
      tipo_prato_id = 2;
      console.log(tipo_prato_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Entrada"  
      
    });

    document.getElementById('pratoprincipaloption').addEventListener("click", function() {
	    
      tipo_prato_id = 3;
      console.log(tipo_prato_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Prato Principal"
      
    });

    document.getElementById('sobremesaoption').addEventListener("click", function() {
	    
      tipo_prato_id = 4;
      console.log(tipo_prato_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Sobremesa" 
      
    });

    document.getElementById('pratododiaoption').addEventListener("click", function() {
	    
      tipo_prato_id = 5;
      console.log(tipo_prato_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Prato do Dia" 
      
    });

   

   document.getElementById('criarpratobtn').addEventListener("click", function() {
	  
    console.log("TIPO PRATO: " + tipo_prato_id);
    criarPlate(restaurant_id, tipo_prato_id);



    document.getElementById("bg-modal").style.display = "none";

   
  });

  /////////////////////////////////////////////////////////////////////////////////////////

  var tipo_mesa_id = 0;

  document.getElementById('interioroption').addEventListener("click", function() {
	    
    tipo_mesa_id = 1;
    document.getElementById("tiposelecionadotext2").innerHTML = "Tipo selecionado: Interior" 
  });

  document.getElementById('exterioroption').addEventListener("click", function() {
	    
    tipo_mesa_id = 2;
    document.getElementById("tiposelecionadotext2").innerHTML = "Tipo selecionado: Exterior" 
  });

  document.getElementById('criarmesabtn').addEventListener("click", function() {
	  
    console.log("TIPO MESA: " + tipo_mesa_id);
    criarMesa(restaurant_id, tipo_mesa_id);
  });

  document.getElementById('criarlugarbtn').addEventListener("click", function() {
	  
    //console.log("TIPO MESA: " + tipo_mesa_id); //A FAZER
    criarLugar(restaurant_id);

  });


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