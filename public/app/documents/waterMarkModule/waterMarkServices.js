(function() {
    angular.module('myApp')
        .service('unRegisterService', unRegisterService);

    unRegisterService.$inject=['$http','$window'];

    function unRegisterService($http, $window) {

        this.getFileDoc = function () {
            return $http.get('/fileDoc');
        };

        this.goToDashboard = function () {
            $window.location.href = '/profile/dashboard';
        };

        this.getDocHead = function () {

            return $http.get('/get/docHeadName');
        };
        this.DepName = function (data) {


            return $http.post('/select/docHeadName', {data: data});
        };

        this.tittle = function (data) {


            return $http.post('/select/subHead', {data: data});
        }
    }
})();


