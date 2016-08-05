module.exports = function(app) {
    var home = require('../controllers/project.percentage.server.controller.js');
    app.get('/getPercentage',home.getPercentage);
    app.post('/postPercentage',home.postPercentage);
    app.put('/updatePercentage',home.updatePercentage);
    app.delete('/deletePercentage',home.deletePercentage);
};