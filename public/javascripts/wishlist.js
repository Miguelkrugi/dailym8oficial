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

    document.getElementById('restaurantoption').addEventListener("click", function(){

        getLikedRestaurants(utilizador_id);
    
    
     });

     document.getElementById('acomodacaooption').addEventListener("click", function(){

        getLikedAcomodacao(utilizador_id);
    
    
     });

     document.getElementById('estacionamentooption').addEventListener("click", function(){

      //  getLikedEstacionamento(utilizador_id);
    
    
     });

    getLikedRestaurants(utilizador_id);
   // getAleatorioRestaurantes();

   

}

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
     let restaurantesElem = document.getElementById("organize15");
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

function createlikedrestaurantHTML(restaurante){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-restaurant.html' onclick='openrestaurant2(" + JSON.stringify(restaurante) + ")' class='strip_info' ><small>" + restaurante.type_restaurant_name + "</small><div class='item_title'><h3>" + restaurante.establishment_name + "</h3><small>" + restaurante.restaurante_number_tables + "</small></div></a></figure></div></div>"
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }

async function getLikedRestaurants(id_user){

    console.log("Obtendo os restaurantes");
    
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize15");
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