module.exports=function(connection){

    this.projectHomeprjAllocate = function(id,cb){
        connection.query('select * from prj_allocation where id='+ id, function(err,result) {

            if (err) {
                console.log('Error when get imageData : ' + err);
                cb(err,result);
            }else {
                console.log(result);
                cb(err,result);

            }
        });
    }

    this.postHomeprjAllocate=function(data,cb){
        var qry="INSERT INTO prj_allocation set ?";
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

    this.updateHomeprjAllocate=function(id,data,cb){
        var qry="UPDATE prj_allocation set ? where id="+id+"";
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

    this.deleteHomeprjAllocate=function(id,cb){
        var qry="Delete from prj_allocation where id=" +id;
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
