var express = require('express');
var db = require('../models');
var async = require('async');
var isLoggedIn = require("../middleware/isLoggedIn");
var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/:id', isLoggedIn, function(req, res){
  //show users that have a match
  var matchUsers = [];
  db.like.findAll({
    where: {userId: req.params.id},
  })
  .then(function(likes){
    async.forEachSeries(likes, function(like, callback){
      db.like.find({
        where: {userId: like.userIdLiked, userIdLiked: req.params.id}
      })
      .then(function(match){
        if(match){
          db.user.find({
            where: {id: match.userId},
            include: [db.profile_pic, db.chat]
          })
          .then(function(user){
            if(user){
              matchUsers.push(user);
            }
            callback(null);
          });
        } //end of if(match)
      }); //end of then
    }, function(){
      res.render('chatroom/index', {matches: matchUsers});
    }); //end of for each series
  })
  .catch(function(error){
    res.status(400).send("error");
  });
});

router.get('/:id/:potentialId', isLoggedIn, function(req, res){
  //get chat logs for both

  //send them in order of createdAt
  res.render('chatroom/show');
});

router.post('/:id/:potentialId', isLoggedIn, function(req, res){
  res.redirect('chatroom/show');
});

module.exports = router;
