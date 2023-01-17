
async function getNumberLikesRestaurant(restaurante_id){

    console.log("Obtendo os likes")
    
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let qlikes = await $.ajax({
    
    url: "/users/countlikerestaurant/" + restaurante_id,
    method: "get",
    dataType: "json",
    
    });

    console.log("Likes: " + qlikes[0].count);
    
   
    document.getElementById("quantidadelikes").innerHTML = "Likes: " + qlikes[0].count;
    
    
    } catch(err){
     console.log(err);
    }
    }

    
  
    async function getPlacePosition(restaurante_id){

        console.log("Obtendo os likes")
        
         var utilizador_id = sessionStorage.getItem("utilizador_id");
         console.log("setItem->userId = " + utilizador_id);
        
        try{
        
        let position = await $.ajax({
        
        url: "/users/place/position/" + restaurante_id,
        method: "get",
        dataType: "json",
        
        });

        
    
        console.log("Morada: " + position[0].local_morada);
        
        
        } catch(err){
         console.log(err);
        }
        }

        function initMap(lat, lng) {
            // The location of Uluru
            const uluru = { lat: lat, lng: lng };
            // The map, centered at Uluru
            const map = new google.maps.Map(document.getElementById("map"), {
              zoom: 4,
              center: uluru,
            });
            // The marker, positioned at Uluru
            const marker = new google.maps.Marker({
              position: uluru,
              map: map,
            });
          }


          async function getLatitudePlace(restaurante_id){

            console.log("Obtendo os likes")
            
             var utilizador_id = sessionStorage.getItem("utilizador_id");
             console.log("setItem->userId = " + utilizador_id);
            
            try{
            
            let position = await $.ajax({
            
            url: "/users/place/position/" + restaurante_id,
            method: "get",
            dataType: "json",
            
            });
    
            
        
            console.log("Morada: " + position[0].local_morada);
            console.log("Latitude: " + position[0].local_latitude);
            console.log("Longitude: " + position[0].local_longitude);

            var latitude = position[0].local_latitude;
            var longitude = position[0].local_longitude;

            initMap(latitude, longitude);       
            
            } catch(err){
             console.log(err);
            }
            
            
            }

            function getStateOfPlace(state_id){

                console.log("Função do state chamada!");

                if(state_id == 1){

                    document.getElementById("createdplacestate").style.visibility = "visible";

                }


            }

