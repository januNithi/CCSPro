// var msopdf = require('../../../lib');
var path=require('path');
var exec = require('child_process').exec;
var q=require('q');
    var fs= require('fs');

module.exports=function(connection){

    var deffer=q.defer();
    
    this.getPdfFiles=function(cb) {
        var qry = "select * from erp_database";   //select doc_File from file_uploading

        console.log("get thedata from dp" + qry);

        connection.query(qry, function (err, results) {

            if (err) {
                console.log(err);
                cb(err,results);
            }
            else {
                console.log(results);
                cb(err,results);
                var data = JSON.stringify(results);
                var jsonDATA = JSON.parse(data);
                console.log(jsonDATA[0]);
                var sync=false;
                var i;


               for (i = 0; i < jsonDATA.length - 1; i++) {

                            sync=false;
                            var ext = path.extname(jsonDATA[i].synImg);

                            if (ext === '.doc') {

                                //for windows
                                // convertPdf(jsonDATA[i].Doc_File);
                                // office.word({
                                //     input: "public/uploads/waterMark/" + jsonDATA[i].Doc_File,
                                //     output: "public/uploads/waterMark/" + jsonDATA[i].Doc_File + ".pdf"
                                // }, function (error, pdf) {
                                //
                                //     if (error) {
                                //
                                //         console.log("Woops", error);
                                //     } else {
                                //         console.log("Saved to", pdf);
                                //     }
                                //
                                //
                                // });


                                console.log(jsonDATA[i].synImg);
                                // var cmd = 'soffice --headless --convert-to pdf --outdir public/uploads/waterMark/ public/uploads/waterMark/' + jsonDATA[i].synImg;
                                // // libreoffice --headless --convert-to pdf ./;
                                // exec(cmd, function(error, stdout, stderr) {
                                //     console.log(error);
                                //     console.log(stdout);
                                //     console.log(stderr);
                                //     sync=true;
                                // });
                                //

                            }
                            else
                                sync=true;
                            console.log(i);

                            while(!sync){
                                require("deasync").sleep(1500);

                            }


                        }





                //for windows
               //res.send(results);

                // msopdf(null, function (error, office) {
                //
                //
                //     if (error) {
                //         console.log("Init failed", error);
                //         return;
                //     }
                //
                //
                //     console.log(jsonDATA.length);
                //     for (i = 0; i <= jsonDATA.length - 1; i++) {
                //
                //         sync=false;
                //         var ext = path.extname(jsonDATA[i].Doc_File);
                //
                //         if (ext === '.doc') {
                //
                //
                //             office.word({
                //                 input: "public/uploads/waterMark/" + jsonDATA[i].Doc_File,
                //                 output: "public/uploads/waterMark/" + jsonDATA[i].Doc_File + ".pdf"
                //             }, function (error, pdf) {
                //
                //                 if (error) {
                //
                //                     console.log("Woops", error);
                //                 } else {
                //                     console.log("Saved to", pdf);
                //                 }
                //
                //
                //             });
                //
                //
                //             office.close(null, function (error) {
                //                 if (error) {
                //                     console.log("Woops", error);
                //                 } else {
                //                     console.log("Finished & closed");
                //
                //
                //                 }
                //                 console.log(i);
                //                 sync=true;
                //
                //
                //
                //             });
                //         }
                //         else
                //             sync=true;
                //         console.log(i);
                //
                //         while(!sync){
                //             require("deasync").sleep(1000);
                //
                //         }
                //
                //
                //     }
                //
                //
                //
                //     // if (i >= jsonDATA.length-1)
                //     // {
                //     //     waterMark();
                //         // cb(err,results);
                //     // }
                //
                // });

                // waterMark();


            }

        });
    };



    this.getDocName=function(cb) {
        // var qry = 'select DEP_NAME from tbl_department';
        var qry = 'select DISTINCT(Department) as DEP_NAME from erp_database';

        console.log("get thedata from dp" + qry);

        connection.query(qry, function (err, results) {

        if(err){
            cb(err,results);
            console.log(err);
        }
            else {

            cb(err,results);
            console.log(results);
        }



    });

    };

    this. getDepName=function(data,cb) {
        // var qry = 'select subhead from cathead where head="' + data + '"';
        var qry = 'select distinct(subHeads) as subhead  from erp_database where Department="' + data + '"';

        console.log("get thedata from dp" + qry);

        connection.query(qry, function (err, results) {

            if (err) {
                cb(err, results);
                console.log(err);
            }
            else {

                cb(err, results);
                console.log(results);
            }


        });
    };


        this.getTittle=function(data,cb) {
            var qry = 'select * from erp_database where subHeads="'+data+'"';

            console.log("get thedata from dp" + qry);

            connection.query(qry, function (err, results) {

                if (err) {
                    cb(err, results);
                    console.log(err);
                }
                else {

                    cb(err, results);
                    console.log(results);
                }


            });


    };



















    function waterMark(){
        fs.readdir('./public/uploads/waterMark/',function(err,files){
            if(err) return;
            var sync=true;
            files.forEach(function(file){
                sync=false;
                console.log(file);
                var ext=path.extname(file);

                if(ext==='.pdf'){


                    var cmd = 'pdftk ./public/uploads/waterMark/'+file+' background ./public/uploads/waterMarkLabel/waterMarkLabel.pdf output ./public/uploads/waterMarkpdf/'+file;

                    exec(cmd, function(error, stdout, stderr) {
                        console.log(error);
                        sync=true;
                    });
                }
                else
                    sync=true;
                while(!sync){
                    require("deasync").sleep(2000);

                }
            });
        });
    }

    //for windows
    //
    //
    //         });
    //     });
    // }




};
