var express = require('express');
// var db = require('../models');
// var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/', function(req, res){
  res.render('potentials/index');
});

router.get('/match/:id/:potentialId', function(req, res){
  res.render('potentials/match');
});

router.get('/:id', function(req, res){
  res.render('potentials/show');
});

module.exports = router;
