module.exports=function(app){

    var con=require('../controllers/waterMark.unRegister.server.controller.js');

    app.get('/fileDoc',con.getAllDoc);
    app.get('/get/docHeadName',con.getDocHead);
    app.post('/select/docHeadName',con.selectDepName);
    app.post('/select/subHead',con.selectTittle);
};
