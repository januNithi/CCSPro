var mysql = require('mysql'),
    dateFormat = require('dateformat'),
    db = require('../config/db');
var connection = mysql.createConnection(db);
var documents=require('../config/db/project.percentage.manager');
var objDocument=new documents(connection);
exports.home=function(req,res){
    res.sendfile('./public/app/core/layout.html');
};


exports.getPercentage = function(req, res) {
    objDocument.projectPercentage(req.query.id,function (err, results) {

        if (err) {
            res.send(err)
        }
        else {
            res.send(results)
        }
    });
};

exports.postPercentage = function(req,res){
    var data=req.body;
    objDocument.postHomePercentage(data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
};

exports.updatePercentage=function(req,res) {
    var data=req.body;
    var id=req.query.id
    objDocument.updateHomePercentage(id,data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results)
        }

    });
};
exports.deletePercentage=function(req,res){
    var id=req.params.id;
    objDocument.deleteHomePercentage(id,function(err,results){
        if(err){
            console.log(err)
        }
        else{
            console.log(results);
        }
    });
}


