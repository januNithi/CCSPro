/**
 * Created by CSS on 25-07-2016.
 */


(function() {
    angular
        .module('myApp')
        .filter('documentUrlTrustee', myDate);

    function myDate($sce) {
        return function(input)  {
                return $sce.trustAsResourceUrl(val);
        };
    }
})();