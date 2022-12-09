function createtableHTML(prato){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div class='menu_item'><em>Preço: " + prato.mesa_price + " $</em><h4>Numero: " + prato.mesa_number + " | Pessoas: " + prato.mesa_size + "</h4><p>Descrição: " + prato.mesa_type_name + "</p></div><hr>"
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }




async function getInterior(){

    console.log("Obtendo os restaurantes")
    
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize13");
     var restaurant_id = sessionStorage.getItem("restaurant_id");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
     console.log("Restaurante ID: " + restaurant_id);
    
    try{
    
    let suggestedrestaurants = await $.ajax({
    
    url: "/users/seetables/filter/" + restaurant_id + "/" + 1,
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
    
    let html = "";
    
    for(let restaurant of suggestedrestaurants){
     console.log("Restaurante: " + restaurant);
     html += createplateHTML(restaurant);
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     restaurantesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }

    async function getEntradas(){

        console.log("Obtendo os restaurantes")
        
        // let recipeName = document.getElementById("nome1")
         let restaurantesElem = document.getElementById("organize13");
         var restaurant_id = sessionStorage.getItem("restaurant_id");
         var utilizador_id = sessionStorage.getItem("utilizador_id");
         console.log("setItem->userId = " + utilizador_id);
         console.log("Restaurante ID: " + restaurant_id);
        
        try{
        
        let suggestedrestaurants = await $.ajax({
        
        url: "/users/seeplates/filter/" + restaurant_id + "/" + 2,
        method: "get",
        dataType: "json",
        
        });
        
        console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
        
        let html = "";
        
        for(let restaurant of suggestedrestaurants){
         console.log("Restaurante: " + restaurant);
         html += createplateHTML(restaurant);
        }
        
        console.log("OBTEVE");
        //  recipeName.innerHTML = html;
        
       // restaurantesElem.innerHTML = html;
      
         restaurantesElem.innerHTML = html;
        
        
        } catch(err){
         console.log(err);
        }
        }

        async function getPratosPrincipais(){

            console.log("Obtendo os restaurantes")
            
            // let recipeName = document.getElementById("nome1")
             let restaurantesElem = document.getElementById("organize13");
             var restaurant_id = sessionStorage.getItem("restaurant_id");
             var utilizador_id = sessionStorage.getItem("utilizador_id");
             console.log("setItem->userId = " + utilizador_id);
             console.log("Restaurante ID: " + restaurant_id);
            
            try{
            
            let suggestedrestaurants = await $.ajax({
            
            url: "/users/seeplates/filter/" + restaurant_id + "/" + 3,
            method: "get",
            dataType: "json",
            
            });
            
            console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
            
            let html = "";
            
            for(let restaurant of suggestedrestaurants){
             console.log("Restaurante: " + restaurant);
             html += createplateHTML(restaurant);
            }
            
            console.log("OBTEVE");
            //  recipeName.innerHTML = html;
            
           // restaurantesElem.innerHTML = html;
          
             restaurantesElem.innerHTML = html;
            
            
            } catch(err){
             console.log(err);
            }
            }

            async function getSobremesas(){

                console.log("Obtendo os restaurantes")
                
                // let recipeName = document.getElementById("nome1")
                 let restaurantesElem = document.getElementById("organize13");
                 var restaurant_id = sessionStorage.getItem("restaurant_id");
                 var utilizador_id = sessionStorage.getItem("utilizador_id");
                 console.log("setItem->userId = " + utilizador_id);
                 console.log("Restaurante ID: " + restaurant_id);
                
                try{
                
                let suggestedrestaurants = await $.ajax({
                
                url: "/users/seeplates/filter/" + restaurant_id + "/" + 4,
                method: "get",
                dataType: "json",
                
                });
                
                console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
                
                let html = "";
                
                for(let restaurant of suggestedrestaurants){
                 console.log("Restaurante: " + restaurant);
                 html += createplateHTML(restaurant);
                }
                
                console.log("OBTEVE");
                //  recipeName.innerHTML = html;
                
               // restaurantesElem.innerHTML = html;
              
                 restaurantesElem.innerHTML = html;
                
                
                } catch(err){
                 console.log(err);
                }
                }

                async function getPratosdoDia(){

                    console.log("Obtendo os restaurantes")
                    
                    // let recipeName = document.getElementById("nome1")
                     let restaurantesElem = document.getElementById("organize13");
                     var restaurant_id = sessionStorage.getItem("restaurant_id");
                     var utilizador_id = sessionStorage.getItem("utilizador_id");
                     console.log("setItem->userId = " + utilizador_id);
                     console.log("Restaurante ID: " + restaurant_id);
                    
                    try{
                    
                    let suggestedrestaurants = await $.ajax({
                    
                    url: "/users/seeplates/filter/" + restaurant_id + "/" + 5,
                    method: "get",
                    dataType: "json",
                    
                    });
                    
                    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
                    
                    let html = "";
                    
                    for(let restaurant of suggestedrestaurants){
                     console.log("Restaurante: " + restaurant);
                     html += createplateHTML(restaurant);
                    }
                    
                    console.log("OBTEVE");
                    //  recipeName.innerHTML = html;
                    
                   // restaurantesElem.innerHTML = html;
                  
                     restaurantesElem.innerHTML = html;
                    
                    
                    } catch(err){
                     console.log(err);
                    }
                    }

    async function getMesas(){

        console.log("Obtendo as mesas")
        
        // let recipeName = document.getElementById("nome1")
         let restaurantesElem = document.getElementById("organize13");
         var restaurant_id = sessionStorage.getItem("restaurant_id");
         var utilizador_id = sessionStorage.getItem("utilizador_id");
         console.log("setItem->userId = " + utilizador_id);
         console.log("Restaurante ID: " + restaurant_id);
        
        try{
        
        let suggestedrestaurants = await $.ajax({
        
        url: "/users/seetables/filter/" + restaurant_id,
        method: "get",
        dataType: "json",
        
        });
        
        console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
        
        let html = "";
        
        for(let restaurant of suggestedrestaurants){
         console.log("Restaurante: " + restaurant);
         html += createtableHTML(restaurant);
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
    console.log('The Script will load now.');
  
    var utilizador_id = sessionStorage.getItem("utilizador_id")
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

 console.log("A chamar a funcao");
  
 console.log("USERNAME: " + utilizador_username);
 console.log("ID: " + utilizador_id);
 console.log("TYPE ID: " + utilizador_type_id);

 console.log("RESTAURANTE NAME: " + establishment_name);
 console.log("RESTAURANTE ID: " + establishment_id);
 console.log("RESTAURANTE ID: " + restaurant_id);

 getMesas();
 
 document.getElementById("titulorestaurante").innerHTML = establishment_name;

 document.getElementById("descricaorestaurante").innerHTML = establishment_description;

 getNumberLikesRestaurant(restaurant_id);

    

    //getAperitivos(restaurant_id, 1);
    //getEntradas(restaurant_id, 2);
    //getPratosPrincipais(restaurant_id, 3);
    //getSobremesas(restaurant_id, 4);
    //getPratosdoDia(restaurant_id, 5);

    //getAleatorioRestaurantes();

}
