module.exports = function(app) {
    var home = require('../controllers/project.image.home.server.controller.js');
    app.get('/imageData',home.imageData);
    app.get('/postImages',home.postImages);
    app.get('/updateProjectImage',home.updateProjectImage);
    app.get('/deleteProjectImage',home.deleteProjectImage);
}

