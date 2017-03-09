var express = require('express');
var db = require('../models');
var isLoggedIn = require("../middleware/isLoggedIn");
var passport = require('../config/passportConfig');
var giphy = require('giphy-api')();
var async = require('async');
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

router.get('/getNewPic/:picId', isLoggedIn, function(req, res){
  if(req.user.animalId === 1){
    q = 'cat';
  } else {
    q = 'dog';
  }

  giphy.random({
      tag: q,
      rating: 'g',
      fmt: 'json'
  }, function (err, response) {
    var url = response.data.fixed_width_downsampled_url;
    db.profile_pic.findOne(
      {where: {id: req.params.picId}
    }).then(function(pic){
      pic.url = url;
      pic.save().then(function(){
        res.send({
          picId: req.params.picId,
          picUrl: url
        })
      }).catch(function(error){
        res.status(400).send("error");
      });
    }).catch(function(error){
      res.status(400).send("error");
    });
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

router.post('/addInterest', isLoggedIn, function(req, res){
  var interests = [];
  if(req.body.interests){
    interests = req.body.interests.split(",");
  }

  if(interests.length > 0){
    db.user.findOne({
      where: {id: req.user.id}
    }).then(function(user){
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
          res.redirect('/profile');
        }); //end of async
    })
    .catch(function(err){
      res.status(400).send("error");
    })
  } else {
    res.redirect('/profile');
  }//end of if
});

router.delete('/addInterest/:interestId', function(req, res){
  db.user.findOne({
    where: {id: req.user.id},
    include: [db.interest]
  }).then(function(user){
    db.interest.findOne({
      where: {id: req.params.interestId}
    }).then(function(interest){
      user.removeInterest(interest);
      res.send({message: 'successful update of user profile'});
    }).catch(function(err){
      res.status(400).send("error");
    })
  }).catch(function(err){
    res.status(400).send("error");
  })
});

module.exports = router;
