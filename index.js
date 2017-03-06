//requires and global variables
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
// var db = require('./models');
var app = express();

//set and use staements
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});

//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/potentials', require('./controllers/potentials'));
app.use('/profile', require('./controllers/profile'));
app.use('/chatroom', require('./controllers/chatroom'));

//listen
app.listen(3000);
