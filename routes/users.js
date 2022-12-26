var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ok', function(req, res, next) {
  res.send('ok');
});

///////ALL USER

router.get('/allusers', async function(req, res, next) {

  let result = await usersModel.getUsers();
  res.status(result.status).send(result.data);

});

router.post('/insertnewuser', async function(req, res, next) {
  let newUser = req.body;
  //console.log("[usersRoutes] Saving user " + JSON.stringify(newUser));
  let result = await usersModel.saveUser(newUser);
  res.status(result.status).send(result.result);
});

//A FAZER
router.post('/loginuser', async function(req, res, next){
  let username = req.body;
  console.log("username = " + JSON.stringify(username));

  let result = await usersModel.authUser(username);
  res.status(result.status).send(result.result);
});

///////ESTACIONAMENTOS

router.get('/showrandomestacionamentos', async function(req, res, next) {

  let result = await usersModel.getRandomEstacionamento();
  res.status(result.status).send(result.data);

});

router.get('/showrandomestacionamentos/nrlugares/crescente', async function(req, res, next) {

  let result = await usersModel.getFilterLugaresCrescente();
  res.status(result.status).send(result.data);

});

router.get('/showrandomestacionamentos/nrlugares/decrescente', async function(req, res, next) {

  let result = await usersModel.getFilterLugaresDecrescente();
  res.status(result.status).send(result.data);

});

///////SERVICOS DE ACOMODACAO

router.get('/showrandomservicosacomodacao', async function(req, res, next) {

  let result = await usersModel.getRandomServicesAcomodacao();
  res.status(result.status).send(result.data);

});

router.get('/showrandomservicosacomodacao/nracomodacoes/crescente', async function(req, res, next) {

  let result = await usersModel.getFilterServicesAcomodacaoCrescente();
  res.status(result.status).send(result.data);

});

