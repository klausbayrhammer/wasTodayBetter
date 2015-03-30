"use strict";
var mongoose = require('mongoose');
mongoose.connect('mongodb://wastodaybetter:secret@ds039351.mongolab.com:39351/wastodaybetter');

var TodayEntrySchema = new mongoose.Schema({
    date: { type: Date, default: getTodayWithoutTime},
    type: String,
    value: String
});

var TodayEntry = mongoose.model('TodayEnrty', TodayEntrySchema);

exports.today = function (req, res) {
    console.log('calling day');
    TodayEntry.find({date:getTodayWithoutTime()}, function(err, entry) {
        res.send(entry);
    });
};

exports.addToday = function (req, res) {
    console.log('adding day');
    TodayEntry.findOne({type:req.params.type, date:getTodayWithoutTime()}, function(err, entry) {
        if(entry) {
            entry.value=req.params.val;
            entry.save();
        } else {
            var todayEntry = new TodayEntry({type:req.params.type, value:req.params.val});
            todayEntry.save();
        }
    });
    res.end();
};

function getTodayWithoutTime()
{
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}