var express = require('express');
var isLoggedIn = require("../middleware/isLoggedIn");
var db = require('../models');
var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res){
  //TODO: and not in like or dislike table
  var interestedIn = req.user.interestedIn;
  db.user.findAll({
    where: {animalId: interestedIn},
    include: [db.profile_pic]
  })
  .then(function(potentialUsers){
    //TODO: show only users that have not been put into like or dislike table
    res.render('potentials/index', {potentialUsers: potentialUsers});
  })
  .catch(function(error){
    res.status(400).send("error");
  });
});

router.get('/match/:id/:potentialId', isLoggedIn, function(req, res){
  res.render('potentials/match');
});

router.get('/:id', isLoggedIn, function(req, res){
  db.user.find({
    where: {id: req.params.id},
    include: [db.interest, db.profile_pic]
  })
  .then(function(user){
      res.render('potentials/show', {potentialUser: user});
  })
  .catch(function(error){
    res.status(400).send("error");
  });
});

module.exports = router;
