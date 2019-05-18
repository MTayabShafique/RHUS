var fs = require('fs');

var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');
var bodypaser = require('body-parser');
var conn = require('./data/dbconnection.js').open();
var cookieparser = require('cookie-parser');
var user = require('./controllers/user.controller');
var session = require('express-session');

app.use(session({secret: 'EnergySourceRead',
	resave: true,
	saveUninitialized: true}));

app.set('port',(process.env.PORT || 3000));

app.get('/', function(req,res){
	res
	.status(200)
	.sendFile(__dirname+'/public/'+'login.html')
});

app.use('/insert',express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodypaser.urlencoded({ extended : false }));
app.use(bodypaser.json());

app.use('/insert',routes);
app.use('/insert/insert',routes);

app.use('/insert/login', express.static(path.join(__dirname,'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
var server = app.listen(app.get('port'));
