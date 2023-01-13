var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index-2', { title: 'Expressssss' });
});

module.exports = router;
