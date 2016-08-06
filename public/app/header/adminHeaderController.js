/**
 * Created by Administrator on 21.07.2016.
 */
(function(){
    angular
        .module("myApp")
        .controller('adminHeaderController',adminHeaderController);

    adminHeaderController.$inject=[
        '$scope',
        'adminHeaderServices',
        'spinnerService',
        '$window',
        'dashboardService'
    ];

    function adminHeaderController($scope,adminHeaderServices,spinnerService,$window,dashboardService){

        $scope.goToDashboard = function() {
            spinnerService.show('html5spinner');
            adminHeaderServices.goToAdminDashboard();
        };

        
        $scope.onLogout = function() {

            if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
                spinnerService.show('html5spinner');
                dashboardService.logout();

            }
        };
    }



})();
