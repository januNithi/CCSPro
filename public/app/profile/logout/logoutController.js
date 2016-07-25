/**
 * Created by CSS on 25-05-2016.
 */

(function() {
  angular
      .module('myApp')
      .controller('logoutController', logoutController);

  logoutController.$inject=[
    '$scope',
      '$window'
  ];

  function logoutController($scope,$window) {
    $scope.userCredentials = false;

    $scope.goToLoginScreen = function () {
      $window.location.href =  '/';
    }

  }
})();