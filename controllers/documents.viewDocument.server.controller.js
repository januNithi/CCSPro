

var path = require('path'),
    fs=require("fs"),
    admZip = require('adm-zip'),
    docService= require('../config/db/documents/documentdb');
    


    unZipFile=function(id,cb){

            // var sync=false;
            var files=[];
            var fileName="";

            docService.getDocById(id,0,function(err,data){
                if(data.length<=0) {
                    cb("NoData",files);
                }

                else{
                    fileName=data[0].docFile;
                    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
                    var zip = new admZip(__dirname+"/../public/uploads/documents/"+id+"."+ext);
                    var zipEntries = zip.getEntries();
                    zipEntries.forEach(function(zipEntry) {
                        files.push({file : zipEntry.entryName}) ;
                    });
                    cb("success",files);
                }

            // sync=true;

            });
            // while(!sync) {
            // require('deasync').sleep(1000);
            //     cb("success",files);
            // }


    };

    exports.viewDocument=function(req,res){
        var id = req.query.id;

        if(id==='' || id===null || isNaN(id)) return res.end("invalid");
        docService.incrViews(id,function(err){
           if(err){
               res.end({error:err});
           }
            else
            res.end("valid");
        });


          //res.json={mode:req.session.userMode};

    };

    exports.downloadDocument=function(req,resp){

        var id = req.query.id;

        if(id==='' || id===null || isNaN(id)) return resp.end("invalid");
        // console.log(id);
        var ext="";
        var filename;


        docService.getDocById(id,0,function(err,data){
            if(data.length <=0) resp.end("NO_DOCUMENT");
        filename=data[0].docFile;
        ext = filename.substring(filename.lastIndexOf('.') + 1);
        docService.incrDown(id,function(err,res){
            if(err){
                resp.end({error:err});
            }
        else
        {
          // console.log(res);


              fs.access(__dirname+"/../public/uploads/documents/"+id+"."+ext, fs.F_OK, function(err) {
                if (!err) {
                  resp.download(__dirname+"/../public/uploads/documents/"+id+"."+ext);
                } else {
                  resp.end("No_file_found");
                }

              });
        }

        });

      });

    };

    exports.nextDocument=function(req,res){
        var id=req.query.id;
        if(id==='' || id===null || isNaN(id)) return res.end("invalid");

      docService.getDocById(id,1,function(err,data){
          if(err){
              res.end({error:err});
          }else
            res.end(JSON.stringify(data));

    });

    };


    exports.prevDocument=function(req,res){
      var id=req.query.id;
        if(id==='' || id===null || isNaN(id)) return res.end("invalid");

      docService.getDocById(id,-1,function(err,data){
          if(err){
              res.end({error:err});
          }else
            res.end(JSON.stringify(data));

    });

    };

    exports.userMode=function(req,res,next){
        var userMode={mode:req.session.data.userType};
        res.end(JSON.stringify(userMode));
    };


    exports.readZip=function(req,res){

      var id=req.query.id,files;
        if(id==='' || id===null || isNaN(id)) return res.end("invalid");
        unZipFile(id,function(err,files){
            if(err==='NoData') res.end("No Data");
            else
                res.end(JSON.stringify(files));
        });




    };
