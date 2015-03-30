var restify = require('restify');
var today = require('./today');

server = restify.createServer();
server.use(restify.queryParser());
server.get('today', today.today);
server.post('today', today.addToday);

server.listen((process.env.PORT || 5000), function() {
    console.log('%s listening at %s', server.name, server.url);
});
