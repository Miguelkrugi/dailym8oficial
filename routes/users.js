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
  console.error("------------------------------------------------------");
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


router.get('/getlocation/restaurante/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO

  let restaurant_id = req.params.idrestaurant; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getPlaceFromRestaurant(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

/////////////// OBTER INFOS DO UTILIZADOR ////////////////

router.get('/getinformacao/:idutilizador', async function(req, res, next) { //TIPO | PATH PARA O METODO

  let utilizador_id = req.params.idutilizador; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getUserInfo(utilizador_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});


////////////// OBTER ULTIMAS RESERVAS ///////////////

router.get('/getreservas/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO

  let restaurant_id = req.params.idrestaurant; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getRestaurantReservas(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

////////////// OBTER O MENU ///////////////

router.get('/getmenu/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO

  let restaurant_id = req.params.idrestaurant; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getRestaurantMenu(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getmenu/unavailable/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO | AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getRestaurantMenuUnavailable(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

/////////////// OBTER AS MESAS /////////////////

router.get('/gettables/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO

  let restaurant_id = req.params.idrestaurant; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getMesasAvailable(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/gettables/unavailable/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getMesasUnavailable(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

///////////////////////////////// VERIFICAR LIKE //////////////////////////////////


router.get('/getlike/checklike/restaurante/:idutilizador/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let utilizador_id = req.params.idutilizador;
  let restaurant_id = req.params.idrestaurant; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getCheckLikeRestaurante(utilizador_id ,restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getlike/checklike/acomodacao/:idutilizador/:idacomodacao', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let utilizador_id = req.params.idutilizador;
  let acomodacao_id = req.params.idacomodacao; //ARMAZENAS O INPUT DO URL NUMA VARIAVEL

  let result = await usersModel.getCheckLikeAcomodacao(utilizador_id ,acomodacao_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.post('/insertnewlike', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.saveLikeRestaurante(newPedido);
  res.sendStatus(result.status).send(result.data);
});

router.delete('/deletelike/restaurante/:idutilizador/:idrestaurante', async function(req, res, next){

  let utilizador_id = req.params.idutilizador;
  let restaurant_id = req.params.idrestaurante;
 // console.log("[artigosRoutes] Deleting pedido with id: " + pedido_id);
  let result = await usersModel.DeleteLike(utilizador_id, restaurant_id);
  res.status(result.status).send(result.data);

});

router.post('/insertnewrestaurant', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.saveRestaurant(newPedido);
  res.sendStatus(result.status).send(result.data);
});

router.post('/insertnewposicao', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.savePosition(newPedido);
  res.sendStatus(result.status).send(result.data);
});

//AINDA N FOI APLICADO //
router.post('/insertnewmesa', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.saveMesa(newPedido);
  res.sendStatus(result.status).send(result.data);
});

router.post('/insertnewplate', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.savePratoo(newPedido);
  res.sendStatus(result.status).send(result.data);
});


router.put('/become/plateavailability/off/:idplate', async function(req, res, next){

  let id_user = req.params.idplate;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateOffPlate(id_user);
  res.status(result.status).send(result.data);

});

//Update para disponível
router.put('/become/plateavailability/on/:idplate', async function(req, res, next){

  let id_user = req.params.idplate;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateOnPlate(id_user);
  res.status(result.status).send(result.data);

});

//Update para indisponível
router.put('/become/plateavailability/off/:idplate', async function(req, res, next){

  let id_user = req.params.idplate;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateOffPlate(id_user);
  res.status(result.status).send(result.data);

});



router.delete('/deletepratos/:idprato', async function(req, res, next){

  let plate_id = req.params.idprato;

 // console.log("[artigosRoutes] Deleting pedido with id: " + pedido_id);
  let result = await usersModel.DeletePlate(plate_id);
  res.status(result.status).send(result.data);

});

router.delete('/deletemesa/:idmesa', async function(req, res, next){

  let mesa_id = req.params.idmesa;

 // console.log("[artigosRoutes] Deleting pedido with id: " + pedido_id);
  let result = await usersModel.DeleteMesa(mesa_id);
  res.status(result.status).send(result.data);

});

/*router.post('/insertnewreservamesa', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.saveReservaMesa(newPedido);
  res.sendStatus(result.status).send(result.data);
});*/

router.post('/insertnewreservaacomodacao', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.saveReservaAcomodacao(newPedido);
  res.sendStatus(result.status).send(result.data);
});

router.post('/insertplate', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.savePlate(newPedido);
  res.sendStatus(result.status).send(result.data);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Vou começar aqui Ass:Bruno Mata

router.get('/getmenu/menu/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO
  console.error("---------------------------------------");
  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getCheckLikeMenu(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

// Pedir ao Mike para ver comigo esta
router.get('/getmenu/menu/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.get50Reservas(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getmenu/menudisp/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;
console.error("-----------------------------------------------");
  let result = await usersModel.getMenuDisponivel(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getmenu/pratoindi/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getIndispinivel(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getmesas/mesas/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getMesas(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getmesas/mesadisp/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getMesaDisp(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});


router.get('/getmesas/mesadindisp/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getMesaIndisp(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getlike/checklike/likeRest/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getLikeRest(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/getlike/checklike/likeAco/:idacomodacao', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let acomodacao_id = req.params.idacomodacao;

  let result = await usersModel.getLikeAco(acomodacao_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.get('/packss/restaurante/', async function(req, res, next) {

  let result = await usersModel.getPacksRestaurante();
  res.status(result.status).send(result.data);

});

router.get('/packs/restaurante/mesa/:idpack', async function(req, res, next) {

  let user_id = req.params.idpack;
  let result = await usersModel.getMesaFromPackRestaurante(user_id);
  res.status(result.status).send(result.data);

});



router.get('/packs/restaurante/acomodacao/:idpack', async function(req, res, next) {

  let user_id = req.params.idpack;
  let result = await usersModel.getAcomodacaoFromPackRestaurante(user_id);
  res.status(result.status).send(result.data);

});

router.get('/getincomplete/restaurante/:iduser', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let user_id = req.params.iduser;

  let result = await usersModel.getGetIncompleteRestaurants(user_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.put('/alterarestado/emanalise/restaurante/:idrestaurant', async function(req, res, next){

  let id_user = req.params.idrestaurant;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateEstadoEmAnalise(id_user);
  res.status(result.status).send(result.data);

});

router.put('/alterarestado/verificado/restaurante/:idrestaurant', async function(req, res, next){

  let id_user = req.params.idrestaurant;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateEstadoVerificado(id_user);
  res.status(result.status).send(result.data);

});

router.put('/updateadmin/:iduser', async function(req, res, next){

  let id_user = req.params.iduser;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateAdmin(id_user);
  res.status(result.status).send(result.data);

});


router.get('/numberreports/:idrestaurant', async function(req, res, next) { //TIPO | PATH PARA O METODO // AINDA N FOI APLICADO

  let restaurant_id = req.params.idrestaurant;

  let result = await usersModel.getNumberReports(restaurant_id); //FUNCAO É CHAMADA DO FICHEIRO usersModel
  res.status(result.status).send(result.data);

});

router.put('/become/packavailability/on/:idplate', async function(req, res, next){

  let id_user = req.params.idplate;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateOnPack(id_user);
  res.status(result.status).send(result.data);

});

router.put('/become/packavailability/off/:idplate', async function(req, res, next){

  let id_user = req.params.idplate;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateOffPack(id_user);
  res.status(result.status).send(result.data);

});

router.get('/getmesas/restaurante/:idrestaurant', async function(req, res, next) {

  let user_id = req.params.idrestaurant;
  let result = await usersModel.getMesasAvailable(user_id);
  res.status(result.status).send(result.data);

});


router.post('/insertresmesa', async function(req, res, next) {
  let newPedido = req.body;
  console.log("[pedidosRoutes] Saving pedido " + JSON.stringify(newPedido));
  let result = await usersModel.saveReservaMesa(newPedido);
  res.sendStatus(result.status).send(result.data);
});

router.put('/setmesaunavailable/:iduser', async function(req, res, next){

  let id_user = req.params.iduser;
  console.log("[artigosRoutes] Update pedido with id: " + id_user);
  let result = await usersModel.UpdateMesaUnavailable(id_user);
  res.status(result.status).send(result.data);

});

////GET DE PACKS DISPONIVEIS////

router.get('/getavailable/restaurante/packs/:idrestaurante', async function(req, res, next) {

  let estabelecimento_id = req.params.idrestaurante;

  let result = await usersModel.getAvailablePacksRestaurante(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/getavailable/acomodacoes/items/:idutilizador', async function(req, res, next) {

  let estabelecimento_id = req.params.idutilizador;

  let result = await usersModel.getAvailableAcomodacoesRest(estabelecimento_id);
  res.status(result.status).send(result.data);

});

router.get('/getavailable/lugares/items/:idutilizador', async function(req, res, next) {

  let estabelecimento_id = req.params.idutilizador;

  let result = await usersModel.getAvailableLugaresRest(estabelecimento_id);
  res.status(result.status).send(result.data);

});

module.exports = router;