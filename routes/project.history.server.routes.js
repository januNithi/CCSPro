
module.exports = function(app) {
    var home = require('../controllers/project.history.home.server.controller.js');
    app.get('/projectHistory',home.projectHistory);
    app.post('/postProjectHistory',home.postProjectHistory);
    app.put('/updateProjectHistory',home.updateProjectHistory);
    app.delete('/deleteProjectHistory',home.deleteProjectHistory);
};
