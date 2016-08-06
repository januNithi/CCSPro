module.exports=function(connection){

    this.getAllDeliveryDate = function(id,cb){
        connection.query('select * from deliverydate where id='+ id, function(err,result) {

            if (err) {
                console.log('Error when get delivery date : ' + err);
                cb(err,result);
            }else {
                console.log(result);
                cb(err,result);

            }
        });
    }

    this.postHomeDeliveryDates=function(data,cb){
        var qry="INSERT INTO deliverydate set ?";
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

    this.updateHomeDeliveryDates=function(id,data,cb){
        var qry="UPDATE deliverydate set ? where id="+id+"";
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

    this.deleteHomeDeliveryDates=function(id,cb){
        var qry="Delete from deliverydate where id=" +id;
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

