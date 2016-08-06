(function()
{
    angular
        .module('myApp')
        .controller('projectDeliveryDateController',projectDeliveryDateController);

    projectDeliveryDateController.$inject = ['$scope','$window','spinnerService','dashboardService','projectDeliveryDateService'];

    function projectDeliveryDateController($scope,$window,spinnerService,dashboardServic,projectDeliveryDateService) {

        $scope.DeliveryDate=[];
        $scope.add=function()
        {
                var data={
                    myDate:$scope.myDate,
                    Description:$scope.remark
                };
            
            projectDeliveryDateService.addDeliverydate(data).then(function()
            {
                $scope.myDate='';
                $scope.remark='';
                
            });

        };
        $scope.GetDeliveryDate=function()
        {
            var data={
                myDate:$scope.myDate,
                Description:$scope.remark
            };

            projectDeliveryDateService.getDeliverydate(data).then(function()
            {
                $scope.DeliveryDate=data;
                $scope.myDate='';
                $scope.remark='';

            });
            $scope.GetDeliveryDate();
        };
        

    }

})();