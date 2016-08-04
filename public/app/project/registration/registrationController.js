(function() {
    angular.module('myApp')
        .controller('registrationController', registrationController);

    registrationController.$inject = [
        '$scope',
        'registrationService',
        'dashboardService',
        'DEPARTMENTS',
        'TITLE',
        'SUB_HEADS',
        'CATELOG_CODE',
        'DOMAIN'

    ];
    function registrationController($scope,registrationService,dashboardService,DEPARTMENTS,TITLE,SUB_HEADS,CATELOG_CODE,DOMAIN) {

        $scope.departments = DEPARTMENTS;
        $scope.Title = TITLE;
        $scope.subHeads = SUB_HEADS;
        $scope.catlogCode = CATELOG_CODE;
        $scope.Domain = DOMAIN;
        $scope.displaySave = true;

        $scope.onLogout = function () {
            dashboardService.logout();
        };
        $scope.goToDashboard = function() {
            registrationService.goToDashboard();
        };


        // $scope.submit = function() {
        //     var data = {projectCode: $scope.new.projectCode,
        //         title: $scope.new.title,
        //         department: $scope.new.department,
        //         subHeads: $scope.new.subHeads,
        //         software: $scope.new.software,
        //         hardware: $scope.new.hardware,
        //         catlogCode: $scope.new.catlogCode,
        //         domain: $scope.new.domain,
        //         docFile:$scope.new.docFile,
        //         abstract:$scope.new.abstract
        //
        //     };
        //
        //
        //     registrationService.postNewProject(data)
        //         .then(function(data) {
        //             //result=data;
        //             alert('New Project Added Successfully!!!');
        //         }).
        //     catch(function(error) {
        //         alert('Unable To The Project :' + error);
        //     });
        //     $scope.new = {
        //         projectCode: '',
        //         title: '',
        //         department: '',
        //         subHeads: '',
        //         software: '',
        //         hardware: '',
        //         catlogCode: '',
        //         domain: '',
        //         docFile :'',
        //         abstract:''
        //
        //
        //     };
        //
        // };
    }
    
})();
