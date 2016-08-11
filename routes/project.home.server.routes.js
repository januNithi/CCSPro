
module.exports = function(app) {
  var home = require('../controllers/project.home.server.controller.js');

  //App.get('/', home.home);
  app.get('/getAllFields',home.getAllFields);
  app.get('/data',home.data);
  app.get('/getScheduler',home.getScheduler);

};