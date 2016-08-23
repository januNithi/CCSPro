(function() {
  angular
      .module('myApp')
      .controller('homeController', homeController);

  homeController.$inject=[
        '$location',
        '$scope',
        'homeService',
        '$window',
        'dashboardService',
        'spinnerService'
  ];

  function homeController($location,$scope,homeService,$window,dashboardService,spinnerService) {
      $scope.datas = [];
      $scope.fields = [];
      $scope.events = [];
      $scope.shedule = [];
      $scope.myDataSource={
          data:[]
      };
      $scope.images = [];
      $scope.abstractImage;
      var data=[];

      $scope.gotoChat = function() {
          spinnerService.show('html5spinner');
          homeService.chatting();
      };

    getParameterByName = function (params) {
      if ( $location.search().hasOwnProperty( params ) ) {
          return $location.search()[params];
      }
    };
    $scope.accordionGroupOptions1={
      open:true
    };
    $scope.accordionGroupOptions2={
      open:true
    };
    $scope.accordionGroupOptions3={
      open:true
    };
    $scope.accordionGroupOptions4={
      open:true
    };
    $scope.accordionGroupOptions5={
      open:true
    };
    $scope.accordionGroupOptions6={
      open:true
    };
    $scope.simpleAccordionOptions = {
      closeOthers: false
    };

    dashboardService.checkAdmin();

    $scope.onLogout = function() {
      if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
        dashboardService.logout();
      }
    };


    $scope.goToDashboard = function() {
      homeService.goToDashboard();
    };

      $scope.getAllFields=function(){
          homeService.getAllFields()  //getParameterByName('id')
              .success(function(response){
                  console.log(response[0]);
                  $scope.fields=response[0];
                  console.log($scope.fields);
                  if($scope.fields.docFile){
                      var ext=$scope.fields.docFile.split('.').pop();
                      $scope.abstractImage="/uploads/projectRegistration/"+$scope.fields.docFile;
                  }

                  if($scope.fields.synImg){
                      var ext=$scope.fields.synImg.split('.').pop();
                      $scope.synImg="/uploads/waterMark/"+$scope.fields.synImg;
                  }

                  $scope.imageData();
                  $scope.projectHistory();
                  $scope.chartData();
                  $scope.getSchedule();
              })
              .error(function(error){
                  alert('error');

              });
      };

    $scope.projectData = function(){
      homeService.projectData()
          .then(function (results) {	//Success function
            $scope.datas = results.data[0];
          }).catch(function (error) {
            console.log('Error');
          });
    };

    $scope.projectHistory = function(){
      homeService.projectHistory($scope.fields.projectCode)
          .then(function (results) {	//Success function
              data=results.data;
              for (var i = 0;i < data.length;i++) {
                if (i % 2 === 0) {	//Even badge
                  $scope.events.push({badgeClass: 'info', badgeIconClass: 'glyphicon-check', title: data[i].Date, content: data[i].History});
                }else {	//Odd badge
                  $scope.events.push({badgeClass: 'warning', badgeIconClass: 'glyphicon-credit-card', title: data[i].Date, content: data[i].History});
                }
              }
          }).catch(function (error) {
                console.log('Error');
          });
    };

    $scope.chartData = function(){
      homeService.chartData($scope.fields.projectCode)
          .then(function (results) {	//Success function
              // $scope.totalPercentage = results.data[0].per;

              $scope.myDataSource.data=results.data;
              console.log($scope.myDataSource);
          }).catch(function(error) {
            console.log('Error');
          });
    };

      $scope.getSchedule = function(){
          homeService.getSchedule($scope.fields.userid)
              .then(function (results) {	//Success function
                  // $scope.totalPercentage = results.data[0].per;

                  $scope.shedule=results.data;
                  console.log($scope.shedule);
              }).catch(function(error) {
              console.log('Error');
          });
      };

    $scope.imageData = function(){
      homeService.imageData($scope.fields.projectCode)
          .then(function (results) {
            $scope.images = results.data;
              console.log($scope.images[0].Al3Img);
          }).catch(function (error) {
            console.log('Error');
          });
    };

    $scope.postData = function() {	//Function to call on question submit
     homeService.postQuestion($scope.question)
            .then(function(results) {
              console.log('Data Inserted Successfully');
              //$window.alert('Data Inserted Successfully');
              $scope.question = '';
            }).catch(function (error) {
              console.log('Error');
            });
    };

      $scope.getDocIcon=function(fileName){

          if(fileName===undefined || fileName===null) return;
          var icon;
          var ext=fileName.split('.').pop();
          switch (ext){
              case 'pdf':
                  icon="/images/documents/32/pdf.png";
                  break;
              case 'doc':
                  icon='/images/documents/32/word.png';
                  break;
              case 'docx':
                  icon='/images/documents/32/word.png';
                  break;
              case 'zip':
                  icon='/images/documents/32/zip.png';
                  break;

          }
          
          return icon;
      };
      $scope.getAllFields();
      $scope.projectData();



  }
})();
