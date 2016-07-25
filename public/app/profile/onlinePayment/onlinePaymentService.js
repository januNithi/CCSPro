/**
 * Created by CSS on 06-07-2016.
 */
(function() {
    angular
        .module('myApp')
        .factory('onlinePaymentService', onlinePaymentService);

    onlinePaymentService.$inject=[
        '$http',
        '$window'
    ];

    function onlinePaymentService($http,$window) {
        return {

            sendCard: function (card) {

                $window.location.href = '/payOnline/citrusPayment';

                // return $http({
                //     method: 'post',
                //
                //     url: '/auth/sendCard',
                //
                //     data: card

                // });
            },
            
            payOnline: function () {
                $window.location.href = '/auth/makePayment';
            }
        };
    }
})();