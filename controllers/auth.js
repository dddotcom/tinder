var express = require('express');
// var db = require('../models');
// var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/login', function(req, res){
  res.render('auth/login');
});

router.get('/signup', function(req, res){
  res.render('auth/signup');
});

router.post('/login', function(req, res){
  // res.send('POST to auth/login');
  //if successful login
  res.redirect('/potentials');
});

router.post('/signup', function(req, res){
  // res.send('POST to auth/signup');
  //if successful signup
  res.redirect('/potentials');
});

module.exports = router;
