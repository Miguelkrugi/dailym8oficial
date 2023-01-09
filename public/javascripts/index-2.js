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
  
    //GET DOS ESTABELECIMENTOS
  
    getSuggestedRestaurants();
  
    getSuggestedAcomodacoes();
  
    getSuggestedEstacionamentos();
  
    getThreeComments();
  
    if(utilizador_type_id == 1){
  
      document.getElementById("tornardono").innerHTML = "É dono de um estabelecimento ?"
      document.getElementById("tornardono").style.visibility = "visible";
      document.getElementById("juntarcomunidadecliente").style.visibility = "visible";
      document.getElementById("becomegestor").style.visibility = "visible";
      document.getElementById("meusestabelecimentos").style.visibility = "hidden";
  
    } else if(utilizador_type_id == 2) { //É UM CLIENTE
  
      document.getElementById("gerirestabelecimentos").innerHTML = "Gestão dos meus estabelecimentos"
      document.getElementById("gerirestabelecimentos").style.visibility = "visible";
      document.getElementById("comecaragerir").style.visibility = "visible";
      document.getElementById("gotogestor").style.visibility = "visible";
      document.getElementById("meusestabelecimentos").style.visibility = "visible";
  
      
  
    } else if(utilizador_type_id == 3){ //ADMINISTRADOR

        document.getElementById("gerirestabelecimentos").innerHTML = "Administração do website"
        document.getElementById("gerirestabelecimentos").style.visibility = "visible";
        document.getElementById("comecaragerir").innerHTML = "Começar a administrar e moderar o website."
        document.getElementById("comecaragerir").style.visibility = "visible";
        document.getElementById("gotoadmin").style.visibility = "visible";


    } 

   
  
  }

 

  async function openrestaurant2(restaurante){

    console.log("FUNÇÃO CHAMADA!");
    console.log("NOME: " + restaurante.establishment_name)
      console.log("DESCRICAO: " + restaurante.establishment_description)
      console.log("ID: " + restaurante.restaurant_id)
      console.log("STATE ID: " + restaurante.state_id)
      
      sessionStorage.setItem('establishment_id', restaurante.establishment_id);
      sessionStorage.setItem('establishment_name', restaurante.establishment_name);
      sessionStorage.setItem('establishment_description', restaurante.establishment_description);
      sessionStorage.setItem('restaurant_id', restaurante.restaurant_id);
      sessionStorage.setItem('restaurante_number_tables', restaurante.restaurante_number_tables);
      sessionStorage.setItem('establishment_utilizador_id', restaurante.establishment_utilizador_id);
      sessionStorage.setItem('type_service_identifier', restaurante.type_service_identifier);
      sessionStorage.setItem('type_restaurant_id', restaurante.type_restaurant_id);
      sessionStorage.setItem('type_restaurant_name', restaurante.type_restaurant_name);
      sessionStorage.setItem('state_id', restaurante.state_id);
  
  
  }

  function createrestaurantHTML(restaurante){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-restaurant.html' onclick='openrestaurant2(" + JSON.stringify(restaurante) + ")' class='strip_info' ><small>" + restaurante.type_restaurant_name + "</small><div class='item_title'><h3>" + restaurante.establishment_name + "</h3><small>" + restaurante.restaurante_number_tables + "</small></div></a></figure></div></div>"
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }



