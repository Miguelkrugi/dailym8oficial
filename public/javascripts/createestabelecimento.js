async function criarRestaurant(user_id,tipo_restaurant_id){

    try {
   
     
     var userr_id = user_id
   

      let data = {
   
       establishment_name: document.getElementById("nomeinput").value,
       establishment_description: document.getElementById("descricaoinput").value,
       establishment_utilizador_id: user_id,
       restaurant_type_id: tipo_restaurant_id, //DEFAULT FOR NOW
       restaurante_number_tables: document.getElementById("numeromesasinput").value,
       type_service_identifier: 1,
       state_id: 1
   
      }
   
      //ENVIAR METODO
      let newExercise = await $.ajax({
       url: "/users/insertnewrestaurant/",
       method: "post",
       data: JSON.stringify(data),
       contentType: "application/json",
       dataType: "json"
       });
   
       location.reload();
      // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
   
   
    } catch (err){
   
     window.alert("Receita Criada.");
   
    }
   
   
   
   }


   async function criarAcomodacao(user_id,acomodacao_tipo_id){

    try {
   
     
     var userr_id = user_id
   

      let data = {
   
       acomodacao_number: document.getElementById("nomeinput").value,
       acomodacao_availability: 0,
       acomodacao_type_id: acomodacao_tipo_id,
       acomodacao_equipment_service_id: 1, //DEFAULT FOR NOW
       acomodacao_price: document.getElementById("numeroacomodacoesinput").value,
       acomodacao_description: document.getElementById("descricaoinput").value,
       state_id: 1
   
      }
   
      //ENVIAR METODO
      let newExercise = await $.ajax({
       url: "/users/insertnewacomodacao",
       method: "post",
       data: JSON.stringify(data),
       contentType: "application/json",
       dataType: "json"
       });
   
       location.reload();
      // window.alert("Created recipe with id: " + newExercise.ementa_receita_id);
   
   
    } catch (err){
   
     window.alert("Receita Criada.");
   
    }
   
   
   
   }




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

    
   document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Restaurante"
   document.getElementById('numeromesastexto').innerHTML = "Número de Mesas"

   document.getElementById('numeromesasinput').style.visibility = "visible"

    document.getElementById('numeroacomodacoesinput').style.visibility = "hidden"

    document.getElementById('numerolugaresinput').style.visibility = "hidden"


    document.getElementById('createrestaurant').style.visibility = "visible";

    var tipo_restaurant_id = 0;
    var acomodacao_tipo_id = 0;


    document.getElementById('portuguesoption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 1;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Português" 

    });

    document.getElementById('italianooption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 2;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Italiano"  
      
    });

    document.getElementById('veganoption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 3;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Vegan"
      
    });

    document.getElementById('fastfoodoption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 4;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Fast Food" 
      
    });

    document.getElementById('japonesption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 5;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Japonês" 
      
    });

    document.getElementById('indianooption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 6;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Indiano" 
      
    });

    document.getElementById('rodiziooption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 7;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Rodizio" 
      
    });

    document.getElementById('outrooption').addEventListener("click", function() {
	    
      tipo_restaurant_id = 8;
      console.log(tipo_restaurant_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Outro" 
      
    });

    document.getElementById('toldooption').addEventListener("click", function() {
	    
      acomodacao_tipo_id = 1;
      console.log(acomodacao_tipo_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Toldo" 
      
    });

    document.getElementById('palhotaoption').addEventListener("click", function() {
	    
      acomodacao_tipo_id = 2;
      console.log(acomodacao_tipo_id);
      document.getElementById("tiposelecionadotext").innerHTML = "Tipo selecionado: Palhota" 
      
    });

    document.getElementById('createrestaurant').addEventListener("click", function(){

        console.log("Funcao Chamada");
        criarRestaurant(utilizador_id,tipo_restaurant_id);
        
      
      });

      document.getElementById('createacomodacao').addEventListener("click", function(){

        console.log("Funcao Chamada");
        criarAcomodacao(utilizador_id,acomodacao_tipo_id);
        
      
      });

      
   
   
   // getAleatorioRestaurantes();

}

function createRestaurante() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Restaurante"

    document.getElementById('numeromesastexto').innerHTML = "Número de Mesas"

    document.getElementById('numeromesasinput').style.visibility = "visible"

    document.getElementById('numeroacomodacoesinput').style.visibility = "hidden"

    document.getElementById('numerolugaresinput').style.visibility = "hidden"
    
    document.getElementById('createrestaurant').style.visibility = "visible"

    document.getElementById('createacomodacao').style.visibility = "hidden"

    document.getElementById('nometexto').style.visibility = "visible"

    document.getElementById('nomeinput').style.visibility = "visible"
    
    

}

function createAcomodacao() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Serviço de Acomodação"

    document.getElementById('numeromesastexto').innerHTML = "Preço da Acomodação"

    document.getElementById('nometexto').innerHTML = "Número da Acomodação"
  
    document.getElementById('numeromesasinput').style.visibility = "hidden"

    document.getElementById('numeroacomodacoesinput').style.visibility = "visible"

    document.getElementById('numerolugaresinput').style.visibility = "hidden"

    document.getElementById('createrestaurant').style.visibility = "hidden"

    document.getElementById('createacomodacao').style.visibility = "visible"

}

function createEstacionamento() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Estacionamento"

    document.getElementById('numeromesastexto').innerHTML = "Número de Lugares"

    document.getElementById('dropdown1').style.visibility = "visible"

    document.getElementById('numeromesasinput').style.visibility = "hidden"

    document.getElementById('numeroacomodacoesinput').style.visibility = "hidden"

    document.getElementById('numerolugaresinput').style.visibility = "visible"

}
