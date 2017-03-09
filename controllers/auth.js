var express = require('express');
var async = require('async');
var db = require('../models');
var passport = require('../config/passportConfig');
var giphy = require('giphy-api')();
var router = express.Router();

router.get('/login', function(req, res){
  res.render('auth/login');
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/potentials",
  successFlash: "You successfully logged in",
  failureRedirect: "/auth/login",
  failureFlash: "Invalid credentials"
}));

router.get('/signup', function(req, res){
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
  console.log(req.body);
  var interestedIn = 1;
  if(req.body.animalId == 1){
    interestedIn = 2;
  }

  var interests = [];
  if(req.body.interests){
    interests = req.body.interests.split(",");
  }

  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
        password: req.body.password,
        name: req.body.name,
        age: req.body.age,
        school: req.body.school,
        work: req.body.work,
        animalId: req.body.animalId,
        interestedIn: interestedIn,
    }
  }).spread(function(user, wasCreated){
    if(wasCreated){
      //good

      //add interests
      if(interests.length > 0){
        async.forEachSeries(interests, function(interest, callback){
          db.interest.findOrCreate({
            where: {name: interest.toLowerCase().trim()}
          }).spread(function(newInterest, wasCreated){
            if(newInterest){
              user.addInterest(newInterest);
            }
            callback(null);
          });
        }, function(){
          //TODO: add profile picture
          var q = 'dog';
          if(req.body.animalId == 1){
            q = 'cat';
          }

          giphy.random({
              tag: q,
              rating: 'g',
              fmt: 'json'
          }, function (err, response) {
            var url = response.data.fixed_width_downsampled_url;
            db.profile_pic.create({
              url: url,
              userId: user.id
            }).then(function(newPic){
              user.addProfile_pic(newPic);
              passport.authenticate("local", {
                successRedirect: "/potentials",
                successFlash: "Account created and logged in"
              })(req,res);
            });
          }); //end of giphy

        });//end of forEachSeries
      }
    } else {
      //bad
      req.flash("error", "Email already exists");
      res.redirect("/auth/login");
    }
  }).catch(function(err){
    req.flash("error", err.message);
    res.redirect("/auth/signup");
  });
});

  router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are logged out!");
    res.redirect("/");
  });

  //FACEBOOK auth
  router.get("/facebook", passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  }));

  router.get("/callback/facebook", passport.authenticate("facebook", {
    successRedirect: "/potentials",
    successFlash: "You logged in with FBOOK",
    failureRedirect: "/auth/login",
    failureFlash: "fbook won't log you in"
  }));

module.exports = router;
