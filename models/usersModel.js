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

module.exports.getRandomSuggestedAcomodacoes = async function() {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, utilizador.utilizador_username FROM equipment_service INNER JOIN utilizador ON utilizador.utilizador_id = equipment_service.establishment_utilizador_id " + "ORDER BY random() LIMIT 4 ";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRandomSuggestedEstacionamentos = async function() {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, utilizador.utilizador_username FROM parking_lot INNER JOIN utilizador ON utilizador.utilizador_id = parking_lot.establishment_utilizador_id " + "ORDER BY random() LIMIT 4";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getThreeComments = async function() {
    try {
        let sql = "SELECT *, utilizador.utilizador_id,utilizador.utilizador_name FROM comentario_site INNER JOIN utilizador ON utilizador.utilizador_id = comentario_site.comentario_utilizador_id ORDER BY comentario_site.comentario_date DESC";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRandomEstacionamento = async function() {
    try {
        let sql = "SELECT *,  place_estacionamento.local_id, place_estacionamento.local_morada, place_estacionamento.ref_system_id, place_estacionamento.geometry_info_point, place_estacionamento.local_estacionamento_id, place_estacionamento.local_latitude, place_estacionamento.local_longitude FROM parking_lot INNER JOIN place_estacionamento ON place_estacionamento.local_estacionamento_id = parking_lot.parking_lot_id ORDER BY random() LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//A FAZER
module.exports.getFilterServicesAcomodacaoCrescente = async function() {
    try {
        let sql = "SELECT *,  place_estacionamento.local_id, place_estacionamento.local_morada, place_estacionamento.ref_system_id, place_estacionamento.geometry_info_point, place_estacionamento.local_estacionamento_id, place_estacionamento.local_latitude, place_estacionamento.local_longitude FROM parking_lot INNER JOIN place_estacionamento ON place_estacionamento.local_estacionamento_id = parking_lot.parking_lot_id ORDER BY parking_lot.parking_lot_number_spots ASC LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//A FAZER
module.exports.getFilterServicesAcomodacaoDecrescente = async function() {
    try {
        let sql = "SELECT *,  place_estacionamento.local_id, place_estacionamento.local_morada, place_estacionamento.ref_system_id, place_estacionamento.geometry_info_point, place_estacionamento.local_estacionamento_id, place_estacionamento.local_latitude, place_estacionamento.local_longitude FROM parking_lot INNER JOIN place_estacionamento ON place_estacionamento.local_estacionamento_id = parking_lot.parking_lot_id ORDER BY parking_lot.parking_lot_number_spots DESC LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRandomRestaurants = async function() {
    try {
        let sql = "SELECT *, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM restaurant INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id ORDER BY random() LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getFilterRestaurantsCrescente = async function() {
    try {
        let sql = "SELECT *, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM restaurant INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id ORDER BY  restaurant.restaurante_number_tables ASC LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.getFilterServicesAcomodacaoCrescente = async function() {
    try {
        let sql = "SELECT *,  place_servico_acomodacoes.local_id, place_servico_acomodacoes.local_morada, place_servico_acomodacoes.ref_system_id, place_servico_acomodacoes.geometry_info_point, place_servico_acomodacoes.local_servico_acomodacoes_id, place_servico_acomodacoes.local_latitude, place_servico_acomodacoes.local_longitude FROM equipment_service INNER JOIN place_servico_acomodacoes ON place_servico_acomodacoes.local_servico_acomodacoes_id = equipment_service.equipment_service_id ORDER BY equipment_service.number_acomodacoes ASC LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getFilterServicesAcomodacaoDecrescente = async function() {
    try {
        let sql = "SELECT *,  place_servico_acomodacoes.local_id, place_servico_acomodacoes.local_morada, place_servico_acomodacoes.ref_system_id, place_servico_acomodacoes.geometry_info_point, place_servico_acomodacoes.local_servico_acomodacoes_id, place_servico_acomodacoes.local_latitude, place_servico_acomodacoes.local_longitude FROM equipment_service INNER JOIN place_servico_acomodacoes ON place_servico_acomodacoes.local_servico_acomodacoes_id = equipment_service.equipment_service_id ORDER BY equipment_service.number_acomodacoes DESC LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getFilterRestaurantsDecrescente = async function() {
    try {
        let sql = "SELECT *, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM restaurant INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id ORDER BY  restaurant.restaurante_number_tables DESC LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getFilterRestaurants = async function(type) {
    try {
        let sql = "SELECT *, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM restaurant INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id WHERE restaurant.restaurant_type_id = " + type;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRandomServicesAcomodacao = async function() {
    try {
        let sql = "SELECT *,  place_servico_acomodacoes.local_id, place_servico_acomodacoes.local_morada, place_servico_acomodacoes.ref_system_id, place_servico_acomodacoes.geometry_info_point, place_servico_acomodacoes.local_servico_acomodacoes_id, place_servico_acomodacoes.local_latitude, place_servico_acomodacoes.local_longitude FROM equipment_service INNER JOIN place_servico_acomodacoes ON place_servico_acomodacoes.local_servico_acomodacoes_id = equipment_service.equipment_service_id ORDER BY random() LIMIT 12";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