async function getChangeLike(utilizador_id ,restaurant_id){

  try{
  
    let suggestedrestaurants = await $.ajax({
    
    url: "/users/getlike/checklike/restaurante/" + utilizador_id + "/" + restaurant_id, //FALTA COLOCAR
    method: "get",
    dataType: "json",
    
    });

    if(suggestedrestaurants.length > 0){

       document.getElementById("removelike").style.visibility = "visible";
       document.getElementById("addlike").style.visibility = "hidden";

    } else {

      document.getElementById("removelike").style.visibility = "hidden";
      document.getElementById("addlike").style.visibility = "visible";

    }
  
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

/////////////////// REPORTAR POST ////////////////////////


async function reportRest(rest_id){

  const date = new Date();
  const current_date_hours = date.getHours();
  const current_date_minutes = date.getMinutes();
  const current_date_seconds = date.getSeconds();
  let resta_id = rest_id;

 try {

  

   let data = {

    report_restaurante_id: resta_id,
    report_restaurante_date: "2023-01-18" + " " + current_date_hours + ":" + current_date_minutes + ":" + current_date_seconds

   }

   //ENVIAR METODO
   let newExercise = await $.ajax({
    url: "/users/insertnewreportrest/",
    method: "post",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
    });

   // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);


 } catch (err){

  window.alert("Receita Criada.");

 }
}

//////////////////////////////////////////////////////////

async function putLike(rest_id, user_id){

  let resta_id = rest_id
  let userr_id = user_id
 try {

  

   let data = {

    like_utilizador: userr_id,
    like_restaurante: resta_id,

   }

   //ENVIAR METODO
   let newExercise = await $.ajax({
    url: "/users/insertnewlike/",
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

async function deleteLike(rest_id, user_id){

  console.log("READY TO DELETE");

 try {

   //ENVIAR METODO
   let newExercise = await $.ajax({
    url: "/users/deletelike/restaurante/" + user_id + "/" + rest_id,
    method: "delete",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
    });

   // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
   location.reload();

 } catch (err){

  window.alert("Receita Criada.");

 }
 


 
}



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
async function testArrive(mesa_id){
  console.log("ID OF TABLE: " + mesa_id);

  try{

  let newExercise2 = await $.ajax({
    url: "/users/setmesaunavailable/" + mesa_id,
    method: "put",
    dataType: "json",
    });

  } catch (err){

     console.log("ERRO");

  }

}


async function sentPost(date_marcacao_reservation, user_identifier_reservation, mesa_identifier_reservation, date_marcada_reservation, payment_credit_card_number, payment_cvc_number){

  console.log("sentposttttttttttttttttttt");

  console.log(date_marcacao_reservation);
  console.log(user_identifier_reservation);
  console.log(mesa_identifier_reservation);
  console.log(date_marcada_reservation);
  console.log(payment_credit_card_number);
  console.log(payment_cvc_number);

  

  try {
 
    console.log("CHEGOU");
   
  
 
     let data = {
  
      date_marcacao_reservation: date_marcacao_reservation, //DEFAULT FOR NOW,
      user_identifier_reservation: user_identifier_reservation,
      mesa_identifier_reservation: mesa_identifier_reservation,
      date_marcada_reservation: date_marcada_reservation,
      payment_credit_card_number: payment_credit_card_number,
      payment_cvc_number: payment_cvc_number
  
     }
  
     //ENVIAR METODO
     let newExercise = await $.ajax({
      url: "/users/insertresmesa/",
      method: "post",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json"
      });
      

      console.log("CHEGOU:");

  
     /*ENVIAR METODO
     let newExercise2 = await $.ajax({
      url: "/users/setmesaunavailable/" + mesa_identifier_reservation,
      method: "put",
      dataType: "json",
      });
      */
  
     // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
  
  
   } catch (err){
  
    testArrive(mesa_identifier_reservation);

    window.alert("Reserva criada.");
  
   }
  }

async function showValuee(table){

 
  
  let utilizador_id = sessionStorage.getItem("utilizador_id")
  var utilizador_name = sessionStorage.getItem("utilizador_name");
  let utilizador_username = sessionStorage.getItem("utilizador_username");
  var utilizador_email = sessionStorage.getItem("utilizador_email");
  var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

   console.log("UTILIZADOR ID AGAIN: " + utilizador_id);
  
  let fullpaymentcreditcardnumber = "" + document.getElementById("creditparte1").value + document.getElementById("creditparte2").value + document.getElementById("creditparte3").value + document.getElementById("creditparte4").value;

 //  let payment_credit_card_number = bcrypt.hashSync(fullpaymentcreditcardnumber, salt);

   console.log("HASHED CREDIT CARD: " +  fullpaymentcreditcardnumber);

   var date_marcacao_reservation = "2023-01-03"; //DEFAULT FOR NOW,
   var user_identifier_reservation = utilizador_id;
   var  mesa_identifier_reservation = table.mesa_id;
   var date_marcada_reservation = document.getElementById("datetext").value;
   var payment_credit_card_number = fullpaymentcreditcardnumber;
   var payment_cvc_number = document.getElementById("cvcnumber").value;

    sentPost(date_marcacao_reservation, user_identifier_reservation, mesa_identifier_reservation, date_marcada_reservation, payment_credit_card_number, payment_cvc_number);
 
}


function createtableHTML(table){
  
  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
 
  return "<button id='buttonoption' onclick='showValuee(" + JSON.stringify(table) + ")' style='background-color: transparent; border: 0; width: 100%;'><a href='#'>" + table.mesa_number + "</a></button>"
  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/

}




async function getAvailableTables(rest_id){

  console.log("Obtendo os restaurantes");
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("dropdown-content");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/getmesas/restaurante/" + rest_id,
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
  
  let html = "";
  
   

      for(let restaurant of suggestedrestaurants){
       console.log("Restaurante: " + restaurant);
       html += createtableHTML(restaurant);
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

window.onload = function exampleFunction() {

    let utilizador_id = sessionStorage.getItem("utilizador_id")
    var utilizador_name = sessionStorage.getItem("utilizador_name");
    let utilizador_username = sessionStorage.getItem("utilizador_username");
    var utilizador_email = sessionStorage.getItem("utilizador_email");
    var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

 var establishment_id = sessionStorage.getItem('establishment_id');
 var establishment_name = sessionStorage.getItem('establishment_name');
 var establishment_description = sessionStorage.getItem('establishment_description');
 var restaurant_id = sessionStorage.getItem('restaurant_id');
 var restaurante_number_tables = sessionStorage.getItem('restaurante_number_tables');
 var establishment_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
 var type_service_identifier = sessionStorage.getItem('type_service_identifier');
 var type_restaurant_id = sessionStorage.getItem('type_restaurant_id');
 var type_restaurant_name = sessionStorage.getItem('type_restaurant_name');
 var state_id = sessionStorage.getItem('state_id');

    console.log('The Script will load now.');

    console.log("A chamar a funcao");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);

    console.log("RESTAURANTE NAME: " + establishment_name);
    console.log("RESTAURANTE ID: " + establishment_id);
    console.log("REST DEFINITIVO ID: " + restaurant_id);
    console.log("DESCRIPTION RESTAURANTE: " + establishment_description);
    console.log("STATE ID: " + state_id);
  
 document.getElementById("titulorestaurante").innerHTML = establishment_name;

 document.getElementById("descricaorestaurante").innerHTML = establishment_description;

  getLatitudePlace(restaurant_id);

  if(state_id == 1){
    document.getElementById("createdplacestate").style.visibility = "visible";
  } else if(state_id == 2){
    document.getElementById("inanalysisplacestate").style.visibility = "visible";
  } else {
    document.getElementById("verifiedplacestate").style.visibility = "visible";
  } 

  getNumberLikesRestaurant(restaurant_id);

  getChangeLike(utilizador_id, restaurant_id);

   // initMap(latitude_teste);

    //getPlacePosition(restaurant_id);

    //getNumberLikesRestaurant(restaurant_id);

    
    navigator.geolocation.getCurrentPosition(

      function (position) {
        initMap(position.coords.latitude, position.coords.longitude)

        console.log("LATITUDE: " + position.coords.latitude + "| LONGITUDE: " + position.coords.longitude);
        
      },
      function errorCallback(error) {
        console.log(error)
      }
  
     );
    

   // getAperitivos(restaurant_id, 1);
   // getEntradas(restaurant_id, 2);
   // getPratosPrincipais(restaurant_id, 3);
   // getSobremesas(restaurant_id, 4);
   // getPratosdoDia(restaurant_id, 5);

  

   document.getElementById('addlike').addEventListener("click", function(){

    console.log("Funcao Chamada");
    putLike(restaurant_id, utilizador_id);
    document.getElementById('addlike').style.visibility = "hidden";
    document.getElementById('removelike').style.visibility = "visible";
  
  });

  document.getElementById('removelike').addEventListener("click", function(){

    console.log("Funcao Chamada");
    deleteLike(restaurant_id, utilizador_id);
    document.getElementById('addlike').style.visibility = "visible";
    document.getElementById('removelike').style.visibility = "hidden";
  
  });


   getAvailableTables(restaurant_id);

   document.getElementById('reportrestaurant').addEventListener("click", function(){

    reportRest(restaurant_id);

  });

    //getAleatorioRestaurantes();

}


