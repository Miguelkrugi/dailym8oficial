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

    

        if(result.rows.length > 0 && valor)
          
          return { status: 200, result: result.rows[0]};

        else return { status: 401, result: {msg:' wrong email or passsword'}};
        
    } catch (err) {
        console.log(err);
        return { status: 500, result: {msg: 'wrong email or passsword'}};
    }

   // console.log("UTILIZADOR LOGADO");


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
        console.error("__________________________________________________________");
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
        console.error("_______________________________________________________________________________________");
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
        console.error("------------------------------------------------");
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

module.exports.getMyAcomodacao = async function(est_id) {
    try {
        let sql = "SELECT *, state_type.state_id, state_type.state_name, place_servico_acomodacoes.local_morada, place_servico_acomodacoes.local_id, place_servico_acomodacoes.ref_system_id, place_servico_acomodacoes.geometry_info_point, place_servico_acomodacoes.local_servico_acomodacoes_id, place_servico_acomodacoes.local_latitude, place_servico_acomodacoes.local_longitude, utilizador.utilizador_id, utilizador.utilizador_username FROM equipment_service INNER JOIN  state_type ON state_type.state_id = equipment_service.state_id INNER JOIN place_servico_acomodacoes ON place_servico_acomodacoes.local_servico_acomodacoes_id = equipment_service.equipment_service_id INNER JOIN utilizador ON utilizador.utilizador_id = equipment_service.establishment_utilizador_id where utilizador.utilizador_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMyEstacionamentos = async function(est_id) {
    try {
        let sql = "SELECT *, state_type.state_id, state_type.state_name, place_estacionamento.local_morada, place_estacionamento.local_id, place_estacionamento.ref_system_id, place_estacionamento.geometry_info_point, place_estacionamento.local_estacionamento_id, place_estacionamento.local_latitude, place_estacionamento.local_longitude, utilizador.utilizador_id, utilizador.utilizador_username FROM parking_lot INNER JOIN  state_type ON state_type.state_id = parking_lot.state_id INNER JOIN place_estacionamento ON place_estacionamento.local_estacionamento_id = parking_lot.parking_lot_id INNER JOIN utilizador ON utilizador.utilizador_id = parking_lot.establishment_utilizador_id where utilizador.utilizador_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMyReservasRestaurant = async function(est_id) {
    try {
        let sql = "SELECT *, mesa.mesa_number, mesa.mesa_size, mesa.mesa_restaurant_id, mesa.mesa_type_id, mesa.mesa_price, mesa_type.mesa_type_id, mesa_type.mesa_type_name, restaurant.establishment_id, restaurant.establishment_name, place_restaurante.local_id, place_restaurante.ref_system_id, place_restaurante.geometry_info_point, place_restaurante.local_restaurante_id, place_restaurante.local_morada FROM reserva_mesa INNER JOIN mesa ON mesa.mesa_id = reserva_mesa.mesa_identifier_reservation INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id INNER JOIN restaurant ON restaurant.restaurant_id = mesa.mesa_restaurant_id INNER JOIN place_restaurante ON place_restaurante.local_restaurante_id = restaurant.restaurant_id WHERE reserva_mesa.user_identifier_reservation = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getMyReservasAcomodacao = async function(est_id) {
    try {
        let sql = "SELECT *, acomodacao.acomodacao_number, acomodacao.acomodacao_price, acomodacao.acomodacao_type_id, acomodacao.acomodacao_equipment_service_id,acomodacao_type.acomodacao_type_id, acomodacao_type.acomodacao_type_name, equipment_service.establishment_id, equipment_service.establishment_name, position_acomodacao.position_acomodacao_id, position_acomodacao.position_line, position_acomodacao.position_column, position_acomodacao.acomodacao_identifier ,place_servico_acomodacoes.local_id, place_servico_acomodacoes.ref_system_id, place_servico_acomodacoes.geometry_info_point, place_servico_acomodacoes.local_servico_acomodacoes_id, place_servico_acomodacoes.local_morada FROM reserva_acomodacao INNER JOIN acomodacao ON acomodacao.acomodacao_id = reserva_acomodacao.acomodacao_identifier_reservation INNER JOIN acomodacao_type ON acomodacao_type.acomodacao_type_id = acomodacao.acomodacao_type_id INNER JOIN position_acomodacao ON position_acomodacao.acomodacao_identifier = acomodacao.acomodacao_id INNER JOIN equipment_service ON equipment_service.equipment_service_id = acomodacao.acomodacao_equipment_service_id INNER JOIN place_servico_acomodacoes ON place_servico_acomodacoes.local_servico_acomodacoes_id = equipment_service.equipment_service_id WHERE reserva_servico_acomodacao.user_identifier_reservation = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getPlaceFromRestaurant = async function(est_id) {
    try {
        let sql = "SELECT place_restaurante.local_restaurante_id, place_restaurante.local_morada FROM place_restaurante WHERE place_restaurante.local_restaurante_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getUserInfo = async function(est_id) {
    try {
        let sql = "SELECT * FROM utilizador WHERE utilizador.utilizador_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRestaurantReservas = async function(est_id) {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, mesa.mesa_number, mesa.mesa_size, mesa_type.mesa_type_id, mesa_type.mesa_type_name, mesa.mesa_restaurant_id FROM reserva_mesa INNER JOIN utilizador ON utilizador.utilizador_id = reserva_mesa.user_identifier_reservation INNER JOIN mesa ON mesa.mesa_id = reserva_mesa.mesa_identifier_reservation INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAcomodacaoReservas = async function(est_id) {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, acomodacao.acomodacao_number, acomodacao.acomodacao_size, acomodacao_type.acomodacao_type_id, acomodacao_type.acomodacao_type_name, acomodacao.acomodacao_equipment_service_id FROM reserva_acomodacao INNER JOIN utilizador ON utilizador.utilizador_id = reserva_acomodacao.user_identifier_reservation INNER JOIN acomodacao ON acomodacao.acomodacao_id = reserva_acomodacao.acomodacao_identifier_reservation INNER JOIN acomodacao_type ON acomodacao_type.acomodacao_type_id = acomodacao.acomodacao_type_id WHERE acomodacao.acomodacao_equipment_service_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getEstacionamentoReservas = async function(est_id) {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, spot.spot_number, spot.spot_price, spot.spot_parking_lot_id FROM reserva_spot INNER JOIN utilizador ON utilizador.utilizador_id = reserva_spot.user_identifier_reservation INNER JOIN spot ON spot.spot_id = reserva_spot.spot_identifier_reservation WHERE spot.spot_parking_lot_id = " + est_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getRestaurantMenu = async function(est_id) {
    try {
        let sql = "SELECT *, plate_type.plate_type_id, plate_type.plate_type_name FROM plate INNER JOIN plate_type ON plate_type.plate_type_id = plate.plate_type_identifier WHERE plate.plate_restaurant_id =" + est_id + " AND plate.plate_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.getRestaurantMenuUnavailable = async function(est_id) {
    try {
        let sql = "SELECT *, plate_type.plate_type_id, plate_type.plate_type_name FROM plate INNER JOIN plate_type ON plate_type.plate_type_id = plate.plate_type_identifier WHERE plate.plate_restaurant_id =" + est_id + " AND plate.plate_availability = '1'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getLugaresAvailable = async function(est_id) {
    try {
        let sql = "SELECT * FROM spot WHERE spot.spot_parking_lot_id = " + est_id + " AND spot.spot_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAcomodacoesAvailable = async function(est_id) {
    try {
        let sql = "SELECT *, acomodacao_type.acomodacao_type_id, acomodacao_type.acomodacao_type_name FROM acomodacao INNER JOIN acomodacao_type ON acomodacao_type.acomodacao_type_id = acomodacao.acomodacao_type_id WHERE acomodacao.acomodacao_equipment_service_id = " + est_id + " AND acomodacao.acomodacao_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMesasAvailable = async function(est_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + est_id + " AND mesa.mesa_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMesasUnavailable = async function(est_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + est_id + " AND mesa.mesa_availability = '1'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getLugarAvailable = async function(est_id) {
    try {
        let sql = "SELECT * FROM spot WHERE spot.spot_parking_lot_id = " + est_id + " AND spot.spot_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getLugarAvailableDecrescente = async function(est_id) {
    try {
        let sql = "SELECT * FROM spot WHERE spot.spot_parking_lot_id = " + est_id + " AND spot.spot_availability = '0' ORDER BY spot.spot_price DESC";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getLugarAvailableCrescente = async function(est_id) {
    try {
        let sql = "SELECT * FROM spot WHERE spot.spot_parking_lot_id = " + est_id + " AND spot.spot_availability = '0' ORDER BY spot.spot_price ASC";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getCheckLikeRestaurante = async function(utilizador_id ,restaurant_id) {
    try {
        let sql = "SELECT * FROM like_restaurante WHERE like_restaurante.like_utilizador = " + utilizador_id + " AND like_restaurante.like_restaurante = " + restaurant_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getCheckLikeAcomodacao = async function(utilizador_id ,acomodacao_id) {
    try {
        let sql = "SELECT * FROM like_servico_acomodacao WHERE like_servico_acomodacao.like_utilizador = " + utilizador_id + " AND like_servico_acomodacao.like_servico_acomodacao = " + acomodacao_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMenu = async function(restaurant_id) {
    try {
        console.error("---------------------------------------------------------------------------");
        let sql = "SELECT *, plate_type.plate_type_id, plate_type.plate_type_name FROM plate INNER JOIN plate_type ON plate_type.plate_type_id = plate.plate_type_identifier WHERE plate.plate_restaurant_id = " + restaurant_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

// Pedir ao Mike para ver comigo esta
module.exports.get50Reservas = async function(restaurant_id) {
    try {
        let sql = "SELECT *, utilizador.utilizador_id, utilizador.utilizador_name, mesa.mesa_number, mesa.mesa_size, mesa_type.mesa_type_id, mesa_type.mesa_type_name, mesa.mesa_restaurant_id FROM reserva_mesa INNER JOIN utilizador ON utilizador.utilizador_id = reserva_mesa.user_identifier_reservation INNER JOIN mesa ON mesa.mesa_id = reserva_mesa.mesa_identifier_reservation INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + restaurant_id + " =   LIMIT 50 " ;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getMenuDisponivel = async function(restaurant_id) {
    try {
        console.error("---------------------------------------------------------------");
        let sql = "SELECT *, plate_type.plate_type_id, plate_type.plate_type_name FROM plate INNER JOIN plate_type ON plate_type.plate_type_id = plate.plate_type_identifier WHERE plate.plate_restaurant_id = " + restaurant_id + " AND plate.plate_availability = '0'" ;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getIndispinivel = async function(restaurant_id) {
    try {
        let sql = "SELECT *, plate_type.plate_type_id, plate_type.plate_type_name FROM plate INNER JOIN plate_type ON plate_type.plate_type_id = plate.plate_type_identifier WHERE plate.plate_restaurant_id = " + restaurant_id + " AND plate.plate_availability = '1'";
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMesas = async function(restaurant_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + restaurant_id;
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMesaDisp = async function(restaurant_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + restaurant_id + " AND mesa.mesa_availability = '0'";
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getMesaIndisp = async function(restaurant_id) {
    try {
        let sql = "SELECT *, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM mesa INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE mesa.mesa_restaurant_id = " + restaurant_id +" AND mesa.mesa_availability = '1'";
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getLikeRest = async function(restaurant_id) {
    try {
        let sql = "SELECT * FROM like_restaurante WHERE like_restaurante.like_utilizador =  AND like_restaurante.like_restaurante = " + restaurant_id;
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getLikeAco = async function(acomodacao_id) {
    try {
        let sql = "SELECT * FROM like_servico_acomodacao WHERE like_servico_acomodacao.like_utilizador =  AND like_servico_acomodacao.like_servico_acomodacao =" + acomodacao_id;
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.saveLikeRestaurante = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {

        let sql =
            "INSERT " +
            "INTO like_restaurante " +
            "(like_utilizador, like_restaurante) " +
            "VALUES ($1, $2) " +
            "RETURNING like_id";

            console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.like_utilizador, pedido.like_restaurante]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.DeleteLike = async function(user_id, rest_id){

    try{
        let sql = "DELETE FROM like_restaurante " + "WHERE like_utilizador = " + user_id + " AND like_restaurante = " + rest_id;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[artigoModel.getArtigoCategory] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}


module.exports.saveRestaurant = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO restaurant " +
            "(establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7) " +
            "RETURNING restaurant_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.establishment_name, pedido.establishment_description, pedido.establishment_utilizador_id, pedido.restaurant_type_id, pedido.restaurante_number_tables, pedido.type_service_identifier, pedido.state_id]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.saveEstacionamento = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));

    try {

        let sql =
            "INSERT " +
            "INTO parking_lot " +
            "(establishment_name, establishment_description, establishment_utilizador_id, parking_lot_number_spots, type_service_identifier, state_id) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING parking_lot_id";

        let result = await pool.query(sql, [pedido.establishment_name, pedido.establishment_description, pedido.establishment_utilizador_id, pedido.parking_lot_number_spots, pedido.type_service_identifier, pedido.state_id]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.saveAcomodacao = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));

    try {

        let sql =
            "INSERT " +
            "INTO acomodacao " +
            "(acomodacao_number, acomodacao_availability, acomodacao_type_id, acomodacao_equipment_service_id, acomodacao_price, acomodacao_description) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING acomodacao_id";

        let result = await pool.query(sql, [pedido.acomodacao_number, pedido.acomodacao_availability, pedido.acomodacao_type_id, pedido.acomodacao_equipment_service_id, pedido.acomodacao_price, pedido.acomodacao_description]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.saveMesa = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO mesa " +
            "(mesa_availability, mesa_number, mesa_size, mesa_restaurant_id, mesa_type_id, mesa_price) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING mesa_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.mesa_availability, pedido.mesa_number, pedido.mesa_size, pedido.mesa_restaurant_id, pedido.mesa_type_id, pedido.mesa_price]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.savePratoo = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO plate " +
            "(plate_name, plate_price, plate_restaurant_id, plate_availability, plate_type_identifier, plate_type_description) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING plate_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.plate_name, pedido.plate_price, pedido.plate_restaurant_id, pedido.plate_availability, pedido.plate_type_identifier, pedido.plate_type_description]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

///////AINDA N FOI APLICADO///////

module.exports.UpdateOffPlate = async function(id_plate){

    try {
        let sql = "UPDATE plate " + "SET plate_availability = '1' " + "WHERE plate_id = " + id_plate;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.UpdateOnPlate = async function(id_plate){

    try {
        let sql = "UPDATE plate " + "SET plate_availability = '0' " + "WHERE plate_id = " + id_plate;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.DeletePlate = async function(id_plate){

    try{
        let sql = "DELETE FROM plate " + "WHERE plate_id = " + id_plate;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[artigoModel.getArtigoCategory] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.DeleteMesa = async function(mesa_id){

    try{
        console.log("---------------------------------------------------------------------------------------------------------------------------------------------");
        let sql = "DELETE FROM mesa " + "WHERE mesa_id = " + mesa_id;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[artigoModel.getArtigoCategory] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.DeleteLugar = async function(mesa_id){

    try{
        console.log("---------------------------------------------------------------------------------------------------------------------------------------------");
        let sql = "DELETE FROM spot " + "WHERE spot_id = " + mesa_id;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[artigoModel.getArtigoCategory] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.DeleteReservaEstacionamento = async function(mesa_id){

    try{
        console.log("---------------------------------------------------------------------------------------------------------------------------------------------");
        let sql = "DELETE FROM reserva_spot " + "WHERE id_reservation = " + mesa_id;
    } catch(err){
        console.log(err);
        return {status: 500, data: err};
      }
    }

module.exports.DeleteResMesa = async function(id_reservation){
    try{
        console.log("---------------------------------------------------------------------------------------------------------------------------------------------");
        let sql = "DELETE FROM reserva_mesa " + "WHERE id_reservation = " + id_reservation;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[artigoModel.getArtigoCategory] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
 

}

module.exports.saveReservaSpot = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));

    let pccn = bcrypt.hashSync(pedido.payment_credit_card_number, salt);

    let pcn = bcrypt.hashSync(pedido.payment_cvc_number, salt);

   // console.log(pcn);

    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)

        let sql =
            "INSERT " +
            "INTO reserva_spot " +
            "(date_marcacao_reservation, user_identifier_reservation, spot_identifier_reservation, date_marcada_reservation, payment_credit_card_number, payment_cvc_number) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING id_reservation";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
       let result = await pool.query(sql, [pedido.date_marcacao_reservation, pedido.user_identifier_reservation, pedido.spot_identifier_reservation, pedido.date_marcada_reservation, pccn, pcn]);

       // let result = await pool.query(sql, ["2023-01-03",1, 12, "2023-01-15", "343435", "236123"]);

        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.saveReservaMesa = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));

    let pccn = bcrypt.hashSync(pedido.payment_credit_card_number, salt);

    let pcn = bcrypt.hashSync(pedido.payment_cvc_number, salt);

   // console.log(pcn);

    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)

        let sql =
            "INSERT " +
            "INTO reserva_mesa " +
            "(date_marcacao_reservation, user_identifier_reservation, mesa_identifier_reservation, date_marcada_reservation, payment_credit_card_number, payment_cvc_number) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING id_reservation";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
       let result = await pool.query(sql, [pedido.date_marcacao_reservation, pedido.user_identifier_reservation, pedido.mesa_identifier_reservation, pedido.date_marcada_reservation, pccn, pcn]);

       // let result = await pool.query(sql, ["2023-01-03",1, 12, "2023-01-15", "343435", "236123"]);

        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.saveReservaAcomodacao = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO reserva_acomodacao " +
            "(date_marcacao_reservation, user_identifier_reservation, acomodacao_identifier_reservation, date_marcada_reservation, payment_credit_card_number, payment_cvc_number) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING id_reservation";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.date_marcacao_reservation, pedido.user_identifier_reservation, pedido.acomodacao_identifier_reservation, pedido.date_marcada_reservation, pedido.payment_credit_card_number, pedido.payment_cvc_number]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

////////////// PACK RESTAURANTE //////////////


module.exports.getPacksRestaurante = async function() {
    try {
        let sql = "SELECT *, restaurant.establishment_id, restaurant.establishment_name, restaurant.establishment_description, restaurant.establishment_utilizador_id, restaurant.restaurant_id, restaurant.restaurant_type_id, restaurant.restaurante_number_tables, utilizador.utilizador_id, utilizador.utilizador_name, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM pack_restaurante INNER JOIN restaurant ON restaurant.restaurant_id = pack_restaurante.pack_restaurante_id INNER JOIN utilizador ON utilizador.utilizador_id = restaurant.establishment_utilizador_id INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id WHERE pack_restaurante.pack_availability = '0'";
       let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.getMesaFromPackRestaurante = async function(restaurant_id) {
    try {
        let sql = "SELECT *, mesa.mesa_id, mesa.mesa_size, mesa.mesa_number, mesa.mesa_price, mesa.mesa_availability, mesa_type.mesa_type_id, mesa_type.mesa_type_name FROM item_mesa_restaurant INNER JOIN mesa ON mesa.mesa_id = item_mesa_restaurant.item_mesa_identifier_reservation INNER JOIN mesa_type ON mesa_type.mesa_type_id = mesa.mesa_type_id WHERE item_mesa_restaurant.item_pack_restaurante_id = " + restaurant_id;
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAcomodacaoFromPackRestaurante = async function(restaurant_id) {
    try {
        let sql = "SELECT *, acomodacao.acomodacao_id, acomodacao.acomodacao_number, acomodacao.acomodacao_price, acomodacao.acomodacao_availability, acomodacao.acomodacao_type_id, acomodacao_type.acomodacao_type_id , acomodacao_type.acomodacao_type_name FROM item_acomodacao_restaurant INNER JOIN acomodacao ON acomodacao.acomodacao_id = item_acomodacao_restaurant.item_acomodacao_identifier_reservation INNER JOIN acomodacao_type ON acomodacao_type.acomodacao_type_id = acomodacao.acomodacao_type_id WHERE item_acomodacao_restaurant.item_pack_restaurante_id = " + restaurant_id;
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getSpotFromRestaurant = async function(restaurant_id) {
    try {
        let sql = "SELECT *, spot.spot_id, spot.spot_price, spot.spot_availability, spot.spot_parking_lot_id, spot.spot_number FROM item_spot_restaurant INNER JOIN spot ON spot.spot_id = item_spot_restaurant.item_spot_identifier_reservation  WHERE item_spot_restaurant.item_pack_restaurante_id = " + restaurant_id;
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


//////////////////////////////////////////////////////////////////////////

module.exports.savePlate = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO plate " +
            "(plate_name, plate_price, plate_restaurant_id, plate_availability, plate_type_identifier, plate_type_description) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING plate_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.plate_name, pedido.plate_price, pedido.plate_restaurant_id, pedido.plate_availability, pedido.plate_type_identifier, pedido.plate_type_description]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.saveLugar = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO spot " +
            "(spot_price, spot_availability, spot_parking_lot_id, spot_number) " +
            "VALUES ($1, $2, $3, $4) " +
            "RETURNING spot_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.spot_price, pedido.spot_availability, pedido.spot_parking_lot_id, pedido.spot_number]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.savePosition = async function(pedido) {

    console.log("CHEGOU AQUI");
    console.log("FUNÇÃO CHAMADA");

    console.log("PEDIDO:" + pedido.local_latitude);
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)

     // var lat = 0;
      //pedido.local_longitude = lat;
     // var lng = 0;
     // pedido.local_longitude = lng;


   //   var stringforpoint = "'POINT(" + lat + " " + lng + ")'";



       let sql =
            "INSERT " +
            "INTO place_restaurante " +
            "(local_morada, ref_system_id, geometry_info_point, local_restaurante_id, local_latitude, local_longitude) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING local_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
       // let result = await pool.query(sql, [pedido.local_morada, 4326, stringforpoint, pedido.local_restaurant_id, pedido.local_latitude, pedido.local_longitude]);
        let result = await pool.query(sql, [pedido.local_morada, pedido.ref_system_id, pedido.geometry_info_point, pedido.local_restaurante_id, pedido.local_latitude, pedido.local_longitude]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.getGetIncompleteRestaurants = async function(est_id) {
    try {
        let sql = "SELECT * FROM restaurant where restaurant.establishment_utilizador_id = " + est_id + " and restaurant.establishment_state_place_id =  1 ";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGetIncompleteAcomodacoes = async function(est_id) {
    try {
        let sql = "SELECT * FROM equipment_service where equipment_service.establishment_utilizador_id = " + est_id + " and equipment_service.establishment_state_place_id =  1 ";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getGetIncompleteParking = async function(est_id) {
    try {
        let sql = "SELECT * FROM parking_lot where parking_lot.establishment_utilizador_id = " + est_id + " and parking_lot.establishment_state_place_id =  1 ";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.UpdateEstadoEmAnalise = async function(id_rest){

    try {
        let sql = "UPDATE restaurant " + "SET state_id = 2 " + "WHERE restaurant_id = " + id_rest;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.UpdateEstadoVerificado = async function(id_rest){

    try {
        let sql = "UPDATE restaurant " + "SET state_id = 3 " + "WHERE restaurant_id = " + id_rest;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.UpdateAdmin = async function(id_rest){

    try {
        let sql = "UPDATE utilizador " + "SET utilizador_type_id = 3 " + "WHERE utilizador_id = " + id_rest;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.getNumberReports = async function(restaurant_id) {
    try {
        let sql = "SELECT COUNT(*) FROM report_restaurante WHERE report_restaurante_id = " + restaurant_id;
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.UpdateOnPack = async function(id_pack){

    try {
        let sql = "UPDATE pack_restaurante " + "SET pack_availability = '0' " + "WHERE pack_id = " + id_pack;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.UpdateOffPack = async function(id_pack){

    console.log("ID DO PACK PARA ALTERAR: " + id_pack);
    try {
        let sql = "UPDATE pack_restaurante " + "SET pack_availability = '1' " + "WHERE pack_id = " + id_pack;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}


module.exports.UpdateMesaUnavailable = async function(id_plate){

    try {
        let sql = "UPDATE mesa " + "SET mesa_availability = '1' " + "WHERE mesa_id = " + id_plate;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.UpdateSpotUnavailable = async function(id_plate){

    try {
        let sql = "UPDATE spot " + "SET spot_availability = '1' " + "WHERE spot_id = " + id_plate;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

module.exports.UpdateAcomodacaoUnavailable = async function(id_plate){

    try {
        let sql = "UPDATE acomodacao " + "SET acomodacao_availability = '1' " + "WHERE acomodacao_id = " + id_plate;
        let result = await pool.query(sql);
        let pedidofound = result.rows;
        console.log("[ementasModel.getEmentasUser] pedido = " + JSON.stringify(pedidofound));
        return { status: 200, data: pedidofound };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }

}

///GET DE PACKS DISPONIVEIS DE ESTACIONAMENTO

module.exports.getAvailablePacksEstacionamento = async function(restaurant_id) {
    try {
        let sql = "SELECT *, parking_lot.establishment_id, parking_lot.establishment_name, parking_lot.establishment_description, parking_lot.establishment_utilizador_id, parking_lot.parking_lot_id, parking_lot.parking_lot_number_spots, utilizador.utilizador_id, utilizador.utilizador_name FROM pack_estacionamento INNER JOIN parking_lot ON parking_lot.parking_lot_id = pack_estacionamento.pack_estacionamento_id INNER JOIN utilizador ON utilizador.utilizador_id = parking_lot.establishment_utilizador_id WHERE pack_estacionamento.pack_estacionamento_id = " + restaurant_id + " AND pack_estacionamento.pack_availability = '0' ORDER BY pack_estacionamento.created_at DESC";
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAvailableTablesEst = async function(restaurant_id) {
    try {
        let sql = "SELECT *, restaurant.establishment_name, restaurant.establishment_id FROM mesa INNER JOIN restaurant ON restaurant.restaurant_id = mesa.mesa_restaurant_id WHERE restaurant.establishment_utilizador_id = " + restaurant_id + " AND mesa.mesa_availability = '0'";
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getAvailableAcomodacoesEst = async function(restaurant_id) {
    try {
        let sql = "SELECT *, equipment_service.establishment_name, equipment_service.establishment_id FROM acomodacao INNER JOIN equipment_service ON equipment_service.equipment_service_id = acomodacao.acomodacao_equipment_service_id WHERE equipment_service.establishment_utilizador_id = " + restaurant_id + " AND acomodacao.acomodacao_availability = '0'";
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getAvailableLugaresEst = async function(restaurant_id) {
    try {
        let sql = "SELECT *, parking_lot.establishment_name, parking_lot.establishment_id FROM spot INNER JOIN parking_lot ON parking_lot.parking_lot_id = spot.spot_parking_lot_id WHERE parking_lot.establishment_utilizador_id = " + restaurant_id + " AND spot.spot_availability = '0'";
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

///GET DE PACKS DISPONIVEIS DE UM RESTAURANTE///
module.exports.getAvailablePacksRestaurante = async function(restaurant_id) {
    try {
        let sql = "SELECT *, restaurant.establishment_id, restaurant.establishment_name, restaurant.establishment_description, restaurant.establishment_utilizador_id, restaurant.restaurant_id, restaurant.restaurant_type_id, restaurant.restaurante_number_tables, utilizador.utilizador_id, utilizador.utilizador_name, type_restaurant.type_restaurant_id, type_restaurant.type_restaurant_name FROM pack_restaurante INNER JOIN restaurant ON restaurant.restaurant_id = pack_restaurante.pack_restaurante_id INNER JOIN utilizador ON utilizador.utilizador_id = restaurant.establishment_utilizador_id INNER JOIN type_restaurant ON type_restaurant.type_restaurant_id = restaurant.restaurant_type_id WHERE pack_restaurante.pack_restaurante_id = " + restaurant_id + " AND pack_restaurante.pack_availability = '0' ORDER BY pack_restaurante.created_at DESC";
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



module.exports.getAvailableAcomodacoesRest = async function(restaurant_id) {
    try {
        let sql = "SELECT *, equipment_service.establishment_name, equipment_service.establishment_id FROM acomodacao INNER JOIN equipment_service ON equipment_service.equipment_service_id = acomodacao.acomodacao_equipment_service_id WHERE equipment_service.establishment_utilizador_id = " + restaurant_id + " AND acomodacao.acomodacao_availability = '0'";
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.getAvailableLugaresRest = async function(restaurant_id) {
    try {
        let sql = "SELECT *, parking_lot.establishment_name, parking_lot.establishment_id FROM spot INNER JOIN parking_lot ON parking_lot.parking_lot_id = spot.spot_parking_lot_id WHERE parking_lot.establishment_utilizador_id = " + restaurant_id + " AND spot.spot_availability = '0'";
        let result = await pool.query(sql);
       let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}



///////////////////////// VALIDAR ///////////////////////////

module.exports.saveCreateMesaItem = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO item_mesa_restaurant " +
            "(item_mesa_identifier_reservation, item_date_marcacao_reservation, item_date_marcada_reservation, item_pack_restaurante_id) " +
            "VALUES ($1, $2, $3, $4) " +
            "RETURNING item_mesa_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.item_mesa_identifier_reservation, pedido.item_date_marcacao_reservation, pedido.item_date_marcada_reservation, pedido.item_pack_restaurante_id]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

module.exports.saveCreateAcomodacaoItem = async function(pedido) {
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));
    /* checks all fields needed and ignores other fields
    if (typeof user != "object" || failUser(user)) {
        if (user.errMsg)
            return { status: 400, data: { msg: user.errMsg } };
        else
            return { status: 400, data: { msg: "Malformed data" } };
    }*/
    try {
      // INSERT ->  INSERT INTO restaurant (establishment_name, establishment_description, establishment_utilizador_id, restaurant_type_id, restaurante_number_tables, type_service_identifier, state_id) VALUES('Maré dos Golfinhos', 'Restaurante da maré dos golfinhos', 1, 7, 46,1,1)



        let sql =
            "INSERT " +
            "INTO item_acomodacao_restaurant " +
            "(item_acomodacao_identifier_reservation, item_date_marcacao_reservation, item_date_marcada_reservation, item_pack_restaurante_id) " +
            "VALUES ($1, $2, $3, $4) " +
            "RETURNING item_acomodacao_id";

           // console.log(pedido.like_utilizador + "|" + pedido.like_restaurante);
        let result = await pool.query(sql, [pedido.item_acomodacao_identifier_reservation, pedido.item_date_marcacao_reservation, pedido.item_date_marcada_reservation, pedido.item_pack_restaurante_id]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}

////////////////////////////////////////////////////////////////////////////////////////

module.exports.getAcomodacoesAvailableUtilizador = async function(est_id) {
    try {
        let sql = "SELECT *, equipment_service.establishment_id, equipment_service.establishment_name, equipment_service.establishment_utilizador_id FROM acomodacao INNER JOIN equipment_service ON equipment_service.equipment_service_id = acomodacao.acomodacao_equipment_service_id WHERE equipment_service.establishment_utilizador_id = " + est_id + " AND acomodacao.acomodacao_availability = '0'";
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("[usersModel.getUsers] users = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.savePositionRestaurante = async function(pedido) {

    console.log("CHEGOU AQUI");
    console.log("FUNÇÃO CHAMADA");

    console.log("PEDIDO:" + pedido.local_latitude);
    console.log("[pedidosModel.savePedido] pedido = " + JSON.stringify(pedido));


    try {

       let sql =
            "INSERT " +
            "INTO place_restaurante " +
            "(local_morada, ref_system_id, geometry_info_point, local_restaurante_id, local_latitude, local_longitude) " +
            "VALUES ($1, $2, $3, $4, $5, $6) " +
            "RETURNING local_id";

        let result = await pool.query(sql, [pedido.local_morada, pedido.ref_system_id, pedido.geometry_info_point, pedido.local_restaurante_id, pedido.local_latitude, pedido.local_longitude]);
        let pedidooo = result.rows[0].pedido_id;
        return { status: 200, data: pedidooo };
    } catch (err) {
        console.log(err);
        if (err.errno == 23503) // FK error
            return { status: 400, data: { msg: "Type not found" } };
        else
            return { status: 500, data: err };
    }
}