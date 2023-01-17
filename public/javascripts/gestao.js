window.onload = function exampleFunction() {report
    console.log('The Script will load now.');
  
    var utilizador_id = sessionStorage.getItem("utilizador_id")
    var utilizador_name = sessionStorage.getItem("utilizador_name");
    let utilizador_username = sessionStorage.getItem("utilizador_username");
    var utilizador_email = sessionStorage.getItem("utilizador_email");
    var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);

    document.getElementById('textomeusestabelecimentos').innerHTML = "Reports";

    
   
  
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    document.getElementById('tipocliente').style.visibility = "hidden";
    
   // getAleatorioRestaurantes();

   /////////////BOTÕES PARA VER DETALHES NOS ESTABELECIMENTOS EM ANÁLISE//////////////


   ///////////////////////////////////////////////////////////////////////////////////

   getReports();

}

async function setAdmin(users){
  var ind = users.utilizador_id;
    try{
  
      let plates = await $.ajax({
  
        url: "/users/updateadmin/" + ind,
        method: "put",
        dataType: "json",
  
      });
  
      //console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
  
      
  
  
   } catch(err){
     console.log(err);
   }
  
  
}

async function setCliente(users){
  var ind = users.utilizador_id;
    try{
  
      let plates = await $.ajax({
  
        url: "/users/updatecliente/" + ind,
        method: "put",
        dataType: "json",
  
      });
  
      //console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
  
      
  
  
   } catch(err){
     console.log(err);
   }
  
  
}

function makeAdmin(users){


  setAdmin(users);

}

function removerAdmin(users){


  setCliente(users);

}



