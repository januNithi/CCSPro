var mysql = require('mysql'),
    dateFormat = require('dateformat'),
    db = require('../config/db');
var connection = mysql.createConnection(db);
var documents=require('../config/db/project.image.manager');
var objDocument=new documents(connection);
exports.home=function(req,res){
    res.sendfile('./public/app/core/layout.html');
};

exports.imageData = function(req, res) {
    objDocument.imageDatas(req.query.id,function(err,results){
        if(err){
            res.send(err)
        }
        else{
            res.send(JSON.stringify(results));
        }
        
    });
    
};

exports.postImages = function(req,res){
    var document = {};
    var datetime = new Date();

    // console.log(req.path);

    var formidable = require('formidable');
    // console.log(req.body);
    var sync = false;
    var insertCallback;
    var insertId = null;
    var i = 0;
    var ext;
    insertCallback = function (err, insId) {
        insertId = insId;
        fs.createReadStream(files1['docFile' + i].path).pipe(fs.createWriteStream(__dirname + '/../public/uploads/project/' + files1['docFile' + i].name));
        fs.rename(__dirname + '/../public/uploads/project/' + files1['docFile' + i].name, __dirname + '/../public/uploads/project/' + insertId + ext, function (err) {
            if (err) {
                res.end({error:err});

            }
            sync = true;
        });
    };


    var form = new formidable.IncomingForm(),
        files1 = {};



    form.parse(req, function (err, fields, files) {

        if(err) throw err;
        for (i = 1; i <= Object.keys(files).length; i++) {
            files1=files;
            sync = false;
            ext = path.extname(files['docFile' + i].name);
            // console.log(fields["docCaption"+i]);
            document.docFile = files['docFile' + i].name;


            // console.log(document);

            postHomeProjectImage.insertDoc(document, insertCallback);
            while (!sync) {
                require('deasync').sleep(1000);
            }

        }


        //res.redirect('/documents/multipleFileUpload');
    });
}

exports.updateProjectImage=function(req,res) {
    var data=req.body;
    var id=req.query.id
    objDocument.updateHomeProjectImage(id,data,function(err,results){
        if(err){
            console.log(err);
        }
        else{
            console.log(results);
        }

    });
};
exports.deleteProjectImage=function(req,res){
    var id=req.params.id;
    objDocument.deleteHomeProjectImage(id,function(err,results){
        if(err){
            console.log(err)
        }
        else{
            console.log(results);
        }
    });
}
