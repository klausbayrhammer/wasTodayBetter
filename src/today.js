"use strict";
var mongo = require('./mongo');

exports.today = function (req, res) {
    console.log('calling day');
    var todayWithoutTime = getTodayWithoutTime();
    // Use connect method to connect to the Server
    mongo.exec(function(err, db) {
        var collection = db.collection('days');
        collection.find({date:todayWithoutTime}, function(err, data) {
            if(err)
                console.log(err);
            res.send(data);
            db.close();
        });
    });
};

exports.addToday = function (req, res) {
    console.log('adding day');
    var todayWithoutTime = getTodayWithoutTime();

    // Use connect method to connect to the Server
    mongo.exec(function(err, db) {
        var collection = db.collection('days');
        collection.insert({type:req.params.type, date: todayWithoutTime, value:req.params.val});
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