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

router.post('/dislike/:potentialId', isLoggedIn, function(req, res){
  db.dislike.findOrCreate({
    where: {
      userId: req.user.id,
      userIdDisliked: req.params.potentialId
    }
  }).spread(function(dislike, wasCreated){
    if(wasCreated){
      //good
      req.flash("success", "Dislike added for " + dislike.userId + " : " + dislike.userIdDisliked);
      res.send({message: 'successful dislike'});
    } else {
      req.flash("error", "you've already disliked this guy");
      res.send({message: 'unsuccessful dislike'});
    }
  }).catch(function(err){
    req.flash("error", err.message);
    res.redirect("/potentials");
  });
});

router.post('/like/:potentialId', isLoggedIn, function(req, res){
  db.like.findOrCreate({
    where: {
      userId: req.user.id,
      userIdLiked: req.params.potentialId
    },
    defaults: {
      isSuperLike: false
    }
  }).spread(function(like, wasCreated){
    if(wasCreated){
      //good
      req.flash("success", "Like added for " + like.userId + " : " + like.userIdLiked);
      res.send({message: 'successful like'});
    } else {
      req.flash("error", "you've already liked this guy");
      res.send({message: 'unsuccessful like'});
    }
  }).catch(function(err){
    req.flash("error", err.message);
    res.redirect("/potentials");
  });
});

router.post('/superlike/:potentialId', isLoggedIn, function(req, res){
  db.like.findOrCreate({
    where: {
      userId: req.user.id,
      userIdLiked: req.params.potentialId
    },
    defaults: {
      isSuperLike: true
    }
  }).spread(function(like, wasCreated){
    if(wasCreated){
      //good
      req.flash("success", "SuperLike added for " + like.userId + " : " + like.userIdLiked);
      res.send({message: 'successful superlike'});
    } else {
      req.flash("error", "you've already superliked this guy");
      res.send({message: 'unsuccessful superlike'});
    }
  }).catch(function(err){
    req.flash("error", err.message);
    res.redirect("/potentials");
  });
});

module.exports = router;
