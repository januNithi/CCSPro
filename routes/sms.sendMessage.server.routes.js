

module.exports = function(app) {
    var smsCtrl = require('../controllers/sms.messages.server.controller');

    app.post('/api/sms/sendMessage',smsCtrl.sendMessage);
    app.get('/api/sms/getSmsData',smsCtrl.getSmsData);
    app.get('/api/sms/getSmsDataById/:id',smsCtrl.getSmsDataById);
    app.get('/api/sms/getStudentInfo',smsCtrl.getStudentInfo);
    app.get('/api/sms/getProjectInfo',smsCtrl.getProjectInfo);
};
