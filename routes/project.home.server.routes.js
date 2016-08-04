
module.exports = function(app) {
  var home = require('../controllers/project.home.server.controller.js');

  //App.get('/', home.home);
  app.get('/getAllFields',home.getAllFields);
  app.get('/data',home.data);
  app.get('/projectHistory',home.projectHistory);
  app.get('/chartData',home.chartData);
  app.get('/imageData',home.imageData);
  app.post('/postQuestion',home.postQuestion);
};