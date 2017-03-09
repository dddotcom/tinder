var express = require('express');
var db = require('../models');
var async = require('async');
var isLoggedIn = require("../middleware/isLoggedIn");
var passport = require('../config/passportConfig');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res){
  //show users that have a match
  var matchUsers = [];
  db.like.findAll({
    where: {userId: req.user.id},
  })
  .then(function(likes){
    console.log("likes: " + likes);
    if(likes){
      async.forEachSeries(likes, function(like, callback){
        db.like.find({
          where: {userId: like.userIdLiked, userIdLiked: req.user.id}
        })
        .then(function(match){
          if(match){
            db.user.find({
              where: {id: match.userId},
              include: [{model: db.profile_pic, required: false}, {model: db.chat, where: {userIdTo: req.user.id}, required: false}]
            })
            .then(function(user){
              if(user){
                matchUsers.push(user);
              }
              callback(null);
            });
          } else {
            callback(null);
          }//end of if(match)
        }); //end of then
      }, function(){
        console.log("matchUsers: " + matchUsers);
        db.user.findOne({
          where: {id: req.user.id},
          include: [db.chat]
        }).then(function(currentUser){
          res.render('chatroom/index', {matches: matchUsers, currentUser: currentUser});
        }).catch(function(error){
          res.status(400).send("error");
        });
      }); //end of for each series
    }
  })
  .catch(function(error){
    res.status(400).send("error");
  });
});

router.get('/:potentialId', isLoggedIn, function(req, res){
  //get chat logs for both
  //send them in order of createdAt
  console.log(req.params.potentialId);

  db.user.findOne({
    where: {id: req.params.potentialId},
    include: [{model: db.profile_pic, required: false}, {model: db.chat, where: {userIdTo: req.user.id}, required: false}]
  }).then(function(user){
      db.user.findOne({
        where: {id: req.user.id},
        include: [{model: db.chat, where: {userIdTo: req.params.potentialId}, required: false}]
      }).then(function(currentUser){
          res.render('chatroom/show', {match: user, currentUser: currentUser});
      }).catch(function(error){
        res.status(400).send("error");
      });
  }).catch(function(error){
    res.status(400).send("whats the prob");
  });

});

router.post('/:potentialId', isLoggedIn, function(req, res){
  db.chat.create({
    userId: req.user.id,
    userIdTo: req.params.potentialId,
    content: req.body.content
  }).then(function(newChat){
    req.user.addChat(newChat);
    res.redirect('/chatroom/'+ newChat.userIdTo);
  }).catch(function(error){
    res.status(400).send("error");
  });
});

module.exports = router;
