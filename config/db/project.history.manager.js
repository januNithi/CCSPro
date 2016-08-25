module.exports=function(connection) {
    this.projectHomeHistory = function (id,cb) {
        connection.query("Select staffworkflow.odate,staffworkflow.job4,staffworkflow.pcode,project.HandledBy,project.ptask from staffworkflow INNER JOIN  project ON staffworkflow.pcode=project.PCode where staffworkflow.PCode='CMP0194' and job4!='' and job4!='LUNCH'  group by job4;", function (err, result) {
console.log('Select * from projectdetails where PCode=' + id);
            if (err) {
                console.log('Error when get projectHistory data : ' + err);
                cb(err,result);
            } else {
                console.log(result);
                cb(err,result);
            }
        });
    };

    this.postHomeProjectHistory=function(data,cb){
        var qry="INSERT INTO projectdetails set ?";
        var err=null; var result=null;
        connection.query(data,function(err,result){
            if(err){
                console.log(err);
                cb(err,result);
            }
            else{
                console.log(result);
                cb(err,result);
            }
        });
    };

    this.updateHomeProjectHistory=function(id,data,cb){
        var qry="UPDATE projectdetails set ? where id="+id+"";
        console.log("store the data in database" + qry);
        var err=null; var result=null;
        connection.query(qry,data,function(err,results){
            if(err){

                console.log(err);
                cb(err,result);
            }
            else{
                console.log(result);
                cb(err,result);
            }
        });
    };

    this.deleteHomeProjectHistory=function(id,cb){
        var qry="Delete from projectdetails where id=" +id;
        var err=null; var result=null;
        if(data='null') return cb('error', result);
        connection.qry(qry,function(err,result){

            if(err){
                console.log(err);
                cb(err,result);
            }
            else{
                console.log(result);
                cb(err,result);
            }
        });
    };

};


