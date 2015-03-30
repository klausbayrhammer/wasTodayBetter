var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/wasTodayBetter';

exports.exec = function(callback) {
    MongoClient.connect(url, function(err, db) {
        if(err)
            console.log(err);
        callback(err, db);
    });
};