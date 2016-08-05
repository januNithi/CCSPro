var mysql = require('mysql'),
    dateFormat = require('dateformat'),
    db = require('../config/db');
var connection = mysql.createConnection(db);
var documents=require('../config/db/project.prj_allocate.manager');
var objDocument=new documents(connection);
exports.home=function(req,res){
    res.sendfile('./public/app/core/layout.html');
};

exports.getPrj_allocate = function(req, res) {
    objDocument.projectHomeprjAllocate(req.query.id,function (err, results) {

        if (err) {
            res.send(err)
        }
        else {
            res.send(results)
        }
    });
};

exports.postPrjAllocate = function(req,res){
    var data=req.body;
    objDocument.postHomeprjAllocate(data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
};

exports.updatePrjAllocate=function(req,res) {
    var data=req.body;
    var id=req.query.id
    objDocument.updateHomeprjAllocate(id,data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results)
        }

    });
};
exports.deletePrjAllocate=function(req,res) {
    var id = req.params.id;
    objDocument.deleteHomeprjAllocate(id, function (err, results) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(results);
        }
    });
};