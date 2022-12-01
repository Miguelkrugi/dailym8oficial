let id = localStorage.getItem("establishment_id")


$(document).ready(

    function restaurantdetail(){

        $.ajax({
            url: "https://dailym8nodeproj.fly.dev/api/restaurante/"+id,
            type: "GET",
            dataType: 'json',
            success: function(result) {

                console.log("="+result);
                $('#Restaurantes').text(result)
                let teste = document.querySelector("#detailrest")
                let html = ""

                for (let i in result) {
                    let h2 = result[i].establishment_name + " - " + result[i].restaurant_type_id
                    html += ` 
                    
                    <h1>${result[i].establishment_name}</h1> ` 
                }
                console.log("Ola: "+id)
                teste.innerHTML=html

            }

        });
    }
);

