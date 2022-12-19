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

    console.log("Likes: " + qlikes.count);
    
   
   document.getElementById("quantidadelikes").innerHTML = "Likes: " + qlikes.count;
    
    
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
    
        console.log();
        
        
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

 var establishment_id = sessionStorage.getItem('establishment_id');
 var establishment_name = sessionStorage.getItem('establishment_name');
 var establishment_description = sessionStorage.getItem('establishment_description');
 var restaurant_id = sessionStorage.getItem('restaurant_id');
 var restaurante_number_tables = sessionStorage.getItem('restaurante_number_tables');
 var establishment_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
 var type_service_identifier = sessionStorage.getItem('type_service_identifier');
 


 var local_id = sessionStorage.getItem('local_id');
 var local_morada = sessionStorage.getItem('local_morada');
 var ref_system_id = sessionStorage.getItem('ref_system_id');
 var geometry_info_id = sessionStorage.getItem('geometry_info_point');
 var local_servico_acomodacoes_id = sessionStorage.getItem('local_servico_acomodacoes_id');
 var local_latitude = sessionStorage.getItem('local_latitude');
 var local_longitude = sessionStorage.getItem('local_id');


    console.log('The Script will load now.');

    console.log("A chamar a funcao");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);

    console.log("RESTAURANTE NAME: " + establishment_name);
    console.log("RESTAURANTE ID: " + establishment_id);
    console.log("REST DEFINITIVO ID: " + restaurant_id);
    console.log("DESCRIPTION RESTAURANTE: " + establishment_description);
    console.log("LATITUDE: " + local_latitude);
    console.log("LONGITUDE: " + local_longitude);
  
 document.getElementById("titulorestaurante").innerHTML = establishment_name;

 document.getElementById("descricaorestaurante").innerHTML = establishment_description;

    getPlacePosition();

    getNumberLikesRestaurant(restaurant_id);

    

   // getAperitivos(restaurant_id, 1);
   // getEntradas(restaurant_id, 2);
   // getPratosPrincipais(restaurant_id, 3);
   // getSobremesas(restaurant_id, 4);
   // getPratosdoDia(restaurant_id, 5);

  

    

    //getAleatorioRestaurantes();

}