async function getSuggestedRestaurants(){

  console.log("Obtendo os restaurantes");
  
  // let recipeName = document.getElementById("nome1")
   let restaurantesElem = document.getElementById("organize2");
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
  
    if(suggestedrestaurants.length > 0){

      for(let restaurant of suggestedrestaurants){
       console.log("Restaurante: " + restaurant);
       html += createrestaurantHTML(restaurant);
      }

    } else {

      console.log("NADA ENCONTRADO");

    }


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

  async function openacomodacao(restaurante){

    console.log("FUNÇÃO CHAMADA!");
    console.log("NOME: " + restaurante.establishment_name)
      console.log("DESCRICAO: " + restaurante.establishment_description)
      console.log("ID: " + restaurante.equipment_service_id)
      console.log("STATE ID: " + restaurante.state_id)
      
      sessionStorage.setItem('establishment_id', restaurante.establishment_id);
      sessionStorage.setItem('establishment_name', restaurante.establishment_name);
      sessionStorage.setItem('establishment_description', restaurante.establishment_description);
      sessionStorage.setItem('equipment_service_id', restaurante.equipment_service_id);
      sessionStorage.setItem('number_acomodacoes', restaurante.number_acomodacoes);
      sessionStorage.setItem('establishment_utilizador_id', restaurante.establishment_utilizador_id);
      sessionStorage.setItem('type_service_identifier', restaurante.type_service_identifier);
      sessionStorage.setItem('state_id', restaurante.state_id);
  
  
  }

  function createacomodacoesHTML(servico_acomodacao){
  
    console.log("Função chamada para criar o div da acomodação");
   
    return "<div  style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-acomodacao.html'  class='strip_info' onclick='openacomodacao(" + JSON.stringify(servico_acomodacao) + ")'><div class='item_title'  class='item'><h3>" + servico_acomodacao.establishment_name + "</h3><small>" + servico_acomodacao.number_acomodacoes + "</small></div></a></figure></div></div>"
  
  }

  async function getSuggestedAcomodacoes(){

    console.log("Obtendo os restaurantes")
    
    // let recipeName = document.getElementById("nome1")
     let acomodacoesElem = document.getElementById("organize3");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let suggestedacomodacoes = await $.ajax({
    
    url: "/users/showrandomsuggestedacomodacoes/",
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedacomodacoes));
    
    let html = "";
    
    if(suggestedacomodacoes.length > 0){

       for(let acomodacao of suggestedacomodacoes){
        console.log("Restaurante: " + acomodacao);
        html += createacomodacoesHTML(acomodacao);
       }

    } else{

    //    document.getElementById("withoutresultspraia").style.visibility = "visible";
        console.log("NADA ENCONTRADO");
    
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     acomodacoesElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }

    function createestacionamentoHTML(estacionamento){
        
        //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
       
        return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-restaurant.html' class='strip_info' onclick='printtest()'><div class='item_title'><h3>" + estacionamento.establishment_name + "</h3><small>" + estacionamento.parking_lot_number_spots + "</small></div></a></figure></div></div>"
        // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
      
       /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
      
      }

    async function getSuggestedEstacionamentos(){

        console.log("Obtendo os restaurantes")
        
        // let recipeName = document.getElementById("nome1")
         let lugaresElem = document.getElementById("organize4");
         var utilizador_id = sessionStorage.getItem("utilizador_id");
         console.log("setItem->userId = " + utilizador_id);
        
        try{
        
        let suggestedestacionamentos = await $.ajax({
        
        url: "/users/showrandomsuggestedestacionamentos/",
        method: "get",
        dataType: "json",
        
        });
        
        console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
        
        let html = "";
        
       
        for(let spot of suggestedestacionamentos){
         console.log("Restaurante: " + spot);
         html += createestacionamentoHTML(spot);
        }
       
      
          //document.getElementById("withoutresultsestacionamentos").style.visibility = "visible";
          console.log("NADA ENCONTRADO");
      
        
        
        console.log("OBTEVE");
        //  recipeName.innerHTML = html;
        
       // restaurantesElem.innerHTML = html;
      
         lugaresElem.innerHTML = html;
        
        
        } catch(err){
         console.log(err);
        }
        }
      
       
        function createcomentarioHTML(comentario){
  
            return "<div class='item'><blockquote>" + "'" + comentario.comentario_texto + "'" + "</blockquote><cite><strong>"+ comentario.utilizador_name + "</strong><span>" + comentario.comentario_date + "</span></cite></div>";
           
            //return "<div class='item' style='width:23%; height:35%;'><div class='strip'><figure><a href='detail-restaurant.html' class='strip_info' onclick='printtest()'><div class='item_title'><h3>" + estacionamento.establishment_name + "</h3><small>" + estacionamento.parking_lot_number_spots + "</small></div></a></figure></div></div>"
          
          
          }
          
          async function getThreeComments(){
          
            console.log("Obtendo os comentarios")
            
            // let recipeName = document.getElementById("nome1")
             let commentsElem = document.getElementById("owl-carousel owl-theme carousel_1 testimonials add_top_30");
             var utilizador_id = sessionStorage.getItem("utilizador_id");
             console.log("setItem->userId = " + utilizador_id);
            
            try{
            
            let suggestedcomments = await $.ajax({
            
            url: "/users/showrandomsuggestcomments/",
            method: "get",
            dataType: "json",
            
            });
            
            console.log("[utilizador] utilizador = " + JSON.stringify(suggestedcomments));
            
            let html = "";
            
            
            for(let comment of suggestedcomments){
             console.log("Restaurante: " + comment);
             html += createcomentarioHTML(comment);
            }
            
            
            console.log("OBTEVE");
            //  recipeName.innerHTML = html;
            
           // restaurantesElem.innerHTML = html;
          
             commentsElem.innerHTML = html;
            
            
            } catch(err){
             console.log(err);
            }
            }