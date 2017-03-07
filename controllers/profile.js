var express = require('express');
var db = require('../models');
var isLoggedIn = require("../middleware/isLoggedIn");
var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/:id', isLoggedIn, function(req, res){
  db.user.find({
    where: {id: req.params.id},
    include: [db.interest, db.profile_pic]
  })
  .then(function(user){
    if(!user) throw Error();
    res.render('profile/index', {user: user});
  })
  .catch(function(error){
    res.status(400).send("error");
  });
});

router.get('/:id/edit', isLoggedIn, function(req, res){
  db.user.find({
    where: {id: req.params.id},
    include: [db.interest, db.profile_pic]
  })
  .then(function(user){
    if(!user) throw Error();
    res.render('profile/edit', {user: user});
  })
  .catch(function(error){
    res.status(400).send("error");
  });
});

router.get('/:id/settings', isLoggedIn, function(req, res){
  res.render('profile/settings');
})

module.exports = router;
