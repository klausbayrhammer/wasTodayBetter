"use strict";

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/wasTodayBetter';


exports.today = function (req, res) {
    console.log('calling day');
    var todayWithoutTime = getTodayWithoutTime();
    console.log(todayWithoutTime);

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('days');
        collection.findOne({date:todayWithoutTime}, function(err, data) {
            if(err)
                console.log(err);
            res.send(data);
            db.close();
        });
    });
};

exports.addToday = function (req, res) {
    console.log('adding day');
    console.log(req.query);
    var todayWithoutTime = getTodayWithoutTime();
    console.log(todayWithoutTime);

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('days');
        collection.insert({type:req.params.type, date: todayWithoutTime, value:req.params.val},
            function(err, result) {
            console.log('Inserted' + result.result.n + 'documents into the document collection');
        });
        db.close();
    });
    res.end();
};

function getTodayWithoutTime()
{
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}