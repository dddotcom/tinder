var express = require('express');
// var db = require('../models');
// var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/:id', function(req, res){
  res.render('profile/index');
});

router.get('/:id/edit', function(req, res){
  res.render('profile/edit');
})

router.get('/:id/settings', function(req, res){
  res.render('profile/settings');
})

module.exports = router;
