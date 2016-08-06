module.exports=function(connection){

    this.imageDatas = function(id,cb){
        connection.query('select * from images where prj_id='+ id, function(err,result) {

            if (err) {
                console.log('Error when get imageData : ' + err);
                cb(err,result);
            }else {
                console.log(result);
                cb(err,result);

            }
        });
    }

    this.postHomeProjectImage=function(document,cb){
        var qry="INSERT INTO images set ?";
        var err=null; var result=null;
        if(data='null') return cb('error', result);
        connection.query(qry,document,function(err,result){

            if(err){
                console.log(err);
                cb(err,result);
            }
            else{
                console.log(result);
                cb(err,result);
            }
        });
    }

    this.updateHomeProjectImage=function(id,data,cb){
        var qry="UPDATE images set ? where id="+id+"";
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

    this.deleteHomeProjectImage=function(id,cb){
        var qry="Delete from images where id=" +id;
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
