
var mysql = require('mysql'),
    dateFormat = require('dateformat'),
    db = require('../config/db');

var connection = mysql.createConnection(db);

exports.data = function(req, res) {
  connection.query("Select * from project where PCode='CB2-1516-CSD0001'",function(err,result) {

    if (err) {
     // console.log('Error when get project data : ' + err);
    }else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.getAllFields = function(req, res) {
  var id=req.session.data.userid                   //req.query.id;
  console.log("userid"+req.session.data.userid);
  connection.query("select a.*,b.*,c.*,c.id as pid,d.* from personaldata a left outer join project_allocate b on a.userid=b.student_id left outer join erp_database c on b.project_id=c.projectCode left outer join project d on b.project_id=d.PCode where a.userid='"+id+"'",function(err,result) {

    if (err) {
      console.log('Error when get projectHistory data : ' + err);
    }else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
};


exports.getScheduler = function(req, res) {
  var id=req.query.id;
  connection.query("select a.HandledBy,a.ptask,a.Manager from project a where a.PCode='"+id+"'",function(err,result) {

    if (err) {
      console.log('Error when get projectHistory data : ' + err);
    }else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
};

