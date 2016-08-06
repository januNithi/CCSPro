(function() {
    angular
        .module('myApp')
        .service('projectDeliveryDateService', projectDeliveryDateService);

    projectDeliveryDateService.$inject = [
        '$http',
        '$q',
        '$window',
        'Upload'
    ];
    function projectDeliveryDateService($http, $q, $window, Upload) {
        return {

            addDeliverydate:function(data){
                
                return $http({
                    method:'POST',
                    url:'/add/projectDeliveryDate',
                    data:data
                });
            },

            getDeliverydate:function(){

                return $http({
                    method:'GET',
                    url:'/get/projectDeliveryDate'
                });
            }



        }
    }
})();