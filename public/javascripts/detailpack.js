function createtableHTML(mesapack){
  
   //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
  
   return "<div class='menu_item' style='background-color:lightgray; width:100%; height:15%;'><em>Preço: " + mesapack.mesa_price + " $</em><h4>Numero: " + mesapack.mesa_number + " | Pessoas: " + mesapack.mesa_size + "</h4><p>Descrição: " + mesapack.mesa_type_name + "</p></div><hr>"
   // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
 
  /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
 
 }

 async function turnavailabilityoff(pack_id){

   try{
      
      let ementas = await $.ajax({
  
        url: "/users/turnoff/available/pack/" + pack_id,
        method: "put",
        dataType: "json",
  
      });
  
      console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
  
      
  
  
   } catch(err){
     console.log(err);
   }

 }


async function reservartable(id_pack){

   console.log("Obtendo as mesas do pack")
   
    let restaurantesElem = document.getElementById("map1");
    var utilizador_id = sessionStorage.getItem("utilizador_id");
    console.log("setItem->userId = " + utilizador_id);

    ////////////// PRIMEIRO PERCORREMOS TODAS AS MESAS DO PACK, PARA CADA UMA, FAZEMOS UM POST DELA ///////////////
   
   try{
   
   let suggestedrestaurants = await $.ajax({
   
   url: "/users/packs/restaurante/mesa/" + id_pack,
   method: "get",
   dataType: "json",
   
   });
   
   console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
   
   let html = "";
   
   var index = 0;
   for(let tablepack of suggestedrestaurants){
      
      ///PARA CADA UM, FAZER UM POST DESSE TABLE PACK
      
      console.log(tablepack.mesa_price);

      try {

          let data = {
       
           date_marcacao_reservation: "2023-01-03", 
           user_identifier_reservation: utilizador_id,
           mesa_identifier_reservation: tablepack.mesa_id,
           date_marcada_reservation: tablepack.item_date_marcada_reservation, //DEFAULT FOR NOW
           payment_credit_card_number: "2fc5a684737ce1bf7b3b239df432416e0dd07357",
           payment_cvc_number: "7196759210defdc0"
       
          }
       
          //ENVIAR METODO
          let newExercise = await $.ajax({
           url: "/users/insertnewreservamesa/",
           method: "post",
           data: JSON.stringify(data),
           contentType: "application/json",
           dataType: "json"
           });
       
           location.reload();
        
       
        } catch (err){
       
         window.alert("Receita Criada.");
       
        }
        index = index + 1; //DEPOIS DE ADICIONADA, PASSA PARA A PROXIMA MESA, E POR AÍ SUCESSIVAMENTE, ATÉ TERMINAR TODAS AS MESAS//
   }
   
    
   } catch(err){
    console.log(err);
   }


   /////////////////////// O SEGUNDO PASSO, É OBTER TODAS AS ACOMODAÇÕES DO PACK, PERCORRER E IR ADICIONANDO-AS ATRAVÉS DE UM POST ///////////////////////////

   try{
   
      let suggestedacomodacoes = await $.ajax({
      
      url: "/users/packs/restaurante/acomodacao/" + id_pack,
      method: "get",
      dataType: "json",
      
      });
      
      console.log("[utilizador] utilizador = " + JSON.stringify(suggestedacomodacoes));
      
      let html = "";
      
      var index2 = 0;
      for(let tablepack of suggestedacomodacoes){
         
         ///PARA CADA UM, FAZER UM POST DESSE TABLE PACK

         try {
   
             let data = {
          
              date_marcacao_reservation: "2023-01-03", 
              user_identifier_reservation: utilizador_id,
              acomodacao_identifier_reservation: tablepack.acomodacao_id,
              date_marcada_reservation: tablepack.item_date_marcada_reservation, //DEFAULT FOR NOW
              payment_credit_card_number: "2fc5a684737ce1bf7b3b239df432416e0dd07357",
              payment_cvc_number: "7196759210defdc0"
          
             }
          
             //ENVIAR METODO
             let newExercise = await $.ajax({
              url: "/users/insertnewreservaacomodacao/",
              method: "post",
              data: JSON.stringify(data),
              contentType: "application/json",
              dataType: "json"
              });
          
              location.reload();
            
           } catch (err){
          
            window.alert("Receita Criada.");
          
           }
   
           index2 = index2 + 1; //DEPOIS DE ADICIONADA, PASSA PARA A PROXIMA MESA, E POR AÍ SUCESSIVAMENTE, ATÉ TERMINAR TODAS AS MESAS//
   
      }
      
      console.log("OBTEVE");

      } catch(err){

       turnavailabilityoff(id_pack);
       console.log(err);
      }
}

async function getMesasFromPack(id_pack){

   console.log("Obtendo as mesas do pack")
   
   // let recipeName = document.getElementById("nome1")
    let restaurantesElem = document.getElementById("map1");
   // var pack_id = sessionStorage.getItem("pack_id");
    var utilizador_id = sessionStorage.getItem("utilizador_id");
    console.log("setItem->userId = " + utilizador_id);
    //console.log("Restaurante ID: " + restaurant_id);
   
   try{
   
   let suggestedrestaurants = await $.ajax({
   
   url: "/users/packs/restaurante/mesa/" + id_pack,
   method: "get",
   dataType: "json",
   
   });
   
   console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
   
   let html = "";
   
   for(let tablepack of suggestedrestaurants){
   // console.log("Restaurante: " + restaurant);
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
  
   return "<div class='menu_item' style='background-color:lightgray; gap:10px; width:100%; height:15%;'><em>Preço: " + acomodacaopack.acomodacao_price + " $</em><h4>Numero: " + acomodacaopack.acomodacao_number + " | Tipo: " + acomodacaopack.acomodacao_type_name + "</h4></div><hr>"
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
    //sconsole.log("Restaurante ID: " + restaurant_id);
   
   try{
   
   let suggestedrestaurants = await $.ajax({
   
   url: "/users/packs/restaurante/acomodacao/" + id_pack,
   method: "get",
   dataType: "json",
   
   });
   
   console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
   
   let html = "";
   
   for(let tablepack of suggestedrestaurants){
   // console.log("Restaurante: " + restaurant);
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

 document.getElementById("reservarmesas").addEventListener("click", function() {

   reservartable(pack_id);


 });

  

}