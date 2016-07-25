/**
 * Created by CSS on 02-07-2016.
 */
(function(){

    angular
        .module('myApp')
        .controller('onlinePaymentController', onlinePaymentController);

    onlinePaymentController.$inject=[
        '$scope',
        'onlinePaymentService'
    ];

    function onlinePaymentController($scope,onlinePaymentService) {
        $scope.userCredentials = false;
        $scope.payWithCredit = true;
        $scope.card = {
            number:'',
            cvc:'',
            expiration:{
                month:'',
                year:''
            }
        }

        $scope.payOnline = function () {

           onlinePaymentService.sendCard($scope.card).then(function () {

               onlinePaymentService.payOnline();
           });

            
        };

        $scope.payOption = function (paymentMode) {

            if(paymentMode == 'card'){
                $scope.payWithCredit = true;
            }else{
                $scope.payWithCredit = false;
            }

        };

    }


})();