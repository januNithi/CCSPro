module.exports = function(app) {
    var home = require('../controllers/project.prj_allocate.server.controller.js');

    app.get('/prj_allocate',home.getPrj_allocate);
    app.post('/postPrjAllocate',home.postPrjAllocate);
    app.put('/updatePrjAllocate',home.updatePrjAllocate);
    app.delete('/deletePrjAllocate',home.deletePrjAllocate);
};
