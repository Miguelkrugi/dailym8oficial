window.onload = function exampleFunction() {
  console.log('The Script will load now.');

  var utilizador_name = sessionStorage.getItem("utilizador_name");
  let utilizador_username = sessionStorage.getItem("utilizador_username");
  var utilizador_email = sessionStorage.getItem("utilizador_email");
  var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

  console.log(utilizador_username);

  //GET DOS JOGOS

  getSuggestedRestaurants();

  //getSuggestedAcomodacoes();

  //getSuggestedEstacionamentos();

}

async function getSuggestedRestaurants(){

  console.log("Obtendo os restaurantes")
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("owl-carousel owl-theme carousel_4");
   var utilizador_id = sessionStorage.getItem("utilizador_id");
   console.log("setItem->userId = " + utilizador_id);
  
  try{
  
  let suggestedrestaurants = await $.ajax({
  
  url: "/users/showrandomsuggestedrestaurants/",
  method: "get",
  dataType: "json",
  
  });
  
  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
  
  let html = "";
  
  for(let restaurant of suggestedrestaurants){
   console.log("Restaurante: " + restaurant);
   html += createrestaurantHTML(restaurant);
  }
  
  console.log("OBTEVE");
  //  recipeName.innerHTML = html;
  
  restaurantesElem.innerHTML = html;
  
  
  } catch(err){
   console.log(err);
  }
  }


  function createrestaurantHTML(restaurante){
  
    return "<div class='item'>" + "<div class='strip'>" + "<figure>" + "<img src='img/lazy-placeholder.png' data-src='img/location_1.jpg' class='owl-lazy' alt=''>" + "<small>" + restaurante.type_restaurant_name + "</small>" + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }


async function consla(){

  console.log("A funcionar...");
}

async function registreamento() {

    console.log("Storing...");
   
   
   
   console.log("Registering user...");
   
   try {
   
     var type_user = 1;
   
   
     let data = {
   
       utilizador_name: document.getElementById("fname").value,
       utilizador_username: document.getElementById("fusername").value,
       utilizador_email: document.getElementById("femail").value,
       utilizador_password: document.getElementById("fpswd").value,
       utilizador_type_id: type_user,
   
     }
   
     let newUser = await $.ajax({
   
         url: "/users/insertnewuser",
         method: "post",
         data: JSON.stringify(data),
         contentType: "application/json",
         dataType: "json"
   
         
     });

     console.log("Inserted new user with id: " + newUser.utilizador_id)
     
   } catch (err) {
     
       console.log(err);
   
   }
   console.log("Stored...");
   }




   async function login(){

    console.log("Função login chamada...")

   try{

    let object = {

         utilizador_username: document.getElementById("fnamelogin").value,
         utilizador_password: document.getElementById("fpswdlogin").value,
  
    };

    console.log("Sending the object with values: " + object);

    let authUser = await $.ajax({
        url: "/users/loginuser",
        method: "post",
        data: JSON.stringify(object),
        contentType: "application/json",
        dataType: "json",


    });
   // alert("Authenticate user: " + JSON.stringify(authUser));
   console.log("Verifying user with username: " + authUser.utilizador_username + " and password: " + authUser.utilizador_password);

    sessionStorage.setItem('utilizador_id', authUser.utilizador_id);
    sessionStorage.setItem('utilizador_name', authUser.utilizador_name);
    sessionStorage.setItem('utilizador_username', authUser.utilizador_username);
    sessionStorage.setItem('utilizador_email', authUser.utilizador_email);
    sessionStorage.setItem('utilizador_password', authUser.utilizador_password);
    sessionStorage.setItem('utilizador_type_id', authUser.utilizador_type_id);
  //  window.alert('login sucessfull');
    
    //window.location.assign("https://bodyhealthweb.herokuapp.com/dashboardTemplate.html");

    
    console.log(authUser.user_id);
    window.location.replace("http://localhost:3000/index-2.html");
   }  catch (err) {
    console.log(err);
  //  window.alert('something wron;g')
   // window.location.assign("http://bodyhealthweb.herokuapp.com/login.html");

    }

}