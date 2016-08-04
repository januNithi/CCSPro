
var mysql=require('mysql');
var db=require('../config/db.js');


var connection=mysql.createConnection(db);
var documents=require('../config/db/projectRegManager.js');
var objDocument=new documents(connection);
exports.home=function(req,res){
  res.sendfile('./public/app/core/layout.html');
};

exports.getAllProject=function(req,res){
  objDocument.getProjects(function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

exports.postProject=function(req,res){

  var document = {};


  var formidable = require('formidable');
  var form = new formidable.IncomingForm();

  form.parse(req,function(err, fields, files){

    var ext=path.extname(files.fileUpload.name);

    //var ext=path.extname(fields.file);

    document.projectCode=fields.projectCode;
    document.title=fields.title;
    document.department=fields.department;
    document.subHeads=fields.subHeads;
    document.software=fields.price_field;
    document.hardware=fields.price_field1;
    document.catlogCode=fields.catelogCode;
    document.domain=fields.domain;
    document.abstract=fields.abstract;
    document.docFile=files.fileUpload.name;

    console.log("document data"+document);

    objDocument.postProjects(document,function(err,result){
      if(err){
        res.send(err);
      }
      else{
        fs.createReadStream(files.fileUpload.path).pipe(fs.createWriteStream(__dirname+"/../public/uploads/projectRegistration/"+files.fileUpload.name));
        fs.rename(__dirname+"/../public/uploads/projectRegistration/"+files.fileUpload.name, __dirname+"/../public/uploads/projectRegistration/"+result.insertId+ext, function (err) {
          if (err) throw err;
          console.log(err);


        });
        res.redirect("/project/registration");
        
      }
    });
  });

};

exports.editProject=function(req,res){
  var data=req.body;
  objDocument.editProjects(data.id,req.body,function(err,result){
    console.log(result);
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

exports.deleteProject=function(req,res){
  var data=req.body.id;
  objDocument.deleteProjects(data,function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};