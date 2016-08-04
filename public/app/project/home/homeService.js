(function() {
  angular.module('myApp')
      .factory('homeService', homeService);

  homeService.$inject=['$http','$window'];

  function homeService($http, $window) {
    return {
      chatting:function(){
        $window.location.href = '/chat/chathome';
      },
      getAllFields: function () {
        return $http.get('/getAllFields');
      },
      projectData: function () {
        return $http.get('/data');
      },
      projectHistory: function (id) {
        return $http.get('/projectHistory?id='+id);
      },
      goToDashboard: function () {
        $window.location.href = '/profile/dashboard';
      },
      chartData: function () {
        return $http.get('/chartData');
      },
      imageData: function (id) {
        return $http.get('/imageData?id=' + id);
      },
      postQuestion: function (question) {
        return $http.post('/postQuestion', [question]);
      }
    };
  }
})();