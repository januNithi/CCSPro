

var mysql=require('mysql');
var   db= require('../../db');
var   con=mysql.createConnection(db);

// module.exports = function(con){

exports.getStarInfo = function (id,cb){

      var myErr=null,result=null;
      if(id=="" || id==undefined ||  id==null) return cb("error",result);
      con.query('select a.ID,a.DOC_ID,a.STARS,a.USER_ID,a.STAR_DATE,b.fname,b.lname from tbl_doc_stars a LEFT OUTER JOIN personaldata b ON a.USER_ID=b.id where a.doc_id='+id+' ORDER BY a.ID',  function(err,rows){
      if(err)
      {
          myErr=err;
          cb( myErr,result);
      }
      else
      {
          result=rows;
          cb( myErr,result);
      }
      
      
    });

};

exports.setStar=function(data,cb){

    var myErr=null,insertId=null;

        if(data=="" ||  data==null) return cb("error",insertId);

        var qry="INSERT INTO tbl_doc_stars SET ?";
        var objectConstructor = {}.constructor;
            if(data.constructor!==objectConstructor)
            {
                console.log("error");
                return cb("error",insertId);
            }

            con.query(qry,data, function(err,res){

              if(err)
              {
                  myErr=err;
                  cb(myErr,insertId);
              }
              else
              {
                  insertId=res.insertId;
                  cb(myErr,res.insertId);
              }
          });

};


exports.getStar=function(id,cb){
console.log("Dd");
      var myErr=null,stardata=null;
      var qry="SELECT FLOOR(AVG(STARS)) AS STR FROM tbl_doc_stars WHERE DOC_ID="+id;
    console.log(qry);
      if(id=="" || id==undefined ||  id==null) return cb("error",stardata);

    con.query(qry, function(err,res){
        if(err)
        {
            myErr=err;
            cb( myErr,stardata);
        }
        else
        {
            stardata=res;
            cb(myErr,stardata);
        }
    });
};



// };