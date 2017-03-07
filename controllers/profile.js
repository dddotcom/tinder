var express = require('express');
var db = require('../models');
var isLoggedIn = require("../middleware/isLoggedIn");
var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res){
  db.user.find({
    where: {id: req.user.id},
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

router.get('/edit', isLoggedIn, function(req, res){
  db.user.find({
    where: {id: req.user.id},
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

router.get('/settings', isLoggedIn, function(req, res){
  res.render('profile/settings');
});

router.put('/settings', isLoggedIn, function(req, res){
  console.log("you are updating something!");
  db.user.update({
    interestedIn: req.body.interestedIn
  }, {
    where: {id: req.user.id}
  }).then(function(userUpdate){
    res.send({message: 'successful update of interestedIn'});
  });
});

router.put('/', isLoggedIn, function(req, res){
  console.log("you are updating something!");
  db.user.update({
    about: req.body.about,
    work: req.body.work,
    school: req.body.school
  }, {
    where: {id: req.user.id}
  }).then(function(userUpdated){
    res.send({message: 'successful update of user profile'});
  });
});

module.exports = router;