router.get('/showrandomservicosacomodacao/nracomodacoes/decrescente', async function(req, res, next) {

  let result = await usersModel.getFilterServicesAcomodacaoDecrescente();
  res.status(result.status).send(result.data);

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//RESTAURANTES ALEATORIOS 

router.get('/showrandomrestaurants', async function(req, res, next) {

  let result = await usersModel.getRandomRestaurants();
  res.status(result.status).send(result.data);

});

router.get('/showrandomrestaurants/:filter', async function(req, res, next) {

  let filter = req.params.filter;
  let result = await usersModel.getFilterRestaurants(filter);
  res.status(result.status).send(result.data);

});

router.get('/showrandomrestaurants/nrmesas/crescente', async function(req, res, next) {

  let result = await usersModel.getFilterRestaurantsCrescente();
  res.status(result.status).send(result.data);

});

router.get('/showrandomrestaurants/nrmesas/decrescente', async function(req, res, next) {

  let result = await usersModel.getFilterRestaurantsDecrescente();
  res.status(result.status).send(result.data);

});

//RESTAURANTES ALEATORIOS/SUGERIDOS

router.get('/countlikerestaurant/:idrestaurante', async function(req, res, next) {

  let idrestaurante = req.params.idrestaurante;
  let result = await usersModel.getCountLikeRestaurant(idrestaurante);
  res.status(result.status).send(result.data);

});

router.get('/countlikeacomodacao/:idacomodacao', async function(req, res, next) {

  let idacomodacao = req.params.idacomodacao;
  let result = await usersModel.getCountLikeAcomodacao(idacomodacao);
  res.status(result.status).send(result.data);

});

router.get('/seeplates/filter/:idestabelecimento/:idplatetype', async function(req, res, next) {

  let estabelecimento_id = req.params.idestabelecimento;
  let plate_type_id = req.params.idplatetype;

  let result = await usersModel.getRestaurantPlatesFilter(estabelecimento_id, plate_type_id);
  res.status(result.status).send(result.data);

});

router.get('/seeplates/filter/:idestabelecimento', async function(req, res, next) {

  let estabelecimento_id = req.params.idestabelecimento;

  let result = await usersModel.getPlates(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/seetables/filter/:idestabelecimento', async function(req, res, next) {

  let estabelecimento_id = req.params.idestabelecimento;

  let result = await usersModel.getRestaurantTables(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/seetables/filter/:idestabelecimento/:idtype', async function(req, res, next) {

  let estabelecimento_id = req.params.idestabelecimento;
  let table_type_id = req.params.idtype;

  let result = await usersModel.getRestaurantTablesInterior(estabelecimento_id, table_type_id);
  res.status(result.status).send(result.data);

});

router.get('/place/position/:idestabelecimento', async function(req, res, next) {

  let estabelecimento_id = req.params.idestabelecimento;

  let result = await usersModel.getRestaurantPlace(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/place/position/acomodacao/:idacomodacaoservice', async function(req, res, next) {

  let acomodacao_service_id = req.params.idacomodacaoservice;

  let result = await usersModel.getAcomodacaoPlace(acomodacao_service_id);
  res.status(result.status).send(result.data);

});


router.get('/showrandomsuggestedrestaurants', async function(req, res, next) {

  let result = await usersModel.getRandomSuggestedRestaurants();
  res.status(result.status).send(result.data);

});

router.get('/showrandomsuggestedacomodacoes', async function(req, res, next) {

  let result = await usersModel.getRandomSuggestedAcomodacoes();
  res.status(result.status).send(result.data);

});

router.get('/showrandomsuggestedestacionamentos', async function(req, res, next) {

  let result = await usersModel.getRandomSuggestedEstacionamentos();
  res.status(result.status).send(result.data);

});

router.get('/showrandomsuggestcomments', async function(req, res, next) {

  let result = await usersModel.getThreeComments();
  res.status(result.status).send(result.data);

});

///////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/getacomodacoes/:idestabelecimento', async function(req, res, next) {

  let estabelecimento_id = req.params.idestabelecimento;

  let result = await usersModel.getAcomodacoesService(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/getlatestreports', async function(req, res, next) {

  let result = await usersModel.getLatestReports();
  res.status(result.status).send(result.data);

});

router.get('/getlatestreports/acomodacao', async function(req, res, next) {

  let result = await usersModel.getLatestReportsAcomodacao();
  res.status(result.status).send(result.data);

});

///////AINDA N FOI APLICADO ///////

router.get('/getinanalysis/places/restaurant', async function(req, res, next) {

  let result = await usersModel.getInAnalysisPlacesRestaurant();
  res.status(result.status).send(result.data);

});

router.get('/getinanalysis/places/acomodacao', async function(req, res, next) {

  let result = await usersModel.getInAnalysisPlacesAcomodacao();
  res.status(result.status).send(result.data);

});

router.get('/getinanalysis/places/estacionamento', async function(req, res, next) {

  let result = await usersModel.getInAnalysisPlacesEstacionamento();
  res.status(result.status).send(result.data);

});

//////// PROMOÇÃO DE UTILIZADORES (SELECT) /////////´

router.get('/getusers/promotion/', async function(req, res, next) {

  let result = await usersModel.getUsersForPromotion();
  res.status(result.status).send(result.data);

});

//////////// RESTAURANTES FAVORITOS /////////////

router.get('/getfavoritos/restaurante/:idrestaurante', async function(req, res, next) {

  let estabelecimento_id = req.params.idrestaurante;

  let result = await usersModel.getFavoritosRestaurante(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/getfavoritoss/acomodacao/:idacomodacao', async function(req, res, next) {

  let estabelecimento_id = req.params.idacomodacao;

  let result = await usersModel.getFavoritosAcomodacao(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/getfavoritos/estacionamento/:idestacionamento', async function(req, res, next) {

  let estabelecimento_id = req.params.idrestaurante;

  let result = await usersModel.getFavoritosEstacionamento(estabelecimento_id);
  res.status(result.status).send(result.data);

});




//////////////////////////////////////////////////////// UPDATE UTILIZADOR GESTOR //////////////////////////////////////////////////


router.put('/become/gestor/:idutilizador', async function(req, res, next){

  let id_user = req.params.idutilizador;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateGestor(id_user);
  res.status(result.status).send(result.data);

});


////////////////////////////////////////////////

router.get('/get/myestablishments/restaurant/:iduser', async function(req, res, next) {

  let user_id = req.params.iduser;

  let result = await usersModel.getMyRestaurants(user_id);
  res.status(result.status).send(result.data);

});

router.get('/get/myestablishments/acomodacao/:iduser', async function(req, res, next) {

  let user_id = req.params.iduser;

  let result = await usersModel.getMyAcomodacao(user_id);
  res.status(result.status).send(result.data);

});

////////////////////////////////// OBTER RESERVAS DE MESAS /////////////////////////////////////


router.get('/get/myreservas/restaurant/:iduser', async function(req, res, next) {

  let user_id = req.params.iduser;

  let result = await usersModel.getMyReservasRestaurant(user_id);
  res.status(result.status).send(result.data);

});

////////////////////////////////// OBTER RESERVAS DE ACOMODAÇÕES /////////////////////////////////////

router.get('/get/myreservas/acomodacao/:iduser', async function(req, res, next) {

  let user_id = req.params.iduser;

  let result = await usersModel.getMyReservasAcomodacao(user_id);
  res.status(result.status).send(result.data);

});


router.get('/getlocation/restaurante/:idrestaurant', async function(req, res, next) {

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getPlaceFromRestaurant(restaurant_id);
  res.status(result.status).send(result.data);

});

module.exports = router;
