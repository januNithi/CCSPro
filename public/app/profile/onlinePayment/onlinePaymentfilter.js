/**
 * Created by CSS on 04-07-2016.
 */

(function () {
    angular.module('myApp').filter('yesNo', function () {
        return function (boolean) {
            return boolean ? 'Yes' : 'No';
        };
    });
})();

