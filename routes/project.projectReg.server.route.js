module.exports = function(app) {
  var con = require('../controllers/project.projectReg.server.controller');
  app.get('/getAllProjects',con.getAllProject);
  app.post('/updateProject',con.editProject);
  app.post('/deleteProject',con.deleteProject);
};
