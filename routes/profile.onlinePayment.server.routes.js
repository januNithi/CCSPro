/**
 * Created by CSS on 29-06-2016.
 */

module.exports = function(app) {
    var login = require('../controllers/profile.onlinePayment.server.controller');
    // Var layout = require('../controllers/project.layout.server.controllers');
    var payment = require('../controllers/profile.citrusPayment.server.controller');
    //App.get('/', layout.layout);
    app.use('/payOnline',payment);
    app.use('/auth',login);
    // App.post('/verifyUser',login.verifyUser);
    // app.get('/auth/facebook/callback',login.facebookCallback);

};