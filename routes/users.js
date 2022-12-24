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

module.exports = router;
