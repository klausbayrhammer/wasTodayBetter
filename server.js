var http = require('http');
var loki = require('lokijs');

var db = new loki('todayBetter.json');
var todayBetter = db.addCollection('todayBetter');

http.createServer(function (req, res) {
    todayBetter.insert({type:'TDD', value:true});

    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log(todayBetter.find({type:'TDD'}));
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');