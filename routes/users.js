var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

module.exports = router;
