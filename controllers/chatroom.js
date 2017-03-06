var express = require('express');
// var db = require('../models');
// var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/:id', function(req, res){
  // res.send('GET chatroom/index');
  res.render('chatroom/index');
});

router.get('/:id/:potentialId', function(req, res){
  res.render('chatroom/show');
});

router.post('/:id/:potentialId', function(req, res){
  res.redirect('chatroom/show');
});

module.exports = router;
