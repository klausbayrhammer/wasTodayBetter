"use strict";
var loki = require('lokijs');
var db = new loki('todayBetter.json');
var todayBetter = db.addCollection('todayBetter');

exports.today = function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var todayWithoutTime = getTodayWithoutTime();
    var entity = todayBetter.find({date: todayWithoutTime});
    res.end(JSON.stringify(entity));
};

exports.addToday = function (req, res) {
    var todayWithoutTime = getTodayWithoutTime();
    todayBetter.insert({type:req.query.type, date: todayWithoutTime, value:req.query.val});
};

function getTodayWithoutTime()
{
    return new Date().setHours(0, 0, 0, 0);
}