function createusersHTML(users){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:9%; position: relative ;'><h3 id='restaurantname' style='margin-left: 1.6%; font-size: 27px;'>Nome: " + users.utilizador_name + "</h3> <h3 id='restaurantename' style='margin-left: 1.6%; font-size: 16px; margin-top: -1%;'>Username: " + users.utilizador_username  + "</h3><h3 id='createdbyname' style='margin-left: 1.6%; margin-top: -1%;'>Criado por: <i>" + users.utilizador_type_name + "</i></h3></h3><button id='colocarsobanalise' style='margin-left: 60%; margin-top: -5%; position: absolute;'onclick='makeAdmin(" + JSON.stringify(users)+")'>PROMOVER A ADMINISTRADOR</button><button style='margin-left:83%; margin-top: -5%; position: absolute;' id='button9' onclick='removerAdmin(" + JSON.stringify(users)+")'>DESPROMOVER A CLIENTE</button></div>";
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getUsersPromotion(){

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems3");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getusers/promotion/",
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let spot of suggestedestacionamentos){
   console.log("Report: " + spot);
   html += createusersHTML(spot);
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

async function newChangePromotion(){

  document.getElementById('textominhasreservas').style.visibility = "hidden";
  document.getElementById('textominhaconta').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Promoção";
  document.getElementById('tipocliente').style.visibility = "hidden";
 // document.getElementById('tipoestabelecimento').style.visibility = "visible";
  document.getElementById('textomeusfavoritos').style.visibility = "hidden";
  document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  document.getElementById('informacoesdiv').style.visibility = "hidden";
  document.getElementById('organizeitems').style.visibility = "hidden";
  document.getElementById('organizeitems2').style.visibility = "hidden";
  document.getElementById('organizeitems3').style.visibility = "visible";
  document.getElementById('organizeitems4').style.visibility = "hidden";

  console.log("Obtendo os reports")

  getUsersPromotion();  
  

}

async function newChangeReports(){

  document.getElementById('textominhasreservas').style.visibility = "hidden";
  document.getElementById('textominhaconta').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Reports / Em Analise";
  document.getElementById('tipocliente').style.visibility = "hidden";
 // document.getElementById('tipoestabelecimento').style.visibility = "visible";
  document.getElementById('textomeusfavoritos').style.visibility = "hidden";
  document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  document.getElementById('informacoesdiv').style.visibility = "hidden";
  document.getElementById('organizeitems').style.visibility = "visible";
  document.getElementById('organizeitems2').style.visibility = "hidden";
  document.getElementById('organizeitems3').style.visibility = "hidden";
  document.getElementById('organizeitems4').style.visibility = "hidden";


  console.log("Obtendo os reports")
  
  getFilterReportsRestaurant();

}

async function verifyplace(report){


 try{
  
  let ementas = await $.ajax({

    url: "users/alterarestado/verificado/restaurante/" + report.report_restaurante_id,
    method: "put",
    dataType: "json",

  });

  console.log("[utilizador] utilizador = " + JSON.stringify(ementas));

  


} catch(err){
 console.log(err);
}

}

///////////////////////////////////// MÉTODO PARA APAGAR UM RESTAURANTE ////////////////////////////////////

async function apagarRest(rest_id){

  try {
  
  //ENVIAR METODO - APAGAR AS MESAS
  
  //ENVIAR MÉTODO - APAGAR O RESTAURANTE

  let newExercise4 = await $.ajax({
    url: "/users/delete/restaurante/restaurante/" + rest_id,
    method: "delete",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
    });
  
  
  } catch(err){
    console.log(err);
  }
  
  }

async function apagarPratos(rest_id){

  try {
  
  //ENVIAR METODO - APAGAR AS MESAS
  
  let newExercise3 = await $.ajax({
    url: "/users/delete/pratos/restaurante/" + rest_id,
    method: "delete",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
    });
  
    apagarRest(rest_id);
  
  } catch(err){
    console.log(err);
  }
  
  }

async function apagarMesas(rest_id){

try {

//ENVIAR METODO - APAGAR AS MESAS

let newExercise2 = await $.ajax({
  url: "/users/delete/mesas/restaurante/" + rest_id,
  method: "delete",
  data: JSON.stringify(data),
  contentType: "application/json",
  dataType: "json"
  });

  apagarPratos(rest_id);

} catch(err){
  console.log(err);
}

}

async function deleteRest(rest_id){ //Sendo o rest_id o ID do restaurante.

  ///1. PASSO - APAGAR AS RESERVAS
  console.log("READY TO DELETE");

 try {

   //ENVIAR METODO - APAGAR AS RESERVAS
   let newExercise = await $.ajax({
    url: "/users/delete/reservas/restaurante/" + rest_id,
    method: "delete",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
    });

    apagarMesas(rest_id);




   // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
   //location.reload();

 } catch (err){

  window.alert("Receita Criada.");

 }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openpopupdetails2(report){

  document.getElementById('button10').addEventListener("click", function() {

    document.querySelector('.bg-modal8').style.display = "flex";

    document.getElementById("popuprestaurantname").innerHTML = "Nome: " + report.establishment_name;

    //document.getElementById("popupnumberreports").innerHTML = report.establishment_name;

    document.getElementById("statelocal").innerHTML = "Estado: " + report.state_name;

    document.getElementById("placecreatedby").innerHTML = "Criador: " + report.utilizador_username;



    getNumberOfReports2(report.restaurante_id);
	    

  });

  document.querySelector('.close9').addEventListener("click", function() {
  
    document.querySelector('.bg-modal8').style.display = "none";
  });

  ///////////////////////// BOTOES ////////////////////////////

  document.getElementById('deleterestaurante').addEventListener("click", function(){

   
    document.querySelector('.bg-modal8').style.display = "flex";

    deleteRest(report.restaurante_id); //CHAMA A FUNCAO PARA APAGAR O RESTAURANTE (COMEÇANDO POR POSSIVEIS RESERVAS, POSTERIORMENTE AS MESAS E SÓ DEPOIS, O RESTAURANTE)
    //deleteRest(report.restaurant_id);

  });

  document.getElementById('seedetails').addEventListener("click", function(){

   
   // reportRest(restaurant_id);

  });

}

function createrestaurantHTML(report){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:7%; position: relative;'><h3 id='restaurantname' style='margin-left: 1.6%; font-size: 27px;'>" + report.establishment_name + "</h3><h3 id='createdbyname' style='margin-left: 1.6%; margin-top: -1.6%;'>Criado por: <i>" + report.utilizador_username + "</i></h3></h3><button id='colocarsobanalise' style='margin-left: 60%; margin-top: -4.8%; position: absolute;'onclick='verifyplace(" + JSON.stringify(report) + ")'>VERIFICAR LOCAL</button><button style='margin-left:83%; margin-top: -4.8%; position: absolute;' id='button10' onclick='openpopupdetails2(" + JSON.stringify(report) + ")'>VER DETALHES</button></div>";
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function newChange(){

  document.getElementById('textominhasreservas').style.visibility = "hidden";
  document.getElementById('textominhaconta').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Estabelecimentos em Análise";
  //document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('textomeusfavoritos').style.visibility = "hidden";
  document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  document.getElementById('informacoesdiv').style.visibility = "hidden";
  document.getElementById('organizeitems').style.visibility = "visible";
  document.getElementById('tipocliente').style.visibility = "hidden";
  document.getElementById("organizeitems").style.visibility = "hidden";
  document.getElementById("organizeitems2").style.visibility = "visible";
  document.getElementById('organizeitems3').style.visibility = "hidden";
  document.getElementById('organizeitems4').style.visibility = "hidden";

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems2");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getinanalysis/places/restaurant/",
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let spot of suggestedestacionamentos){
   console.log("Report: " + spot);
   html += createrestaurantHTML(spot);
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


async function getFilterReportsAcomodacao(){

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getlatestreports/acomodacao/",
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let spot of suggestedestacionamentos){
   console.log("Report: " + spot);
   html += createreportHTML(spot);
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

async function getFilterReportsRestaurant(){

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getlatestreports/",
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let spot of suggestedestacionamentos){
   console.log("Report: " + spot);
   html += createreportHTML(spot);
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

async function getNumberOfReports2(rest_id){

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
   console.log("REST ID: " + rest_id);
   /*
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/numberreports/" + rest_id,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos[0].count));
  
  let html = "";
  
 
  document.getElementById("popupnumberreports").innerHTML = "Numero de Reports: " + suggestedestacionamentos[0].count;
 
  
  } catch(err){
   console.log(err);
  }
  */

}

/*
async function getNumberOfReports(rest_id){

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/numberreports/" + rest_id,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos[0].count));
  
  let html = "";
  
 
  document.getElementById("popupnumberreports").innerHTML = "Numero de Reports: " + suggestedestacionamentos[0].count;
 

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
*/
/*
function openpopupdetails(report){

  document.getElementById('button999').addEventListener("click", function() {
	    
   // document.getElementById("bg-modal8").style.display = "flex";
    document.querySelector('.bg-modal8').style.display = "flex";

    document.getElementById("popuprestaurantname").innerHTML = report.establishment_name;

    document.getElementById("popupnumberreports").innerHTML = report.establishment_name;

    document.getElementById("statelocal").innerHTML = report.state_name;

    document.getElementById("placecreatedby").innerHTML = report.utilizador_username;


    getNumberOfReports(report.report_restaurante_id);

  });

  document.querySelector('.close9').addEventListener("click", function() {
  
    document.querySelector('.bg-modal8').style.display = "none";
  });

  
}*/

async function putanalysis(report){


    try{
  
      let ementas = await $.ajax({
  
        url: "users/alterarestado/emanalise/restaurante/" + report.report_restaurante_id,
        method: "put",
        dataType: "json",
  
      });
  
      console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
  
      
  
  
   } catch(err){
     console.log(err);
   }

}



function createreportHTML(report){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:15%; position:relative;'><h3 id='restaurantname' style='margin-left: 1.6%; font-size: 27px;'>" + report.establishment_name + "</h3><h3 id='createdbyname' style='margin-left: 1.6%; margin-top: -1.6%;'>Criado por: <i>" + report.utilizador_username + "</i></h3><h3 id='statename' style='margin-left: 1.6%; margin-top: -0.8%;'>Estado do Local:" + report.state_name + "</h3><h3 id='datename' style='margin-left: 1.6%; margin-top: -0.8%;'>Data do Report:" + report.report_restaurante_date + "</h3><button id='colocarsobanalise' style='margin-left: 60%; margin-top: -9.5%; position: absolute;'onclick='putanalysis(" + JSON.stringify(report) + ")'>COLOCAR SOBRE ANÁLISE</button><button style='margin-left:83%; margin-top: -9.5%; position: absolute;' id='button9' onclick='openpopupdetails(" + JSON.stringify(report) + ")'>VER DETALHES</button></div>";
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getReports(){ //REPORTS DE RESTAURANTE

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getlatestreports/",
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let spot of suggestedestacionamentos){
   console.log("Report: " + spot);
   html += createreportHTML(spot);
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

  function createfavoriteHTML(favorite){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:15%; position:absolute;'><h3 id='restaurantname' style='margin-left: 1.6%; font-size: 27px;'>" + favorite.establishment_name + "</h3><h3 id='createdbyname' style='margin-left: 1.6%; margin-top: -1.6%;'>Criado por: <i>" + favorite.utilizador_username + "</i></h3><h3 id='statename' style='margin-left: 1.6%; margin-top: -0.8%;'>Descrição:" + favorite.establishment_description + "</h3><h3 id='datename' style='margin-left: 1.6%; margin-top: -0.8%;'>Tipo:" + favorite.type_restaurant_name + "</h3><button id='colocarsobanalise' style='margin-left: 60%; margin-top: -9.5%; position: absolute;'>COLOCAR SOBRE ANÁLISE</button><button style='margin-left:83%; margin-top: -9.5%; position: absolute;' id='button9' onclick='openpopupdetails()'>VER DETALHES</button></div>";
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }

async function myFavoritos(){
  document.getElementById('textominhasreservas').style.visibility = "hidden";
  document.getElementById('textominhaconta').style.visibility = "hidden";
  document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Favoritos";
 // document.getElementById('tipoestabelecimento').style.visibility = "hidden";
  document.getElementById('textomeusfavoritos').style.visibility = "hidden";
  document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  document.getElementById('informacoesdiv').style.visibility = "hidden";
  document.getElementById('tipocliente').style.visibility = "hidden";
  document.getElementById("organizeitems").style.visibility = "hidden";
  document.getElementById("organizeitems2").style.visibility = "hidden";
  document.getElementById('organizeitems3').style.visibility = "hidden";
  document.getElementById('organizeitems4').style.visibility = "visible";

  var utilizador_id = sessionStorage.getItem("utilizador_id")

  console.log("Obtendo os reports")
  
  // let recipeName = document.getElementById("nome1")
   let lugaresElem = document.getElementById("organizeitems4");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedestacionamentos = await $.ajax({
  
  url: "/users/getfavoritos/restaurante/" + utilizador_id, //SUBSTITUIR PELOS ESTABELECIMENTOS FAVORITOS
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
  
  let html = "";
  
 
  for(let spot of suggestedestacionamentos){
   console.log("Report: " + spot);
   html += createfavoriteHTML(spot);
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
 //   document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "visible";
    document.getElementById('organizeitems').style.visibility = "hidden";
    document.getElementById('tipocliente').style.visibility = "hidden";
    document.getElementById("organizeitems").style.visibility = "hidden";
    document.getElementById("organizeitems2").style.visibility = "hidden";
    document.getElementById('organizeitems3').style.visibility = "hidden";
    document.getElementById('organizeitems4').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "visible";

    var utilizador_id = sessionStorage.getItem("utilizador_id")
    var utilizador_name = sessionStorage.getItem("utilizador_name");
    let utilizador_username = sessionStorage.getItem("utilizador_username");
    var utilizador_email = sessionStorage.getItem("utilizador_email");
    var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

    document.getElementById('nomeutilizadorfield').innerHTML = utilizador_name;
    document.getElementById('usernameutilizadorfield').innerHTML = utilizador_username;
    document.getElementById('emailutilizadorfield').innerHTML = utilizador_email;
  
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