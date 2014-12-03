var http = require('http');
var express = require('express');
var routes = require('./routes');

var app = express();

app.get('/today', routes.today);
app.post('/today', routes.addToday);

http.createServer(app).listen(1337, function(){
    console.log("Express server listening on port " + 1337);
});