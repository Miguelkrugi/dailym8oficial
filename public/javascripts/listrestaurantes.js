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

    getAleatorioRestaurantes();

}

async function openrestaurant(restaurante){

  console.log("FUNÇÃO CHAMADA!");
  /*
  console.log("ID DO RESTAURANTE: " + restaurante.establishment_id);
  sessionStorage.setItem('establishment_id', restaurante.establishment_id);
  sessionStorage.setItem('establishment_name', restaurante.establishment_name);
  sessionStorage.setItem('restaurant_id', restaurante.restaurant_id);
  sessionStorage.setItem('restaurante_number_tables', restaurante.restaurante_number_tables);
  sessionStorage.setItem('establishment_utilizador_id', restaurante.establishment_utilizador_id);
  sessionStorage.setItem('type_service_identifier', restaurante.type_service_identifier);
  sessionStorage.setItem('type_restaurant_id', restaurante.type_restaurant_id);
  sessionStorage.setItem('type_restaurant_name', restaurante.type_restaurant_name);
*/
/////////////////////TERMINAR NA TERÇA FEIRA OU AMANHA SE DESPACHAR A MATERIA MAIS CEDO E FAZER AS TAREFAS MARCADAS

}

function createrestaurantHTML(restaurante){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<a onclick='openrestaurant(" + JSON.stringify(restaurante) + ")'><div class='item' style='width:24%; height:37%;'><div class='strip'><figure><a class='strip_info' onclick='printtest()'><small>" + restaurante.type_restaurant_name + "</small><div class='item_title'><h3>" + restaurante.establishment_name + "</h3><small>" + restaurante.restaurante_number_tables + "</small></div></a></figure></div></div>"
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }



async function getAleatorioRestaurantes(){

    console.log("Obtendo os restaurantes")
    
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize6");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let randomrestaurants = await $.ajax({
    
    url: "/users/showrandomrestaurants/",
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(randomrestaurants));
    
    let html = "";
    
    for(let restaurant of randomrestaurants){
     console.log("Restaurante: " + restaurant);
     html += createrestaurantHTML(restaurant);
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     restaurantesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }

    async function filterRestaurantesType(type){

        console.log("Obtendo os restaurantes")
        
        // let recipeName = document.getElementById("nome1")
         let restaurantesElem = document.getElementById("organize6");
         var utilizador_id = sessionStorage.getItem("utilizador_id");
         console.log("setItem->userId = " + utilizador_id);
        
        try{
        
        let randomrestaurants = await $.ajax({
        
        url: "/users/showrandomrestaurants/" + type,
        method: "get",
        dataType: "json",
        
        });
        
        console.log("[utilizador] utilizador = " + JSON.stringify(randomrestaurants));
        
        let html = "";
        
        for(let restaurant of randomrestaurants){
         console.log("Restaurante: " + restaurant);
         html += createrestaurantHTML(restaurant);
        }
        
        console.log("OBTEVE");
        //  recipeName.innerHTML = html;
        
       // restaurantesElem.innerHTML = html;
      
         restaurantesElem.innerHTML = html;
        
        
        } catch(err){
         console.log(err);
        }
        }


        async function numeromesascrescente(){

            console.log("Obtendo os restaurantes por numero de mesas crescente")
            
            // let recipeName = document.getElementById("nome1")
             let restaurantesElem = document.getElementById("organize6");
             var utilizador_id = sessionStorage.getItem("utilizador_id");
             console.log("setItem->userId = " + utilizador_id);
            
            try{
            
            let randomrestaurants = await $.ajax({
            
            url: "/users/showrandomrestaurants/nrmesas/crescente",
            method: "get",
            dataType: "json",
            
            });
            
            console.log("[utilizador] utilizador = " + JSON.stringify(randomrestaurants));
            
            let html = "";
            
            for(let restaurant of randomrestaurants){
             console.log("Restaurante: " + restaurant);
             html += createrestaurantHTML(restaurant);
            }
            
            console.log("OBTEVE");
            //  recipeName.innerHTML = html;
            
           // restaurantesElem.innerHTML = html;
          
             restaurantesElem.innerHTML = html;
            
            
            } catch(err){
             console.log(err);
            }
            }

            async function printtest(){

                console.log("Funcionou");

            }

            async function numeromesasdecrescente(){

                console.log("Obtendo os restaurantes por numero de mesas crescente")
                
                // let recipeName = document.getElementById("nome1")
                 let restaurantesElem = document.getElementById("organize6");
                 var utilizador_id = sessionStorage.getItem("utilizador_id");
                 console.log("setItem->userId = " + utilizador_id);
                
                try{
                
                let randomrestaurants = await $.ajax({
                
                url: "/users/showrandomrestaurants/nrmesas/decrescente",
                method: "get",
                dataType: "json",
                
                });
                
                console.log("[utilizador] utilizador = " + JSON.stringify(randomrestaurants));
                
                let html = "";
                
                for(let restaurant of randomrestaurants){
                 console.log("Restaurante: " + restaurant);
                 html += createrestaurantHTML(restaurant);
                }
                
                console.log("OBTEVE");
                //  recipeName.innerHTML = html;
                
               // restaurantesElem.innerHTML = html;
              
                 restaurantesElem.innerHTML = html;
                
                
                } catch(err){
                 console.log(err);
                }
                }