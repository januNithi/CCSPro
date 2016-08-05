
module.exports=function(connection){

    this.projectPercentage = function(id,cb){
        connection.query('select a.x as label, a.y as value from chart a where prId='+ id, function(err,result) {

            if (err) {
                console.log('Error when get imageData : ' + err);
                cb(err,result);
            }else {
                console.log(result);
                cb(err,result);

            }
        });
    }

    this.postPercentage=function(data,cb){
        var qry="INSERT INTO chart set ?";
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

    this.updatePercentage=function(id,data,cb){
        var qry="UPDATE chart set ? where id="+id+"";
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

    this.deletePercentage=function(id,cb){
        var qry="Delete from chart where id=" +id;
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
