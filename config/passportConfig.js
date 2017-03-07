var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require("../models");
// require("dotenv").config();

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

module.exports = passport;
