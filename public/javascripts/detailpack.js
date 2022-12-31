function createtableHTML(mesapack){
  
   //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
  
   return "<div class='menu_item' style='background-color:lightgray; width:55%;'><em>Preço: " + mesapack.mesa_price + " $</em><h4>Numero: " + mesapack.mesa_number + " | Pessoas: " + mesapack.mesa_size + "</h4><p>Descrição: " + mesapack.mesa_type_name + "</p></div><hr>"
   // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
 
  /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
 
 }

async function getMesasFromPack(id_pack){

   console.log("Obtendo as mesas do pack")
   
   // let recipeName = document.getElementById("nome1")
    let restaurantesElem = document.getElementById("map1");
   // var pack_id = sessionStorage.getItem("pack_id");
    var utilizador_id = sessionStorage.getItem("utilizador_id");
    console.log("setItem->userId = " + utilizador_id);
    console.log("Restaurante ID: " + restaurant_id);
   
   try{
   
   let suggestedrestaurants = await $.ajax({
   
   url: "/users/packs/restaurante/mesa/" + id_pack,
   method: "get",
   dataType: "json",
   
   });
   
   console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
   
   let html = "";
   
   for(let tablepack of suggestedrestaurants){
    console.log("Restaurante: " + restaurant);
    html += createtableHTML(tablepack);
   }
   
   console.log("OBTEVE");
   //  recipeName.innerHTML = html;
   
  // restaurantesElem.innerHTML = html;
 
    restaurantesElem.innerHTML = html;
   
   
   } catch(err){
    console.log(err);
   }
}

function createacomodacaoHTML(acomodacaopack){
  
   //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
  
   return "<div class='menu_item' style='background-color:lightgray; width:55%;'><em>Preço: " + acomodacaopack.acomodacao_price + " $</em><h4>Numero: " + acomodacaopack.acomodacao_number + " | Tipo: " + acomodacaopack.acomodacao_type_name + "</h4></div><hr>"
   // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
 
  /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
 
 }

async function getAcomodacaoFromPackRestaurante(id_pack){

   console.log("Obtendo as mesas do pack")
   
   // let recipeName = document.getElementById("nome1")
    let restaurantesElem = document.getElementById("map2");
   // var pack_id = sessionStorage.getItem("pack_id");
    var utilizador_id = sessionStorage.getItem("utilizador_id");
    console.log("setItem->userId = " + utilizador_id);
    console.log("Restaurante ID: " + restaurant_id);
   
   try{
   
   let suggestedrestaurants = await $.ajax({
   
   url: "/users/packs/restaurante/acomodacao/" + id_pack,
   method: "get",
   dataType: "json",
   
   });
   
   console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
   
   let html = "";
   
   for(let tablepack of suggestedrestaurants){
    console.log("Restaurante: " + restaurant);
    html += createacomodacaoHTML(tablepack);
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

 var pack_id = sessionStorage.getItem('pack_id');
 var pack_name = sessionStorage.getItem('pack_name');
 var pack_restaurante_id = sessionStorage.getItem('pack_restaurante_id');
 var pack_availability = sessionStorage.getItem('pack_availability');


    console.log('The Script will load now.');

    console.log("A chamar a funcao");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);

    console.log("PACK ID: " + pack_id);
    console.log("PACK NAME: " + pack_name);
    console.log("RESTAURANT ID: " + pack_restaurante_id);
  
 document.getElementById("titulorestaurante").innerHTML = pack_name;


 getMesasFromPack(pack_id);

 getAcomodacaoFromPackRestaurante(pack_id);

  

}