
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
  connection.query("select a.*,b.*,c.*,d.* from personaldata a left outer join project_allocate b on a.id=b.student_id left outer join erp_database c on b.project_id=c.projectCode left outer join project d on b.project_id=d.PCode where a.id='58'",function(err,result) {

    if (err) {
      console.log('Error when get projectHistory data : ' + err);
    }else {
      console.log(result);
      res.send(JSON.stringify(result));
    }
  });
};


exports.projectHistory = function(req, res) {
  connection.query('Select * from projectDetails where PCode='+req.query.id,function(err,result) {

    if (err) {
     console.log('Error when get projectHistory data : ' + err);
    }else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.chartData = function(req, res) {
  connection.query('Select a.x as caption,a.y as value from chart a', function(err,result) {

    if (err) {
      //console.log('Error when get chart data : ' + err);
    }else {
      console.log(result);
      //Var values=[result];
      res.send(result);
    }
  });
};

exports.imageData = function(req, res) {
  connection.query('select * from images where prj_id='+ req.query.id, function(err,result) {

    if (err) {
     // console.log('Error when get imageData : ' + err);
    }else {
      console.log(result);
      res.send(result);

    }
  });
};

exports.postQuestion = function(req, res) {
  var now = new Date();
  connection.query('Insert into stud_questions(Question, createdBy, createdAt) values(\'' + req.body + '\',\'Ganesh\',\'' + dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT') + '\')', function(err,result) {

    if (err) {
     // console.log('Error when get postQuestion data : ' + err);
    }else {
      console.log(result);
      res.send(result);
    }

  });
};