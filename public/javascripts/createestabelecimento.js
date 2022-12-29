async function criarRestaurant(user_id){

    try {
   
     
     var userr_id = user_id
   
     establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id

      let data = {
   
       establishment_name: document.getElementById("nomeinput").value,
       establishment_description: document.getElementById("descricaoinput").value,
       establishment_utilizador_id: user_id,
       restaurant_type_id: 1, //DEFAULT FOR NOW
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


    document.getElementById('createrestaurant').addEventListener("click", function(){

        console.log("Funcao Chamada");
        criarRestaurant(utilizador_id);
        
      
      });

      document.getElementById('createacomodacao').addEventListener("click", function(){

        console.log("Funcao Chamada");
        criarAcomodacao(utilizador_id);
        
      
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

}

function createAcomodacao() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Serviço de Acomodação"

    document.getElementById('numeromesastexto').innerHTML = "Número de Acomodações"

    document.getElementById('numeromesasinput').style.visibility = "hidden"

    document.getElementById('numeroacomodacoesinput').style.visibility = "visible"

    document.getElementById('numerolugaresinput').style.visibility = "hidden"

    document.getElementById('createrestaurant').style.visibility = "hidden"

    document.getElementById('createacomodacao').style.visibility = "visible"

}

function createEstacionamento() {

    document.getElementById('textomeusestabelecimentos').innerHTML = "Criar Estacionamento"

    document.getElementById('numeromesastexto').innerHTML = "Número de Lugares"

    document.getElementById('numeromesasinput').style.visibility = "hidden"

    document.getElementById('numeroacomodacoesinput').style.visibility = "hidden"

    document.getElementById('numerolugaresinput').style.visibility = "visible"

}
