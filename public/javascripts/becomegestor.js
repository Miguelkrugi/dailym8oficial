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

   document.getElementById('becomegestorbtn').addEventListener("click", function(){

      becomegestorfunction(utilizador_id);


   });
   
   // getAleatorioRestaurantes();

}


async function becomegestorfunction(id){
    
    console.log("IDENTIFICADOR (DEVE SER 3): " + id);



        try{
      
          let ementas = await $.ajax({
      
            url: "/users/become/gestor/" + id,
            method: "put",
            dataType: "json",
      
          });
      
          console.log("[utilizador] utilizador = " + JSON.stringify(ementas));
      
          
      
      
       } catch(err){
         console.log(err);
       }
      
      
       }

