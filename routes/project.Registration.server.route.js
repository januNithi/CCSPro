module.exports = function(app) {
    var con = require('../controllers/project.projectReg.server.controller');
    app.post('/postNewProject',con.postProject);
};