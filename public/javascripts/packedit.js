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

   /// ADICIONAR ITEM DE MESA AO PACK ///

  
  
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
  
    var del = mesa.mesa_id;
    console.log("ID da mesa: "+del);
   try {
  
     //ENVIAR METODO
     let asd = await $.ajax({
  
      url: "/users/deletemesa/" + del,
      method: "delete",
      contentType: "application/json",
      dataType: "json"
    
    });
  
  
   } catch (err){
  console.log(err);
    window.alert("Não pode apagar a mesa, pois tem reservas associadas à mesma.");
  
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
  
  function createplateHTML(plate){
    
    //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
   
    //return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:23%; position: absolute;'><h3 id='pratoname' style='margin-left: 1.6%; font-size: 27px;'>" + plate.plate_name + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + plate.plate_type_description + "</h3><h3 id='precoetiponame' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço: <i>" + plate.plate_price + "</i> | Tipo: <i>" + plate.plate_type_name + "</i></h3><button style='margin-left:2%; margin-top: -0.2%; position: absolute;' id='button9'>ALTERAR DISPONIBILIDADE</button><button style='margin-left:65%; margin-top: -0.2%; position: absolute;' id='button9'>ELIMINAR PRATO</button></div>";
    return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:23%; position: absolute;'><h3 id='pratoname' style='margin-left: 1.6%; font-size: 27px;'>" + plate.plate_name + "</h3><h3 id='platedescriptionname' style='margin-left: 1.6%; font-size: 16px; margin-top: -2%;'>" + plate.plate_type_description + "</h3><h3 id='precoetiponame' style='margin-left: 1.6%; margin-top: -1.6%;'>Preço: <i>" + plate.plate_price + "</i> | Tipo: <i>" + plate.plate_type_name + "</i></h3><button style='margin-left:2%; margin-top: -0.2%; position: absolute;' id='button9' onclick='updateAvailability(" + JSON.stringify(plate)+")'>ALTERAR DISPONIBILIDADE</button><button style='margin-left:65%; margin-top: -0.2%; position: absolute;' id='button9' onclick='deletePlates(" + JSON.stringify(plate)+")'>ELIMINAR PRATO</button></div>";
    // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
  
   /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
  
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
    // FUNÇÃO PARA ABRIR DETALHES DO PACK E EDITÁ-LO

    async function openpack(pack){

        console.log("FUNÇÃO CHAMADA!");
        /*console.log("NOME: " + restaurante.establishment_name)
          console.log("DESCRICAO: " + restaurante.establishment_description)
          console.log("ID: " + restaurante.restaurant_id)*/
      
          console.log("NOMEEEEEEE: " + pack.pack_name);
          
          sessionStorage.setItem('pack_id', pack.pack_id);
          sessionStorage.setItem('pack_name', pack.pack_name);
          sessionStorage.setItem('pack_restaurante_id', pack.pack_restaurante_id);
          sessionStorage.setItem('pack_availability', pack.pack_availability);

          window.location("packedit.html")
      
      
        /*  sessionStorage.setItem('restaurante_number_tables', restaurante.restaurante_number_tables);
          sessionStorage.setItem('establishment_utilizador_id', restaurante.establishment_utilizador_id);
          sessionStorage.setItem('type_service_identifier', restaurante.type_service_identifier);
          sessionStorage.setItem('type_restaurant_id', restaurante.type_restaurant_id);
          sessionStorage.setItem('type_restaurant_name', restaurante.type_restaurant_name);*/
      
      
      }

      
    ///////////////////////////////
  
    ////CRIAÇÃO DOS ITEMS DOS PACKS PARA EDITAR////
    function createreservaHTML(reserva){
    
      //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
     
      return "<div id='reportitem' style='border: 2px;  border-color: black; background-color: rgb(236, 236, 236); width: 100%; height:13%; position: absolute;'><h3 id='utilizadorname' style='margin-left: 1.6%; font-size: 27px; margin-top: 2%;'>" + reserva.pack_name + "</h3><button style='margin-left:73%; margin-top: -2.4%; position: absolute;' onclick='openpack(" + JSON.stringify(reserva) + ")' id='button9'>EDITAR PACK</button></div>";
      // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
    
     /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
    
    }

   

    async function sentPostTT2(item_mesa_identifier_reservation, item_date_marcacao_reservation, item_date_marcada_reservation, item_pack_restaurante_id){

    

      try {
 
        console.log("CHEGOU");
       
        console.log("ID MESA: " + item_mesa_identifier_reservation);
      
     
         let data = {
      
          item_mesa_identifier_reservation: item_mesa_identifier_reservation, //DEFAULT FOR NOW,
          item_date_marcacao_reservation: item_date_marcacao_reservation,
          item_date_marcada_reservation: item_date_marcada_reservation,
          item_pack_restaurante_id: item_pack_restaurante_id
      
         }
      
         //ENVIAR METODO
         let newExercise = await $.ajax({
          url: "/users/insertmesaitem/",
          method: "post",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json"
          });
      
          window.alert("Mesa adicionada ao Pack");
          //UPDATE

          try{
          
          //VERIFICAR O PORQUE DE NÃO-ALTERAR O ESTADO///

          let newExercise2 = await $.ajax({
            url: "users/setmesaunavailable/"+ item_mesa_identifier_reservation,
            method: "put",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json"
            });
          } catch (err){
            window.alert("ALERTA");
          }
          
             // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
          

       } catch (err){
      
        window.alert("Receita Criada.");
      
       }
       //O PRÓXIMO PASSO É ALTERAR A DISPONIBILIDADE DA MESA

        /////////// 2º PASSO - TORNAR A MESA INDISPONIVEL ////////////

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

  

     //////////////////////////////////////////////////////////////////////////////////////////////

    
    ///SHOW VALUE PARA CADA MESA///

    async function showValuee(table){

      let utilizador_id = sessionStorage.getItem("utilizador_id")
      var utilizador_name = sessionStorage.getItem("utilizador_name");
      let utilizador_username = sessionStorage.getItem("utilizador_username");
      var utilizador_email = sessionStorage.getItem("utilizador_email");
      var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

      var pack_id = sessionStorage.getItem('pack_id');

      const date = new Date();
    const current_date_hours = date.getHours();
    const current_date_minutes = date.getMinutes();
    const current_date_seconds = date.getSeconds();

       console.log("UTILIZADOR ID AGAIN: " + utilizador_id);
    
       var item_mesa_identifier_reservation = table.mesa_id; //DEFAULT FOR NOW,
       var item_date_marcacao_reservation = document.getElementById("datamarcacaonameinput").value;
       var item_date_marcada_reservation = "2023-01-18" + " " + current_date_hours + ":" + current_date_minutes + ":" + current_date_seconds;



       var item_pack_restaurante_id = pack_id;
    
        sentPostTT2(item_mesa_identifier_reservation, item_date_marcacao_reservation, item_date_marcada_reservation, item_pack_restaurante_id);
     
    }


    async function turnUnavailableAcom(item_acom_identifier){

      try{
      let newExercise2 = await $.ajax({
        url: "/users/setacomodacaounavailable/" + item_acom_identifier,
        method: "put",
        dataType: "json"
        });
      } catch(err) {

        console.log("ERRO");

      }

    }
    

    async function sentPostTT3(item_acomodacao_identifier_reservation, item_date_marcacao_reservation, item_date_marcada_reservation, item_pack_restaurante_id){

    

      try {
 
        console.log("CHEGOU");
       
      
     
         let data = {
      
          item_acomodacao_identifier_reservation: item_acomodacao_identifier_reservation, //DEFAULT FOR NOW,
          item_date_marcacao_reservation: item_date_marcacao_reservation,
          item_date_marcada_reservation: item_date_marcada_reservation,
          item_pack_restaurante_id: item_pack_restaurante_id
      
         }
      
         //ENVIAR METODO
         let newExercise = await $.ajax({
          url: "/users/insertacomodacaoitem/",
          method: "post",
          data: JSON.stringify(data),
          contentType: "application/json",
          dataType: "json"
          });
      
          window.alert("Mesa adicionada ao Pack");

         
      
       } catch (err){

        turnUnavailableAcom(item_acomodacao_identifier_reservation);
      
        window.alert("Receita Criada.");
      
       }

       //O PRÓXIMO PASSO É ALTERAR A DISPONIBILIDADE DA ACOMODACAO

        /////////// 2º PASSO - TORNAR A ACOMODACAO INDISPONIVEL ////////////

        


    }

    async function showValuee2(acomodacao){

      let utilizador_id = sessionStorage.getItem("utilizador_id")
      var utilizador_name = sessionStorage.getItem("utilizador_name");
      let utilizador_username = sessionStorage.getItem("utilizador_username");
      var utilizador_email = sessionStorage.getItem("utilizador_email");
      var utilizador_type_id = sessionStorage.getItem("utilizador_type_id");

      var pack_id = sessionStorage.getItem('pack_id');

      const current_date2 = new Date();

      const current_date_hours2 = current_date2.getHours();
      const current_date_minutes2 = current_date2.getMinutes();
      const current_date_seconds2 = current_date2.getSeconds();
    
       console.log("UTILIZADOR ID AGAIN: " + utilizador_id);
    
       var item_acomodacao_identifier_reservation = acomodacao.acomodacao_id; //DEFAULT FOR NOW,
       var item_date_marcacao_reservation = document.getElementById("datamarcacaonameinput2").value;
       var item_date_marcada_reservation = "2023-01-18" + " " + current_date_hours2 + ":" + current_date_minutes2 + ":" + current_date_seconds2;
       var item_pack_restaurante_id = pack_id;
    
        sentPostTT3(item_acomodacao_identifier_reservation, item_date_marcacao_reservation, item_date_marcada_reservation, item_pack_restaurante_id);
     
    }

 
      function createtableHTML(table){
  
        //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
       
        return "<button id='buttonoption' onclick='showValuee(" + JSON.stringify(table) + ")' style='background-color: transparent; border: 0; width: 100%;'><a href='#'>" + table.mesa_number + "</a></button>"
        // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
       /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
      
      }

      function createtableeeeeeHTML(table){
  
        //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
       
        return "<button id='buttonoption' onclick='showValuee2(" + JSON.stringify(table) + ")' style='background-color: transparent; border: 0; width: 100%;'><a href='#'>" + table.acomodacao_number + "| " + table.establishment_name +  "</a></button>"
        // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
       /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
      
      }
  
     

        function createtable2HTML(table){
  
            //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
           
            return "<button id='buttonoption' onclick='showValuee(" + JSON.stringify(table) + ")' style='background-color: transparent; border: 0; width: 100%;'><a href='#'>" + table.acomodacao_number + "|" + table.establishment_name + "</a></button>"
            // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
           /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
          
          }

       

            function createtable3HTML(table){
  
                //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
               
                return "<button id='buttonoption' onclick='showValuee(" + JSON.stringify(table) + ")' style='background-color: transparent; border: 0; width: 100%;'><a href='#'>" + table.acomodacao_number + "|" + table.establishment_name + "</a></button>"
                // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
               /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
              
              }

            

                function createtable33HTML(mesapack){
  
                  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
                 
                  return "<div class='menu_item' style='background-color:lightgray; width:100%; height:15%;'><em>Preço: " + mesapack.mesa_price + " $</em><h4>Numero: " + mesapack.mesa_number + " | Pessoas: " + mesapack.mesa_size + "</h4><p>Descrição: " + mesapack.mesa_type_name + "</p></div><hr>"
                  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
                
                 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
                
                }
                //////////////////OBTER TODOS OS ITEMS DE MESAS//////////////////

                async function getMesasFromPack(id_pack){

                    console.log("Obtendo as mesas do pack");
                    
                    // let recipeName = document.getElementById("nome1")
                     let restaurantesElem = document.getElementById("this1");
                    // var pack_id = sessionStorage.getItem("pack_id");
                     var utilizador_id = sessionStorage.getItem("utilizador_id");
                     console.log("setItem-> PACK ID= " + id_pack);
                     //console.log("Restaurante ID: " + restaurant_id);
                    
                    try{
                    
                    let suggestedrestaurants = await $.ajax({
                    
                    url: "/users/packs/restaurante/mesa/" + id_pack,
                    method: "get",
                    dataType: "json",
                    
                    });
                    
                    console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
                    
                    let html = "";
                    
                    for(let tablepack of suggestedrestaurants){
                    console.log("Restaurante: " + tablepack);
                     html += createtable33HTML(tablepack);
                    }
                    
                    console.log("OBTEVE");

                     restaurantesElem.innerHTML = html;
                    
                    
                    } catch(err){
                     console.log(err);
                    }
                 }

                //////////////////////////////////////////////////////////////////

                function createacomodacao22HTML(acomodacaopack){
  
                  //return "<div class='item2' style='height:300px; background-color:white;'>" + "<div class='strip'>"  + " <div class='item_title'>" + "<h3>" + restaurante.establishment_name + "</h3>" + "<small>" + restaurante.restaurante_number_tables + "</small><button onclick='" + JSON.stringify(restaurante) + "'>VER MAIS</button></div></figure></div></div>"
                 
                  return "<div class='menu_item' style='background-color:lightgray; width:100%; height:15%;'><em>Preço: " + acomodacaopack.acomodacao_price + " $</em><h4>Numero: " + acomodacaopack.acomodacao_number + " | Tipo: " + acomodacaopack.acomodacao_type_name + "</h4></div><hr>"
                  // return "<div class='selectbox5' id='selectbox55'>" + recipe.receita_titulo + "</div>";
                
                 /*<p name="criador1" id="criador1" style="text-align: center;font-size: 90%; margin-top: 2%;">CRIADOR DA RECEITA </p>*/
                
                }

                async function getAcomodacaoFromPackRestaurante(id_pack){

                  console.log("Obtendo as mesas do pack")
                  
                  // let recipeName = document.getElementById("nome1")
                   let restaurantesElem = document.getElementById("this2");
                  // var pack_id = sessionStorage.getItem("pack_id");
                   var utilizador_id = sessionStorage.getItem("utilizador_id");
                   console.log("setItem->userId = " + utilizador_id);
                   //sconsole.log("Restaurante ID: " + restaurant_id);
                  
                  try{
                  
                  let suggestedrestaurants = await $.ajax({
                  
                  url: "/users/packs/restaurante/acomodacao/" + id_pack,
                  method: "get",
                  dataType: "json",
                  
                  });
                  
                  console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
                  
                  let html = "";
                  
                  for(let tablepack of suggestedrestaurants){
                  // console.log("Restaurante: " + restaurant);
                   html += createacomodacao22HTML(tablepack);
                  }
                  
                  console.log("OBTEVE");
                  //  recipeName.innerHTML = html;
                  
                 // restaurantesElem.innerHTML = html;
                
                   restaurantesElem.innerHTML = html;
                  
                  
                  } catch(err){
                   console.log(err);
                  }
               }

               async function getLugaresFromPack(id_pack){

                console.log("Obtendo as mesas do pack")
                
                // let recipeName = document.getElementById("nome1")
                 let restaurantesElem = document.getElementById("this3");
                // var pack_id = sessionStorage.getItem("pack_id");
                 var utilizador_id = sessionStorage.getItem("utilizador_id");
                 console.log("setItem->userId = " + utilizador_id);
                 //sconsole.log("Restaurante ID: " + restaurant_id);
                
                try{
                
                let suggestedrestaurants = await $.ajax({
                
                url: "/users/packs/restaurante/spots/" + id_pack,
                method: "get",
                dataType: "json",
                
                });
                
                console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
                
                let html = "";
                
                for(let tablepack of suggestedrestaurants){
                // console.log("Restaurante: " + restaurant);
                 html += createacomodacao22HTML(tablepack);
                }
                
                console.log("OBTEVE");
                //  recipeName.innerHTML = html;
                
               // restaurantesElem.innerHTML = html;
              
                 restaurantesElem.innerHTML = html;
                
                
                } catch(err){
                 console.log(err);
                }
             }

             /////////////////////////////////////////////

             async function getAvailableTables(rest_id){

              console.log("Obtendo os restaurantes");
              
              // let recipeName = document.getElementById("nome1")
               let restaurantesElem = document.getElementById("dropdown-content");
               var utilizador_id = sessionStorage.getItem("utilizador_id");
               console.log("setItem->userId = " + utilizador_id);
              
              try{
              
              let suggestedrestaurants = await $.ajax({
              
              url: "/users/getmesas/restaurante/" + rest_id,
              method: "get",
              dataType: "json",
              
              });
              
              console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
              
              let html = "";
              
               
            
                  for(let restaurant of suggestedrestaurants){
                   console.log("Restaurante: " + restaurant);
                   html += createtableHTML(restaurant);
                  }
            
                
            
                  console.log("NADA ENCONTRADO"); 
            
              console.log("OBTEVE");

               restaurantesElem.innerHTML = html;
              
              
              } catch(err){
               console.log(err);
              }
              }

              ////////////////// OBTER ACOMODAÇÕES DISPONIVEIS /////////////////////

              async function getAvailableAcomodacoes(rest_id){

                console.log("Obtendo os restaurantes");
                
                // let recipeName = document.getElementById("nome1")
                 let restaurantesElem = document.getElementById("dropdown-content4");
                 var utilizador_id = sessionStorage.getItem("utilizador_id");
                 console.log("setItem->userId = " + utilizador_id);
                
                try{
                
                let suggestedrestaurants = await $.ajax({
                
                url: "/users/getacomodacoes/restaurante/" + utilizador_id,
                method: "get",
                dataType: "json",
                
                });
                
                console.log("[utilizador] utilizador = " + JSON.stringify(suggestedrestaurants));
                
                let html = "";
                
                 
              
                    for(let restaurant of suggestedrestaurants){
                     console.log("Restaurante: " + restaurant);
                     html += createtableeeeeeHTML(restaurant);
                    }
              
                  
              
                    console.log("NADA ENCONTRADO"); 
              
                console.log("OBTEVE");
  
                 restaurantesElem.innerHTML = html;
                
                
                } catch(err){
                 console.log(err);
                }
                }

              //////////////////////////////////////////////////////////////////////
  
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
      var type_restaurant_id = sessionStorage.getItem('type_restaurant_id');
      var type_restaurant_name = sessionStorage.getItem('type_restaurant_name');
      var state_id = sessionStorage.getItem('state_id');  //EXPLICAR

      var pack_id = sessionStorage.getItem('pack_id');
      var pack_name = sessionStorage.getItem('pack_name');
      var pack_restaurante_id = sessionStorage.getItem('pack_restaurante_id');
      var pack_availability = sessionStorage.getItem('pack_availability');

    
      console.log("USERNAME: " + utilizador_username);
      console.log("ID: " + utilizador_id);
      console.log("TYPE ID: " + utilizador_type_id);
      console.log("NOME DO RESTAURANTE: " + estabelecimento_name)
  
      document.getElementById('textomeusestabelecimentos').innerHTML = "" + pack_name;
  
    
      document.getElementById('textominhaconta').style.visibility = "hidden";
      document.getElementById('textomeusfavoritos').style.visibility = "hidden";
   //   document.getElementById('textominhacontainformacoes').style.visibility = "hidden";
    
    //  document.getElementById('informacoesdiv').style.visibility = "hidden";
     // document.getElementById('tipocliente').style.visibility = "hidden";
      
     // getAleatorioRestaurantes();
  
  //   document.getElementById('restaurantnameinfo').innerHTML = "Nome: " + estabelecimento_name;
  //   document.getElementById('restauranttypeinfo').innerHTML = "Tipo: " + type_restaurant_name;
   //  document.getElementById('restaurantinfo').innerHTML = "Numero de Mesas: " + restaurante_number_tables;
  
     document.getElementById('button9').addEventListener("click", function() {
        
      //console.log("TIPO MESA: " + tipo_mesa_id);
     // criarMesa(restaurant_id, tipo_mesa_id);
  
      document.getElementById("bg-modal666").style.display = "flex";
    });
  
     getMesasFromPack(pack_id);

     getAcomodacaoFromPackRestaurante(pack_id);

     getLugaresFromPack(pack_id);

     getAvailableTables(restaurant_id);

     getAvailableAcomodacoes(restaurant_id);



     //VARIAVEL QUE ARMAZENA O VALOR DO TIPO DE PRATO
  
      var tipo_prato_id = 0;
  
  
   
     
  
  
  
    /////////////////////////////////////////////////////////////////////////////////////////
  
    var tipo_mesa_id = 0;
  
    document.getElementById('interioroption').addEventListener("click", function() {
          
      tipo_mesa_id = 1;
      document.getElementById("tiposelecionadotext2").innerHTML = "Tipo selecionado: Interior" 
    });
  
    document.getElementById('exterioroption').addEventListener("click", function() {
          
      tipo_mesa_id = 2;
      document.getElementById("tiposelecionadotext2").innerHTML = "Tipo selecionado: Exterior" 
    });
  
    document.getElementById('criarmesabtn').addEventListener("click", function() {
        
      console.log("TIPO MESA: " + tipo_mesa_id);
      criarMesa(restaurant_id, tipo_mesa_id);
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