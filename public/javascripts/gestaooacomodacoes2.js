
async function criarMesa(rest_id, tipo_mesa_id){

    var value_for_availability = 2;
  
    if(document.getElementById("mesadisponibilidadeinput").value == "Sim"){
  
      value_for_availability = 0;
  
    } else if(document.getElementById("mesadisponibilidadeinput").value == "Não"){
  
      value_for_availability = 1;
    } else {
  
      console.log("Nada selecionado!")
    }
  
  
  
    try {
   
     
     var restaurant_id = rest_id;
   
  
      let data = {
   
       mesa_availability: value_for_availability, //DEFAULT FOR NOW,
       mesa_number: document.getElementById("mesanumberinput").value,
       mesa_size: document.getElementById("mesasizeinput").value,
       mesa_restaurant_id: restaurant_id,
       mesa_type_id: tipo_mesa_id,
       mesa_price: document.getElementById("mesaprecoinput").value
   
      }
   
      //ENVIAR METODO
      let newExercise = await $.ajax({
       url: "/users/insertnewmesa/",
       method: "post",
       data: JSON.stringify(data),
       contentType: "application/json",
       dataType: "json"
       });
   
      // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
   
   
    } catch (err){
   
     window.alert("Mesa criada com sucesso.");
   
    }
   
   
   
   }
  
  async function criarPlate(rest_id, tipo_prato_id){
  
    var value_for_availability = 2;
  
    if(document.getElementById("platedisponibilidadeinput").value == "Sim"){
  
      value_for_availability = 0;
  
    } else if(document.getElementById("platedisponibilidadeinput").value == "Não"){
  
      value_for_availability = 1;
    } else {
  
      console.log("Nada selecionado!")
    }
  
  
  
    try {
   
     
     var restaurant_id = rest_id;
   
  
      let data = {
   
       plate_name: document.getElementById("platenameinput").value,
       plate_price: document.getElementById("plateprecoinput").value,
       plate_restaurant_id: restaurant_id,
       plate_availability: value_for_availability, //DEFAULT FOR NOW
       plate_type_identifier: tipo_prato_id,
       plate_type_description: document.getElementById("platedescricaoinput").value
   
      }
   
      //ENVIAR METODO
      let newExercise = await $.ajax({
       url: "/users/insertplate/",
       method: "post",
       data: JSON.stringify(data),
       contentType: "application/json",
       dataType: "json"
       });
   
      // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
   
   
    } catch (err){
   
     window.alert("Prato criado com sucesso.");
   
    }
   
   
   
   }
  
  
   async function removerMesa(mesa){
  
    var del = mesa.acomodacao_id;
    console.log("ID da mesa: "+del);

    //PASSO 1- FAZER DELETE DA POSIÇÃO DA ACOMODAÇÃO

    try {
  
        //ENVIAR METODO
        let asd = await $.ajax({
     
         url: "/users/deleteposicaoacomodacao/" + del,
         method: "delete",
         contentType: "application/json",
         dataType: "json"
       
       });
     
     
      } catch (err){
     console.log(err);
       window.alert("Não pode apagar a mesa, pois tem reservas associadas à mesma.");
     
      }

      deleteAcomodation(del);
   
  
  }
  


  ///////

  async function deleteAcomodation(del){
   //PASSO 2- FAZER DELETE DA ACOMODAÇÃO

   try {
  
    //ENVIAR METODO
    let asd = await $.ajax({
 
     url: "/users/deleteacomodacao/" + del,
     method: "delete",
     contentType: "application/json",
     dataType: "json"
   
   });
 
 
  } catch (err){
 console.log(err);
   window.alert("Não pode apagar a mesa, pois tem reservas associadas à mesma.");
 
  }

}

  ///////
  async function removerReservaMesa(reserva_mesa){
  
    var del = reserva_mesa.id_reservation;
    console.log("ID da mesa: "+del);
   try {
  
     //ENVIAR METODO
     let asd = await $.ajax({
  
      url: "/users/deleteresacomodacao/" + del,
      method: "delete",
      contentType: "application/json",
      dataType: "json"
    
    });
  
  
   } catch (err){
  console.log(err);
    window.alert("Não pode apagar a mesa, pois tem reservas associadas à mesma.");
  
   }
  
  }
  
  
  
  function createtableHTML(mesa){
    
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    return "<div id='reportitem' style='border: 2px; display: inline-block ; position: relative; border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:35%;'><h3 id='mesanumbername' style='margin-left: 1.6%; font-size: 27px;'>Número da Acomodação: <i>" + mesa.acomodacao_number + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%;padding-top: 10px; font-size: 27px; margin-top: -2%;'>Tipo: <i>" + mesa.acomodacao_type_name + " </h3><h3 id='precoetiponame' font-size: 27px; padding-top: 10px; style='margin-left: 1.6%; margin-top: -1.6%;'>Preço: <i>" + mesa.acomodacao_price + " € </i>" + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%;padding-top: 10px; font-size: 27px; margin-top: -2%;'>Linha: <i>"+ mesa.position_line + " | Coluna: " + mesa.position_column +  "</i></h3><button padding-top: 10px;style='margin-left:50%; margin-top: -5%; position: absolute;' id='button9' onclick='removerMesa(" + JSON.stringify(mesa) + ")'>ELIMINAR ACOMODAÇÃO</button></div>";  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
  }
  
  async function getMesas(id_restaurante){
    
    console.log("Obtendo os reports")
    
    // let recipeName = document.getElementById("nome1")
     let lugaresElem = document.getElementById("organizeinforestauratables"); //VERIFICAR O ID
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let suggestedestacionamentos = await $.ajax({
    
    url: "/users/getacomodacoes/" + id_restaurante,
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
    
    let html = "";
    
   
    for(let reserva of suggestedestacionamentos){
     console.log("Reserva: " + reserva);
     html += createtableHTML(reserva);
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
  
  ////////////////////////////////////////////////////////////////////////////////////////////////7
  
  
  async function setUnnavailable(plate){
    var ind = plate.plate_id;  
      try{
      
          let plates = await $.ajax({
            
            url: "/users/become/plateavailability/off/" + ind,
            method: "put",
            dataType: "json",
      
          });
  
      
       } catch(err){
         console.log(err);
       }
      
      
  }
  
  async function setAvailable(plate){
    var ind = plate.plate_id;
      try{
    
        let plates = await $.ajax({
    
          url: "/users/become/plateavailability/on/" + ind,
          method: "put",
          dataType: "json",
    
        });
    
        //console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
    
        
    
    
     } catch(err){
       console.log(err);
     }
    
    
  }
  
  async function deletePrato(plate){
  
    var del = plate.plate_id;
    console.log("ID do prato: "+del);
   try {
  
     //ENVIAR METODO
     let asd = await $.ajax({
  
      url: "/users/deletepratos/" + del,
      method: "delete",
      contentType: "application/json",
      dataType: "json"
    
    });
      console.log("ai");
     location.reload();
  
   } catch (err){
  
    window.alert("O prato não foi apagado");
  
   }
  
  }
  
  
  
  function updateAvailability(plate){
  
  
    if(plate.plate_availability == 0){
      setUnnavailable(plate);
    }else{
      setAvailable(plate);
    }
  
  }
  
  function deletePlates(plate){
  
    deletePrato(plate);
  
  }
     
   /////////////////////// OBTER A MORADA //////////////////////////
  
  
  
   async function getMorada(id_restaurante){
    
    try{
    
    let suggestedrestaurants = await $.ajax({
    
    url: "/users/getlocation/restaurante/" + id_restaurante,
    method: "get",
    dataType: "json",
    
    });
  
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
  
    ///////////////////////////////////////////////////////////////////////////////////

    async function updatePlaceState(id){
    
        console.log("IDENTIFICADOR (DEVE SER 3): " + id);
    
    
    
            try{
          
              let ementas = await $.ajax({
          
                url: "/users/turnplacestate1/" + id,
                method: "put",
                dataType: "json",
          
              });
          
              console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
          
              
          
          
           } catch(err){
             console.log(err);
           }
          
          
           }

    async function postPosition(acom_id, linhavalue, colunavalue){

        console.log("POST ACOMODACAO CHAMADA");
        
    

        try {
       
        
            let data = {
       
                position_line: linhavalue,
                position_column: colunavalue,
                acomodacao_identifier: acom_id

            }

      /*    let data = {
       
           acomodacao_number: document.getElementById("numacom").value,
           acomodacao_availability: value_for_availability,
           acomodacao_type_id: userr_id,
           acomodacao_equipment_service_id: resta_id,
           acomodacao_price: document.getElementById("priceacom").value,
           acomodacao_description: document.getElementById("descacom").value

          }*/
       
          //ENVIAR METODO
          let newExercise = await $.ajax({
           url: "/users/insertnewacomodacaoposition/",
           method: "post",
           data: JSON.stringify(data),
           contentType: "application/json",
           dataType: "json"
           });
              
           
       
        } catch (err){

          updatePlaceState(acom_id);
       
         window.alert("Receita Criada.");
       
        }
       

       
       
       }

    function editPosition(acomodacao_object){

       document.getElementById("bg-modal33").style.display = "flex";

       let acom_id = acomodacao_object.acomodacao_id;

       document.getElementById('addpos').addEventListener("click", function() {

       
        let linhaacom = document.getElementById("linefield").value;
       let colunaacom = document.getElementById("columnfield").value;
        postPosition(acom_id, linhaacom, colunaacom);

      });

    }
  
    function createreservaHTML(reserva_mesa){ //A FAZER...
    
      //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
     
      return "<div id='reportitem' style='border: 2px;  border-color: black; display: inline-block; background-color: rgb(236, 236, 236); width: 70%; height: 23%; position: relative;'><h3 id='utilizadorname' style='margin-left: 1.6%; font-size: 27px;'>Numero: " + reserva_mesa.acomodacao_number + "</h3><h3 id='numeromesaname' style='margin-left: 1.6%; font-size: 16px; margin-top: 3%;'>Preço:" + reserva_mesa.acomodacao_price + "</h3><button style='margin-left:73%; margin-top: -5%; position: absolute;' id='button9' onclick='editPosition(" + JSON.stringify(reserva_mesa) + ")'>EDITAR POSIÇÃO</button></div>";
    
     /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
    
    }
    
    async function getReservasRestaurante(id_restaurante){
    
      console.log("Obtendo os reports")
      
      // let recipeName = document.getElementById("nome1")
       let lugaresElem = document.getElementById("organizereserva"); //VERIFICAR O ID
       var utilizador_id = sessionStorage.getItem("utilizador_id");
       console.log("setItem->userId = " + utilizador_id);
      
      try{
      
      let suggestedestacionamentos = await $.ajax({
      //OBTER AS ACOMODAÇÕES QUE NÃO POSSUEM POSIÇÃO
      url: "/users/getacomodacao/setposition/" + id_restaurante,
      method: "get",
      dataType: "json",
      
      });
      
      console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
      
      let html = "";
      
     
      for(let reserva of suggestedestacionamentos){
       console.log("Reserva: " + reserva);
       html += createreservaHTML(reserva);
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

      async function getCountAvailableLugares(restaurant_id){

       
        try{
      
          let suggestedestacionamentos = await $.ajax({
          
          url: "/users/count/acomodacoes/" + restaurant_id,
          method: "get",
          dataType: "json",
          
          });
          
          console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos[0].count));
  
          document.getElementById("restaurantavailable").innerHTML = "Numero de Lugares Disponiveis: " + suggestedestacionamentos[0].count;
  
       } catch (err){
         console.log(err);
       }
      }


      /////////////////////////////////////////// FILTRAGEM DE ACOMODACOES ///////////////////////////////////////////

      async function filtragemAcomodacao(id_restaurante, tipo_acom_id){
    
        console.log("Obtendo os reports")
        
        // let recipeName = document.getElementById("nome1")
         let lugaresElem = document.getElementById("organizeinforestauratables"); //VERIFICAR O ID
         var utilizador_id = sessionStorage.getItem("utilizador_id");
         console.log("setItem->userId = " + utilizador_id);
        
        try{
        
        let suggestedestacionamentos = await $.ajax({
        
        url: "/users/getacomodacoes/filter/" + id_restaurante + "/" + tipo_acom_id, //O tipo_acom_id PODE SER 1 ou 2, DEPENDERÁ DA OPÇÃO SELECIONADA
        method: "get",
        dataType: "json",
        
        });
        
        console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
        
        let html = "";
        
       
        for(let reserva of suggestedestacionamentos){
         console.log("Reserva: " + reserva);
         html += createtableHTML(reserva);
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


///////////////////////////////// FILTRAR DISPONIBILIDADE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function filtragemDisponivel(id_restaurante, tipo_disponibilidade_id){
    
    console.log("Obtendo os reports")
    
    // let recipeName = document.getElementById("nome1")
     let lugaresElem = document.getElementById("organizeinforestauratables"); //VERIFICAR O ID
     var utilizador_id = sessionStorage.getItem("utilizador_id");
     console.log("setItem->userId = " + utilizador_id);
    
    try{
    
    let suggestedestacionamentos = await $.ajax({
    
    url: "/users/getacomodacoes/filter/disponibilidade/" + id_restaurante + "/" + tipo_disponibilidade_id, //O tipo_acom_id PODE SER 1 ou 2, DEPENDERÁ DA OPÇÃO SELECIONADA
    method: "get",
    dataType: "json",
    
    });
    
    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedestacionamentos));
    
    let html = "";
    
   
    for(let reserva of suggestedestacionamentos){
     console.log("Reserva: " + reserva);
     html += createtableHTML(reserva);
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function postAcomodacao(rest_id, type_acom_id){

        console.log("POST ACOMODACAO CHAMADA");
        
        var value_for_availability = 2;
  
        if(document.getElementById("dispacom").value == "Sim"){
      
          value_for_availability = 0;
      
        } else if(document.getElementById("dispacom").value == "Não"){
      
          value_for_availability = 1;
        } else {
      
          console.log("Nada selecionado!")
        }

        let resta_id = rest_id
        let userr_id = type_acom_id

        try {
       
        
            let data = {
       
                acomodacao_number: document.getElementById("numacom").value,
                acomodacao_availability: value_for_availability,
                acomodacao_type_id: type_acom_id,
                acomodacao_equipment_service_id: resta_id, //PAREI DE VERIFICAR AQUI
                acomodacao_price: 15,
                acomodacao_description: document.getElementById("descacom").value,
                acomodacao_position_acquired: '0'
     
               }

      /*    let data = {
       
           acomodacao_number: document.getElementById("numacom").value,
           acomodacao_availability: value_for_availability,
           acomodacao_type_id: userr_id,
           acomodacao_equipment_service_id: resta_id,
           acomodacao_price: document.getElementById("priceacom").value,
           acomodacao_description: document.getElementById("descacom").value

          }*/
       
          //ENVIAR METODO
          let newExercise = await $.ajax({
           url: "/users/insertnewacomodacao/",
           method: "post",
           data: JSON.stringify(data),
           contentType: "application/json",
           dataType: "json"
           });
              
       
        } catch (err){
       
         window.alert("Receita Criada.");
       
        }
       
       
       
       }


    
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  window.onload = function exampleFunction() {
      console.log('The Script will load now.');
    
      var utilizador_id = sessionStorage.getItem("utilizador_id")
      var utilizador_name = sessionStorage.getItem("utilizador_name");
      let utilizador_username = sessionStorage.getItem("utilizador_username");
      var utilizador_email = sessionStorage.getItem("utilizador_email");
      var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");
  
      var estabelecimento_id = sessionStorage.getItem('establishment_id');
      var estabelecimento_name = sessionStorage.getItem('establishment_name');
      var estabelecimento_description = sessionStorage.getItem('establishment_description');
      var restaurant_id = sessionStorage.getItem('restaurant_id');
      var restaurante_number_tables = sessionStorage.getItem('restaurante_number_tables');
      var estabelecimento_utilizador_id = sessionStorage.getItem('establishment_utilizador_id');
      var type_service_identifier = sessionStorage.getItem('type_service_identifier');

      var state_id = sessionStorage.getItem('state_id');  //EXPLICAR
    
      console.log("USERNAME: " + utilizador_username);
      console.log("ID: " + utilizador_id);
      console.log("TYPE ID: " + utilizador_type_id);
      console.log("NOME DO RESTAURANTE: " + estabelecimento_name)
  
      document.getElementById('textomeusestabelecimentos').innerHTML = "" + estabelecimento_name;
  
    
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
   //   document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    
    //  document.getElementById('informacoesdiv').style.visibility = "hidden";
     // document.getElementById('tipocliente').style.visibility = "hidden";
      
     // getAleatorioRestaurantes();
  
     document.getElementById('restaurantnameinfo').innerHTML = "Nome: " + estabelecimento_name;
    // document.getElementById('restauranttypeinfo').innerHTML = "Tipo: " + type_restaurant_name;
     document.getElementById('restaurantinfo').innerHTML = "Numero de Mesas: " + restaurante_number_tables;
  
     
  
     getMorada(restaurant_id);
  
     getReservasRestaurante(restaurant_id);
  
   //  getMenu(restaurant_id);
  
     getMesas(restaurant_id);

     getCountAvailableLugares(restaurant_id);
  
     //VARIAVEL QUE ARMAZENA O VALOR DO TIPO DE PRATO
  
      var tipo_prato_id = 0;
  
    /////////////////////////////////////////////////////////////////////////////////////////
  
    var tipo_mesa_id = 0;
  
  
    

    ///////////////////////////////// TIPO DE ACOMODAÇÃO /////////////////////////////////

    document.getElementById('toldofilteroption').addEventListener("click", function() {

        tipo_mesa_id = 1; //TOLDO
        filtragemAcomodacao(restaurant_id ,tipo_mesa_id);
      });
  
      document.getElementById('palhotafilteroption').addEventListener("click", function() {
          
        tipo_mesa_id = 2; //PALHOTA
        filtragemAcomodacao(restaurant_id ,tipo_mesa_id);
      });

      document.getElementById('disponiveloption').addEventListener("click", function() {

        tipo_disponibilidade_id = 0; //TOLDO
        filtragemDisponivel(restaurant_id ,tipo_disponibilidade_id);
      });

      document.getElementById('indisponiveloption').addEventListener("click", function() {

        tipo_disponibilidade_id = 1; //TOLDO
        filtragemDisponivel(restaurant_id ,tipo_disponibilidade_id);
      });


      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var tipo_acomodacao_selected = 0
      document.getElementById('toldobtn').addEventListener("click", function() {

         if(tipo_acomodacao_selected == 0){

            tipo_acomodacao_selected = 1;
            document.getElementById("selectedtypeacom").innerHTML = "Tipo selecionado: Toldo";

            console.log(tipo_acomodacao_selected);

         } else {
            tipo_acomodacao_selected = 1;
            document.getElementById("selectedtypeacom").innerHTML = "Tipo selecionado: Toldo";

            console.log(tipo_acomodacao_selected);

         }

      });

      document.getElementById('palhotabtn').addEventListener("click", function() {

        if(tipo_acomodacao_selected == 0){
           tipo_acomodacao_selected = 2;
           document.getElementById("selectedtypeacom").innerHTML = "Tipo selecionado: Palhota";

           console.log(tipo_acomodacao_selected);

        } else {

           tipo_acomodacao_selected = 2;
           document.getElementById("selectedtypeacom").innerHTML = "Tipo selecionado: Palhota";

           console.log(tipo_acomodacao_selected);

        }
        
     });

     document.getElementById('button444').addEventListener("click", function() {

        console.log("CHAMADA" + restaurant_id + "|" + tipo_acomodacao_selected);
        postAcomodacao(restaurant_id, tipo_acomodacao_selected);

      });
  
  }
  
  
  async function newChangeReports(){
  
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Reports";
    document.getElementById('tipocliente').style.visibility = "hidden";
    document.getElementById('tipoestabelecimento').style.visibility = "visible";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    document.getElementById('organizeitems').style.visibility = "visible";
  
  }
  
  async function newChangePromotion(){
  
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Promoção";
    document.getElementById('tipocliente').style.visibility = "visible";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    document.getElementById('organizeitems').style.visibility = "visible";
  
  }
  
  async function newChange(){
  
    document.getElementById('textominhasreservas').style.visibility = "hidden";
    document.getElementById('textominhaconta').style.visibility = "hidden";
    document.getElementById('textomeusestabelecimentos').innerHTML = "Estabelecimentos em Análise";
    document.getElementById('tipoestabelecimento').style.visibility = "hidden";
    document.getElementById('textomeusfavoritos').style.visibility = "hidden";
    document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    document.getElementById('informacoesdiv').style.visibility = "hidden";
    document.getElementById('organizeitems').style.visibility = "visible";
    document.getElementById('tipocliente').style.visibility = "hidden";
  
  }
  
  async function myFavoritos(){
  
      document.getElementById('textominhasreservas').style.visibility = "hidden";
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('textomeusestabelecimentos').innerHTML = "Meus Favoritos";
      document.getElementById('tipoestabelecimento').style.visibility = "hidden";
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
      document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
      document.getElementById('informacoesdiv').style.visibility = "hidden";
      document.getElementById('tipocliente').style.visibility = "hidden";
  
  }
  
  async function myReservas(){
  
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('textomeusestabelecimentos').innerHTML = "Minhas Reservas";
      document.getElementById('tipoestabelecimento').style.visibility = "hidden";
      document.getElementById('textominhasreservas').style.visibility = "hidden";
      document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
      document.getElementById('informacoesdiv').style.visibility = "hidden";
      document.getElementById('tipocliente').style.visibility = "hidden";
     
    }
  
    async function myAccount(){
  
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
      document.getElementById('textominhasreservas').style.visibility = "hidden";
      document.getElementById('textomeusestabelecimentos').innerHTML = "Minha Conta";
      document.getElementById('tipoestabelecimento').style.visibility = "hidden";
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('textominhacontainformacoes').style.visibility = "visible";
      document.getElementById('informacoesdiv').style.visibility = "visible";
      document.getElementById('organizeitems').style.visibility = "hidden";
      document.getElementById('tipocliente').style.visibility = "hidden";
    
    }
  
    async function myRestaurantes(){
  
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
      document.getElementById('textominhasreservas').style.visibility = "hidden";
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
      document.getElementById('tipoestabelecimento').style.visibility = "hidden";
      document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
      document.getElementById('informacoesdiv').style.visibility = "hidden";
    
    }
  
    async function myAcomodacoes(){
  
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
      document.getElementById('textominhasreservas').style.visibility = "hidden";
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
      document.getElementById('tipoestabelecimento').style.visibility = "hidden";
      document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
      document.getElementById('informacoesdiv').style.visibility = "hidden";
      console.log("new chamada");
    
    }
  
    async function myEstacionamentos(){
  
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
      document.getElementById('textominhasreservas').style.visibility = "hidden";
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('tipoestabelecimento').style.visibility = "hidden";
      document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
      document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
      document.getElementById('informacoesdiv').style.visibility = "hidden";
    
      console.log("chamada");
    }
  
    async function myAllEstabelecimentos(){
  
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
      document.getElementById('textominhasreservas').style.visibility = "hidden";
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('tipoestabelecimento').style.visibility = "visible";
      document.getElementById('textomeusestabelecimentos').style.visibility = "visible";
      document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
      document.getElementById('informacoesdiv').style.visibility = "hidden";
    
      console.log("chamada");
    }