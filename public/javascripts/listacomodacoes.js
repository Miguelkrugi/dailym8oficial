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

    getAleatorioAcomodacoes();

}

async function numeroacomodacoesdecrescente(){

    console.log("Obtendo os servicos por numero de acomodacoes decrescente")
    
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize6");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let randomservices = await $.ajax({
    
    url: "/users/showrandomservicosacomodacao/nracomodacoes/decrescente",
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(randomservices));
    
    let html = "";
    
    for(let service of randomservices){
     console.log("Restaurante: " + service);
     html += createserviceHTML(service);
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     restaurantesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }

async function numeroacomodacoescrescente(){

    console.log("Obtendo os servicos por numero de acomodacoes crescente")
    
    // let recipeName = document.getElementById("nome1")
     let restaurantesElem = document.getElementById("organize6");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let randomservices = await $.ajax({
    
    url: "/users/showrandomservicosacomodacao/nracomodacoes/crescente",
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(randomservices));
    
    let html = "";
    
    for(let service of randomservices){
     console.log("Restaurante: " + service);
     html += createserviceHTML(service);
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     restaurantesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }

    async function openacomodacao2(restaurante){

      console.log("FUNÇÃO CHAMADA!");
      console.log("NOME: " + restaurante.establishment_name)
        console.log("DESCRICAO: " + restaurante.establishment_description)
        console.log("ID: " + restaurante.equipment_service_id)
        console.log("LATITUDE: " + restaurante.local_latitude)
        console.log("LONGITUDE: " + restaurante.local_longitude)
        
        sessionStorage.setItem('establishment_id', restaurante.establishment_id);
        sessionStorage.setItem('establishment_name', restaurante.establishment_name);
        sessionStorage.setItem('establishment_description', restaurante.establishment_description);
        sessionStorage.setItem('restaurant_id', restaurante.equipment_service_id);
        sessionStorage.setItem('restaurante_number_tables', restaurante.number_acomodacoes);
        sessionStorage.setItem('establishment_utilizador_id', restaurante.establishment_utilizador_id);
        sessionStorage.setItem('type_service_identifier', restaurante.type_service_identifier);
        sessionStorage.setItem('local_id', restaurante.local_id);
        sessionStorage.setItem('local_morada', restaurante.local_morada);
        sessionStorage.setItem('ref_system_id', restaurante.ref_system_id);
        sessionStorage.setItem('geometry_info_point', restaurante.geometry_info_point);
        sessionStorage.setItem('local_servico_acomodacoes_id', restaurante.local_servico_acomodacoes_id);
        sessionStorage.setItem('local_latitude', restaurante.local_latitude);
        sessionStorage.setItem('local_longitude', restaurante.local_longitude);
    
    }

function createserviceHTML(service){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div class='item' style='width:24%; height:37%;'><div class='strip'><figure><a href='detail-acomodacao.html' class='strip_info' onclick='openacomodacao2(" + JSON.stringify(service) + ")'><small>" + service.local_morada + "</small><div class='item_title'><h3>" + service.establishment_name + "</h3><small>" + service.number_acomodacoes + "</small></div></a></figure></div></div>"
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }

async function getAleatorioAcomodacoes(){

    console.log("Obtendo os restaurantes")
    
    // let recipeName = document.getElementById("nome1")
     let servAcomElem = document.getElementById("organize6");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let randomservices = await $.ajax({
    
    url: "/users/showrandomservicosacomodacao/",
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(randomservices));
    
    let html = "";
    
    for(let service of randomservices){
     console.log("Servico: " + service);
     html += createserviceHTML(service);
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     servAcomElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }