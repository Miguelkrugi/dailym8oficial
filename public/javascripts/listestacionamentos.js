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

function createestacionamentoHTML(estacionamento){
  
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div class='item' style='width:24%; height:37%;'><div class='strip'><figure><a href='detail-restaurant.html' class='strip_info' onclick='printtest()'><small>" + estacionamento.local_morada + "</small><div class='item_title'><h3>" + estacionamento.establishment_name + "</h3><small>" + estacionamento.parking_lot_number_spots + "</small></div></a></figure></div></div>"
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
    
