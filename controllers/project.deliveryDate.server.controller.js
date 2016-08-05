var mysql = require('mysql'),
    dateFormat = require('dateformat'),
    db = require('../config/db');
var connection = mysql.createConnection(db);
var documents=require('../config/db/project.deliveryDate.manager');
var objDocument=new documents(connection);
exports.home=function(req,res){
    res.sendfile('./public/app/core/layout.html');
};

exports.getAllDeliveryDates = function(req, res) {
    objDocument.getAllDeliveryDate(req.query.id,function (err, results) {

        if (err) {
            res.send(err)
        }
        else {
            res.send(results)
        }
    });
};

exports.postDeliveryDates = function(req,res){
    var data=req.body;
    objDocument.postHomeDeliveryDates(data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
};

exports.updateDeliveryDates=function(req,res) {
    var data=req.body;
    var id=req.query.id
    objDocument.updateHomeDeliveryDates(id,data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results)
        }

    });
};
exports.deleteDeliveryDates=function(req,res) {
    var id = req.params.id;
    objDocument.deleteHomeDeliveryDates(id, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }
    });
};
