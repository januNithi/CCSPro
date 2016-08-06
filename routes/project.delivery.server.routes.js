module.exports = function(app) {
    var home = require('../controllers/project.deliveryDate.server.controller.js');
    app.get('/getAllDeliveryDates',home.getAllDeliveryDates);
    app.post('/postDeliveryDates',home.postDeliveryDates);
    app.put('/updateDeliveryDates',home.updateDeliveryDates);
    app.delete('/deleteDeliveryDates',home.deleteDeliveryDates);
};
