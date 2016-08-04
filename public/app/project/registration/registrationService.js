(function() {
    angular.module('myApp')
        .service('registrationService', registrationService);

    registrationService.$inject=['$http','$window'];

    function registrationService($http, $window) {
        this.goToDashboard = function () {
            $window.location.href = '/profile/dashboard';
        };

    }
})();