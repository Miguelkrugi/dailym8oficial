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

   document.getElementById('acomoption').addEventListener("click", function(){

    console.log("USER ID: " + utilizador_id)
    getMyAcomodacoes(utilizador_id);


 });

   myAllEstabelecimentos(utilizador_id);
}

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
     let restaurantesElem = document.getElementById("organize15");
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

function createrestaurantHTML(restaurante){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-restaurant.html' onclick='openrestaurant2(" + JSON.stringify(restaurante) + ")' class='strip_info'><small>Tipo: " + restaurante.type_restaurant_name + "</small><div class='item_title'><h3>Nome: " + restaurante.establishment_name + "</h3><small>Rua: " + restaurante.local_morada + "</small></div></a></figure></div></div>"
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
     let restaurantesElem = document.getElementById("organize15");
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
  
     restaurantesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }

    console.log("chamada");
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

 