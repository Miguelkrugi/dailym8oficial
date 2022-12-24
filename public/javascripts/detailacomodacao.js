async function getNumberLikesAcomodacao(restaurante_id){

    console.log("Obtendo os likes")
    
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let qlikes = await $.ajax({
    
    url: "/users/countlikeacomodacao/" + restaurante_id,
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
    
        console.log();
        
        
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
            
            url: "/users/place/position/acomodacao/" + restaurante_id,
            method: "get",
            dataType: "json",
            
            });
    
            console.log("SOUL")
        
            console.log("Morada: " + position[0].local_morada);
            console.log("Latitude: " + position[0].local_latitude);
            console.log("Longitude: " + position[0].local_longitude);

            var latitude = position[0].local_latitude;
            var longitude = position[0].local_longitude;

            console.log("Latitude again: " + latitude)

            initMap(latitude, longitude);       
            
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
 var equipment_service_id = sessionStorage.getItem('equipment_service_id');
 var number_acomodacoes = sessionStorage.getItem('number_acomodacoes');
 var establishment_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
 var type_service_identifier = sessionStorage.getItem('type_service_identifier');
 


 var local_id = sessionStorage.getItem('local_id');
 var local_morada = sessionStorage.getItem('local_morada');
 var ref_system_id = sessionStorage.getItem('ref_system_id');
 var geometry_info_id = sessionStorage.getItem('geometry_info_point');
 var local_servico_acomodacoes_id = sessionStorage.getItem('local_servico_acomodacoes_id');
 var local_latitude = sessionStorage.getItem('local_latitude');
 var local_longitude = sessionStorage.getItem('local_id');
 var state_id = sessionStorage.getItem('state_id');



    console.log('The Script will load now.');

    console.log("A chamar a funcao");
  
    console.log("USERNAME: " + utilizador_username);
    console.log("ID: " + utilizador_id);
    console.log("TYPE ID: " + utilizador_type_id);

    console.log("RESTAURANTE NAME: " + establishment_name);
    console.log("RESTAURANTE ID: " + establishment_id);
    console.log("REST DEFINITIVO ID: " + equipment_service_id);
    console.log("DESCRIPTION RESTAURANTE: " + establishment_description);
    console.log("LATITUDE: " + local_latitude);
    console.log("LONGITUDE: " + local_longitude);
  
 document.getElementById("titulorestaurante").innerHTML = establishment_name;

 document.getElementById("descricaorestaurante").innerHTML = establishment_description;

 getLatitudePlace(equipment_service_id);

 if(state_id == 1){
   document.getElementById("createdplacestate").style.visibility = "visible";
 } else if(state_id == 2){
   document.getElementById("inanalysisplacestate").style.visibility = "visible";
 } else {
   document.getElementById("verifiedplacestate").style.visibility = "visible";
 } 

    getNumberLikesAcomodacao(equipment_service_id);

    

   // getAperitivos(restaurant_id, 1);
   // getEntradas(restaurant_id, 2);
   // getPratosPrincipais(restaurant_id, 3);
   // getSobremesas(restaurant_id, 4);
   // getPratosdoDia(restaurant_id, 5);

  

    

    //getAleatorioRestaurantes();

}


