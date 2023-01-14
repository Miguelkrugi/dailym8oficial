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

    getAleatorioEstacionamentos();

}

async function openestacionamento2(restaurante){

  console.log("FUNÇÃO CHAMADA!");
  console.log("NOME: " + restaurante.establishment_name)
    console.log("DESCRICAO: " + restaurante.establishment_description)
    console.log("ID: " + restaurante.restaurant_id)
    
    sessionStorage.setItem('establishment_id', restaurante.establishment_id);
    sessionStorage.setItem('establishment_name', restaurante.establishment_name);
    sessionStorage.setItem('establishment_description', restaurante.establishment_description);
    sessionStorage.setItem('parking_lot_id', restaurante.parking_lot_id);
    sessionStorage.setItem('parking_lot_number_spots', restaurante.parking_lot_number_spots);
    sessionStorage.setItem('establishment_utilizador_id', restaurante.establishment_utilizador_id);
    sessionStorage.setItem('type_service_identifier', restaurante.type_service_identifier);
    sessionStorage.setItem('state_id', restaurante.state_id)

}

function createestacionamentoHTML(estacionamento){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div class='item' style='width:24%; height:37%;'><div class='strip'><figure><a href='detail-estacionamento.html' class='strip_info'  onclick='openestacionamento2(" + JSON.stringify(estacionamento) + ")'><small>" + estacionamento.local_morada + "</small><div class='item_title'><h3>" + estacionamento.establishment_name + "</h3><small>" + estacionamento.parking_lot_number_spots + "</small></div></a></figure></div></div>"
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }

async function getAleatorioEstacionamentos(){

    console.log("Obtendo os estacionamentos")
    
    // let recipeName = document.getElementById("nome1")
     let estacionamentoElem = document.getElementById("organize6");
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let randomestacionamentos = await $.ajax({
    
    url: "/users/showrandomestacionamentos/",
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(randomestacionamentos));
    
    let html = "";
    
    for(let estacionamento of randomestacionamentos){
     console.log("Estacionamento: " + estacionamento);
     html += createestacionamentoHTML(estacionamento);
    }
    
    console.log("OBTEVE");
    //  recipeName.innerHTML = html;
    
   // restaurantesElem.innerHTML = html;
  
     estacionamentoElem.innerHTML = html;
    
    
    } catch(err){
     console.log(err);
    }
    }

    ////////////////////////////////////////////////////////////////////

    async function numerolugarescrescente(){

        console.log("Obtendo os servicos por numero de lugares crescente");
        
        // let recipeName = document.getElementById("nome1")
         let estacionamentosElem = document.getElementById("organize6");
         var utilizador_id = sessionStorage.getItem("utilizador_id");
         console.log("setItem->userId = " + utilizador_id);
        
        try{
        
        let randomestacionamentos = await $.ajax({
        
        url: "/users/showrandomestacionamentos/nrlugares/crescente",
        method: "get",
        dataType: "json",
        
        });
        
        console.log("[utilizador] utilizador = " + JSON.stringify(randomestacionamentos));
        
        let html = "";
        
        for(let estacionamento of randomestacionamentos){
         console.log("Restaurante: " + estacionamento);
         html += createestacionamentoHTML(estacionamento);
        }
        
        console.log("OBTEVE");
        //  recipeName.innerHTML = html;
        
       // restaurantesElem.innerHTML = html;
      
         estacionamentosElem.innerHTML = html;
        
        
        } catch(err){
         console.log(err);
        }
        }

        async function numerolugaresdecrescente(){

            console.log("Obtendo os servicos por numero de lugares decrescente");
            
            // let recipeName = document.getElementById("nome1")
             let estacionamentosElem = document.getElementById("organize6");
             var utilizador_id = sessionStorage.getItem("utilizador_id");
             console.log("setItem->userId = " + utilizador_id);
            
            try{
            
            let randomestacionamentos = await $.ajax({
            
            url: "/users/showrandomestacionamentos/nrlugares/decrescente",
            method: "get",
            dataType: "json",
            
            });
            
            console.log("[utilizador] utilizador = " + JSON.stringify(randomestacionamentos));
            
            let html = "";
            
            for(let estacionamento of randomestacionamentos){
             console.log("Restaurante: " + estacionamento);
             html += createestacionamentoHTML(estacionamento);
            }
            
            console.log("OBTEVE");
            //  recipeName.innerHTML = html;
            
           // restaurantesElem.innerHTML = html;
          
             estacionamentosElem.innerHTML = html;
            
            
            } catch(err){
             console.log(err);
            }
            }
    
