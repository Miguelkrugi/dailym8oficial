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


module.exports.getCountLikeRestaurant = async function(restaurant_id) {
    try {
        let sql = "SELECT COUNT(*) FROM like_restaurante WHERE like_restaurante = " + restaurant_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getCountLikeAcomodacao = async function(equipment_service_id) {
    try {
        let sql = "SELECT COUNT(*) FROM like_servico_acomodacao WHERE like_servico_acomodacao = " + equipment_service_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRestaurantPlatesFilter = async function(est_id, plate_identifier) {
    try {
        let sql = "SELECT *, plate_type.plate_type_id, plate_type.plate_type_name FROM plate INNER JOIN plate_type ON plate_type.plate_type_id = plate.plate_type_identifier WHERE plate.plate_restaurant_id = " + est_id + " AND plate.plate_availability = '0' AND plate_type.plate_type_id = " + plate_identifier;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRestaurantTablesFilter = async function(rest_id, table_type_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + rest_id + " AND mesa.mesa_availability = '0' AND mesa.mesa_type_id = " + table_type_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRestaurantTables = async function(rest_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + rest_id + " AND mesa.mesa_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRestaurantPlace = async function(rest_id) {
    try {
        let sql = "SELECT * FROM place_restaurante WHERE place_restaurante.local_restaurante_id = " + rest_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAcomodacaoPlace = async function(rest_id) {
    try {
        let sql = "SELECT * FROM place_servico_acomodacoes WHERE place_servico_acomodacoes.local_servico_acomodacoes_id = " + rest_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getRestaurantTablesInterior = async function(rest_id, table_type_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + rest_id + " AND mesa.mesa_availability = '0' AND mesa.mesa_type_id = " + table_type_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.getPlates = async function(est_id) {
    try {
        let sql = "SELECT *, plate_type.plate_type_id, plate_type.plate_type_name FROM plate INNER JOIN plate_type ON plate_type.plate_type_id = plate.plate_type_identifier WHERE plate.plate_restaurant_id = " + est_id + " AND plate.plate_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAcomodacoesService = async function(est_id) {
    try {
        let sql = "SELECT *, acomodacao_type.acomodacao_type_id, acomodacao_type.acomodacao_type_name, position_acomodacao.position_acomodacao_id, position_acomodacao.position_line, position_acomodacao.position_column FROM acomodacao INNER JOIN acomodacao_type ON acomodacao_type.acomodacao_type_id = acomodacao.acomodacao_type_id INNER JOIN position_acomodacao ON position_acomodacao.acomodacao_identifier = acomodacao.acomodacao_id WHERE acomodacao.acomodacao_equipment_service_id = " + est_id + " AND acomodacao.acomodacao_availability = '0'";
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

module.exports.getUsers = async function() {
    try {
        let sql = "select * from utilizador";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getLatestReports = async function() {
    try {
        let sql = "SELECT *, restaurant.establishment_id, restaurant.establishment_name, restaurant.restaurant_id, restaurant.state_id, utilizador.utilizador_id, utilizador.utilizador_username, utilizador.utilizador_name, state_type.state_id, state_type.state_name FROM report_restaurante INNER JOIN restaurant ON restaurant.restaurant_id = report_restaurante.report_restaurante_id INNER JOIN utilizador ON utilizador.utilizador_id = restaurant.establishment_utilizador_id INNER JOIN state_type ON state_type.state_id = restaurant.state_id";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getLatestReportsAcomodacao = async function() {
    try {
        let sql = "SELECT *, equipment_service.establishment_id, equipment_service.establishment_name, equipment_service.equipment_service_id, equipment_service.state_id, utilizador.utilizador_id, utilizador.utilizador_username, utilizador.utilizador_name, state_type.state_id, state_type.state_name FROM report_servico_acomodacao INNER JOIN equipment_service ON equipment_service.equipment_service_id = report_servico_acomodacao.report_servico_acomodacao_id INNER JOIN utilizador ON utilizador.utilizador_id = equipment_service.establishment_utilizador_id INNER JOIN state_type ON state_type.state_id = equipment_service.state_id ";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

/////////////// AINDA  N FOI APLICADO /////////////////

module.exports.getInAnalysisPlacesRestaurant = async function() {
    try {
        let sql = "SELECT *, utilizador.utilizador_name, utilizador.utilizador_id, utilizador.utilizador_username, state_type.state_id, state_type.state_name, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM restaurant INNER JOIN utilizador ON utilizador.utilizador_id = restaurant.establishment_utilizador_id INNER JOIN state_type ON  state_type.state_id = restaurant.state_id INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id WHERE state_type.state_id = 2 ";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.getInAnalysisPlacesAcomodacao = async function() {
    try {
        let sql = "SELECT *, utilizador.utilizador_name, utilizador.utilizador_id, utilizador.utilizador_username, state_type.state_id, state_type.state_name FROM equipment_service INNER JOIN utilizador ON utilizador.utilizador_id = equipment_service.establishment_utilizador_id INNER JOIN state_type ON  state_type.state_id = equipment_service.state_id WHERE state_type.state_id = 2 ";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getUsersForPromotion = async function() {
    try {
        let sql = "SELECT *, utilizador_type.utilizador_type_id, utilizador_type.utilizador_type_name FROM utilizador INNER JOIN utilizador_type ON utilizador_type.utilizador_type_id = utilizador.utilizador_type_id WHERE utilizador_type.utilizador_type_id = 1 OR utilizador_type.utilizador_type_id = 2";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getFavoritosRestaurante = async function(est_id) {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, utilizador.utilizador_username, restaurant.establishment_id, restaurant.establishment_description, restaurant.establishment_name, restaurant.restaurante_number_tables, restaurant.state_id, restaurant.restaurant_type_id, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM like_restaurante INNER JOIN utilizador ON utilizador.utilizador_id = like_restaurante.like_utilizador INNER JOIN restaurant ON restaurant.restaurant_id = like_restaurante.like_restaurante INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id where utilizador.utilizador_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getFavoritosAcomodacao = async function(est_id) {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, utilizador.utilizador_username, equipment_service.establishment_id, equipment_service.establishment_description, equipment_service.establishment_name, equipment_service.number_acomodacoes, equipment_service.state_id FROM like_servico_acomodacao INNER JOIN utilizador ON utilizador.utilizador_id = like_servico_acomodacao.like_utilizador INNER JOIN equipment_service ON equipment_service.equipment_service_id = like_servico_acomodacao.like_servico_acomodacao where utilizador.utilizador_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.UpdateGestor = async function(id_user){

    try {
        let sql = "UPDATE utilizador " + "SET utilizador_type_id = 2 " + "WHERE utilizador_id = " + id_user;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getMyRestaurants = async function(est_id) {
    try {
        let sql = "SELECT *, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name, state_type.state_id, state_type.state_name, place_restaurante.local_morada, place_restaurante.local_id, place_restaurante.ref_system_id, place_restaurante.geometry_info_point, place_restaurante.local_restaurante_id, place_restaurante.local_latitude, place_restaurante.local_longitude, utilizador.utilizador_id, utilizador.utilizador_username FROM restaurant INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id INNER JOIN  state_type ON state_type.state_id = restaurant.state_id INNER JOIN place_restaurante ON place_restaurante.local_restaurante_id = restaurant.restaurant_id INNER JOIN utilizador ON utilizador.utilizador_id = restaurant.establishment_utilizador_id where utilizador.utilizador_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}