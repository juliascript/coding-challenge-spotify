var express = require('express');
// var bodyParser = require('body-parser');

var app = express();

// parse json and form encoded data 
// -?- is this good practice bc this is only necessary for post requests

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// static files
app.use('/assets', express.static(__dirname + '/public'));

// specify view engine file extension
app.set('view engine', 'ejs');

// routes 
var homeRoute = require('./controllers/home');
homeRoute(app);
var peopleRoute = require('./controllers/people');
peopleRoute(app);


// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

// allow requests through socket on port specified
app.listen(port);
console.log('Server running...');