async function consla(){

  console.log("A funcionar...");
}

async function registreamento() {

    console.log("Storing...");
   
   
   
   console.log("Registering user...");
   
   try {
   
     var type_user = 1;
   
   
     let data = {
   
       utilizador_name: document.getElementById("fname").value,
       utilizador_username: document.getElementById("fusername").value,
       utilizador_email: document.getElementById("femail").value,
       utilizador_password: document.getElementById("fpswd").value,
       utilizador_type_id: type_user,
   
     }
   
     let newUser = await $.ajax({
   
         url: "/users/insertnewuser",
         method: "post",
         data: JSON.stringify(data),
         contentType: "application/json",
         dataType: "json"
   
         
     });

     console.log("Inserted new user with id: " + newUser.utilizador_id)
     
   } catch (err) {
     
       console.log(err);
   
   }
   console.log("Stored...");
   }




   async function login(){

    console.log("Função login chamada...")

   try{

    let object = {

         utilizador_username: document.getElementById("fnamelogin").value,
         utilizador_password: document.getElementById("fpswdlogin").value,
  
    };

    console.log("Sending the object with values: " + object);

    let authUser = await $.ajax({
        url: "/users/loginuser",
        method: "post",
        data: JSON.stringify(object),
        contentType: "application/json",
        dataType: "json",


    });
   // alert("Authenticate user: " + JSON.stringify(authUser));
   console.log("Verifying user with username: " + authUser.utilizador_username + " and password: " + authUser.utilizador_password);

    sessionStorage.setItem('utilizador_id', authUser.utilizador_id);
    sessionStorage.setItem('utilizador_name', authUser.utilizador_name);
    sessionStorage.setItem('utilizador_username', authUser.utilizador_username);
    sessionStorage.setItem('utilizador_email', authUser.utilizador_email);
    sessionStorage.setItem('utilizador_password', authUser.utilizador_password);
    sessionStorage.setItem('utilizador_type_id', authUser.utilizador_type_id);
  //  window.alert('login sucessfull');
    
    //window.location.assign("https://bodyhealthweb.herokuapp.com/dashboardTemplate.html");

    
    console.log(authUser.user_id);
    window.location.replace("http://localhost:3000/index-2.html");
   }  catch (err) {
    console.log(err);
  //  window.alert('something wron;g')
   // window.location.assign("http://bodyhealthweb.herokuapp.com/login.html");

    }

}