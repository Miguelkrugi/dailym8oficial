const { response } = require("express");
var pool = require("./connection");
var bcrypt = require('bcrypt');
var salt = 10;

module.exports.saveUser = async function(user) {
   
    let password = bcrypt.hashSync(user.utilizador_password, salt);

    console.log("Hash: " + password);

    try {

        let sql =
            "INSERT " +
            "INTO utilizador " +
            "(utilizador_name, utilizador_username, utilizador_email, utilizador_password, utilizador_type_id) " +
            "VALUES ($1, $2, $3, $4, $5) " +
            "RETURNING utilizador_id";

            //console.log(user.user_name + "|" + user.user_password + "|" + user.user_morada + "|" + user.user_email + "|" + user.user_points + "|" + user.user_admin + "|" + user.user_pt + "|" + user.user_nutri);
        let result = await pool.query(sql, [user.utilizador_name, user.utilizador_username ,user.utilizador_email, password, user.utilizador_type_id]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.authUser = async function(uti_name){

    try {
        let sql = "SELECT * FROM utilizador where utilizador.utilizador_username = $1";

        let result = await pool.query(sql,[uti_name.utilizador_username]);

        console.log("authUser.result.rows = " + JSON.stringify(result.rows));

        let passwordb = result.rows[0].utilizador_password;

        console.log("authUser.passwordb = " + JSON.stringify(passwordb));
        console.log("authUser.uti_name.user_password = " + JSON.stringify(uti_name.utilizador_password));

        let valor = bcrypt.compareSync(uti_name.utilizador_password, passwordb); 

        console.log("authUser.valor = " + JSON.stringify(valor));

        //console.log("[usersModel.getUserDados] dados_utilizador = " + JSON.stringify(dadosfound));

        if(result.rows.length > 0 && valor)
          
          return { status: 200, result: result.rows[0]};
            //return { status: 200, result: result.rows[0]};
        else return { status: 401, result: {msg:' wrong email or passsword'}};
        
    } catch (err) {
        console.log(err);
        return { status: 500, result: {msg: 'wrong email or passsword'}};
    }

    console.log("UTILIZADOR LOGADO");
    /*

       let sql = "SELECT * FROM utilizador " + "WHERE utilizador.user_name = " + uti_name + " AND utilizador.user_password = " + uti_pass; 
       let result = await pool.query(sql);

       if(result.rows > 0){
         
        response.send('/mainpage.html');

        response.end();

       } else {
           console.log("no");
           response.end();
       }
       */

    

}

module.exports.getRandomSuggestedRestaurants = async function() {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, utilizador.utilizador_username, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM restaurant INNER JOIN utilizador ON utilizador.utilizador_id = restaurant.establishment_utilizador_id INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id " + "ORDER BY random() LIMIT 4";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}