
var mysql = require('mysql'),
    dateFormat = require('dateformat'),
    db = require('../config/db');
var connection = mysql.createConnection(db);
var documents=require('../config/db/project.history.manager');
var objDocument=new documents(connection);
exports.home=function(req,res){
    res.sendfile('./public/app/core/layout.html');
};


exports.projectHistory = function(req, res) {
    objDocument.projectHomeHistory(req.query.id,function (err, results) {

        if (err) {
            res.send(err)
        }
        else {
            res.send(results)
        }
    });
};

exports.postProjectHistory = function(req,res){
    var data=req.body;
    objDocument.postHomeProjectHistory(data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
};

exports.updateProjectHistory=function(req,res) {
    var data=req.body;
    var id=req.query.id
    objDocument.updateHomeProjectHistory(id,data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results)
        }

    });
};
exports.deleteProjectHistory=function(req,res){
    var id=req.params.id;
    objDocument.deleteHomeProjectHistory(id,function(err,results){
        if(err){
            console.log(err)
        }
        else{
            console.log(results);
        }
    });
}


