$(document).ready(function() {

    $('#btnLogin').on('click', function(event) {

        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnSubmit").prop("disabled", true);

        let username = document.getElementById('utilizador_username').value
        let password = document.getElementById('utilizador_password').value


        $.ajax({
            url: 'https://dailym8nodeproj.fly.dev/api/loginuser/'+username+'/'+password,
        type: "GET",
            dataType: 'json',
            success: function(response) {
                console.log(Object.keys(response).length)
                if(Object.keys(response).length==0){
                    alert("Garciou")
                }else{
                    alert("Login Efetuado com Relativo Sucesso!")
                    localStorage.setItem("user", JSON.stringify(response))
                    window.location = "https://dailym8nodeproj.fly.dev/user-logged-1.html"
                }



        },
        error: function (response) {
            alert("Garciou")
            $("#btnSubmit").prop("disabled", false)
        }
    });

    });
});