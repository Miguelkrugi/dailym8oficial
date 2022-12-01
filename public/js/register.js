$(document).ready(function() {

    $('#btnSubmit').on('click', function(event) {

        // prevent form default behaviour
        event.preventDefault();

        // disabled the submit button
        $("#btnSubmit").prop("disabled", true);

        const formData = {
            name: jQuery('[Name=name]').val(),
            username:jQuery('name=username').val(),
            email: jQuery('[name=email]').val(),
            pw: jQuery('[name=pw]').val(),
        };

        $.ajax({
            url : "https://dailym8nodeproj.fly.dev/api/insertnewuser",
            type: "POST",
            data : formData, // data in json format
            async : false, // enable or disable async (optional, but suggested as false if you need to populate data afterwards)
            success: function(response, textStatus, jqXHR) {
                console.log(response);
                localStorage.setItem("user", JSON.stringify(response))
                window.location = "https://dailym8nodeproj.fly.dev/user-logged-1.html"
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });
});