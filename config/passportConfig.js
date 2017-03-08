var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var db = require("../models");
require("dotenv").config();

passport.serializeUser(function(user, cb){
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
  db.user.findById(id).then(function(user){
    cb(null, user);
  })
  .catch(cb);
});

passport.use(new localStrategy({
  usernameField:'email',
  passwordField: 'password',
}, function(email, password, cb){
  db.user.findOne({
    where: {email: email}
  }).then(function(user){
    if(!user || !user.isValidPassword(password)){
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));


passport.use(new facebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.BASE_URL + "auth/callback/facebook",
  // profileFields: ["id", "email", "displayName","gender", "age_range"],
  profileFields: ["id", "email", "displayName",
  "about", "gender",  "birthday",
  "interested_in", "likes", "age_range", "cover", "name"],
  enableProof: true
}, function(accessToken, refreshToken, profile, cb){
  //see if u can get the email
  // console.log("profile ", profile);
  var animalId = 1;
  var interestedIn = 2;
  if(profile.gender === "male"){
    animalId = 2;
    interestedIn = 1;
  }
  var age = profile._json.age_range.min;
  if(animalId === 1){
    age = Math.floor(age/9);
  } else {
    age = Math.floor(age/7);
  }
  var email = profile.emails ? profile.emails[0].value : null;

  //see if user exists in our database
  db.user.findOne({
    where: {email: email}
  }).then(function(existingUser){
    //this user has logged in before
    if(existingUser && email){
      //if non-null user was found and facebook profile loaded OK
      existingUser.updateAttributes({
        facebookId: profile.id,
        facebookToken: accessToken,
        name: profile.name.givenName,
      }).then(function(updatedUser){
        cb(null, updatedUser);
      }).catch(cb);
    }
    else {
      //they're new + we need to create an entry for them
      db.user.findOrCreate({
        where: { facebookId: profile.id },
        defaults: {
          facebookToken: accessToken,
          email: email,
          name: profile.name.givenName,
          about: profile.about,
          animalId: animalId,
          interestedIn: interestedIn,
          age: age
        }
      }).spread(function(user, wasCreated){
        if(wasCreated){
          //they were new, we created a user
          var catUrl = 'https://pbs.twimg.com/profile_images/815726509763620864/3ZrsVyWa.jpg';
          var dogUrl = 'https://www.what-dog.net/Images/faces2/scroll0015.jpg';
          var url = dogUrl;
          if(user.animalId == 1){
            url = catUrl;
          }
          db.profile_pic.create({
            url: url,
            userId: user.id
          }).then(function(newPic){
            user.addProfile_pic(newPic);
            cb(null, user);
          });
        } else {
          //they were not new after all, just update their token
          user.facebookToken = accessToken;
          user.save().then(function(){
            cb(null, user);
          }).catch(cb);
        }
      }).catch(cb);
    }
  });
}))

module.exports = passport;
