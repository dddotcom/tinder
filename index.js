//requires and global variables
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var moment = require('moment');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var isLoggedIn = require("./middleware/isLoggedIn");
var session = require('express-session');
require('dotenv').config();
var app = express();

//set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.locals.moment = moment;
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

//routes
app.get('/', function(req, res){
  res.render('index');
});

//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/potentials', require('./controllers/potentials'));
app.use('/profile', require('./controllers/profile'));
app.use('/chatroom', require('./controllers/chatroom'));

//listen
app.listen(process.env.PORT || 3000)
