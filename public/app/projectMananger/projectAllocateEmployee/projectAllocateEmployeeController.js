(function()
{
    angular
        .module('myApp')
        .controller('projectAllocateEmployeeController',projectAllocateEmployeeController);

    projectAllocateEmployeeController.$inject = ['$scope','$window','spinnerService','dashboardService'];

    function projectAllocateEmployeeController($scope,$window,spinnerService,dashboardService) {

$scope.add=function()
{
    var data={

        Description:$scope.Description,
    }
    
    
    
}


    }

})();