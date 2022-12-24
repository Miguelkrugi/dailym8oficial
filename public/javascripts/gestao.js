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

    document.getElementById('textomeusestabelecimentos').innerHTML = "Reports";

    
   
  
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
  
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    document.getElementById('tipocliente').style.visibility = "hidden";
    
   // getAleatorioRestaurantes();


   getReports();

}

function createreportHTML(report){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 60%; height:25%; position: absolute;'><h3 id='restaurantname' style='margin-left: 1.6%; font-size: 27px;'>" + report.establishment_name + "</h3><h3 id='createdbyname' style='margin-left: 1.6%; margin-top: -1.6%;'>Criado por: <i>" + report.utilizador_username + "</i></h3><h3 id='statename' style='margin-left: 1.6%; margin-top: -0.8%;'>Estado do Local:" + report.state_name + "</h3><h3 id='datename' style='margin-left: 1.6%; margin-top: -0.8%;'>Data do Report:" + report.report_restaurante_date + "</h3><button id='colocarsobanalise' style='margin-left: 60%; margin-top: -14.5%; position: absolute;'>COLOCAR SOBRE ANÁLISE</button><button style='margin-left:83%; margin-top: -14.5%; position: absolute;' id='button9'>VER DETALHES</button></div>";
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";

 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}

async function getReports(){

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