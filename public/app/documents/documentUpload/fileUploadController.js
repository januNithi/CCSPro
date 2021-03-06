(function() {
    angular
        .module('myApp')
        .controller('fileUploadController', fileUploadController);

    fileUploadController.$inject = [
        '$location',
        '$scope',
        'fileUploadServices',
        'dashboardService',
        'departmentServices',
        'documentTypeServices',
        'projectRegService',
        '$window'


    ];
    function fileUploadController($location,$scope, fileUploadServices, dashboardService,departmentServices,documentTypeServices,projectRegService, $window) {

        $scope.formData = [{
            projectId:'',
            id: '',
            docCaption: '',
            docType: '',
            docDep: '',
            docKey: '',
            docDesc: '',
            docFile: ''
        }];                       //Model for bind the document information


        $scope.rows = [1, 2];     //Model for rows

        $scope.docs = {};           //Model for document object

        $scope.isErr = false;       //Model for validation
        $scope.isNull = true;       //Model for null validation
        $scope.docPattern = '';     //Model for store the pattern of ducument
        $scope.dep = [];            //Model for store the department list
        $scope.type = [];
        $scope.projects=[];

        dashboardService.checkAdmin();
        //Function for inceremeenting rows//

        $scope.addRow = function () {

            $scope.rows.push($scope.rows.length + 1);
        };

        getDocumentType=function(){
            $scope.type=documentTypeServices.getDocumentType();
        };

        //Function for removing rows//

        $scope.removeRow = function () {
            if ($scope.rows.length <= 2) return;
            $scope.rows.splice($scope.rows.length - 1, 1);
        };

        //Function for getting the pattern details//
        $scope.getPattern = function (ptrn) {
            if(ptrn==='' || ptrn===null || isNaN(ptrn)) return false;
            $scope.docPattern = $scope.type[ptrn - 1].ptrn;
        };

        //Function for submitting the form data
        $scope.saveDoc = function () {
            alert('Saved Successfully');
            document.forms.frmDoc.submit();
        };


        // $scope.singleFileUpload = function () {
        //     uploadMultipleServices.singleFileUpload();
        // };


        //Function for get the department
        getDepartment = function () {
            departmentServices.getDepartment()
                .then(function (response) {
                    $scope.dep = response.data;
                    console.log($scope.dep );
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.editForm = function () {
            fileUploadServices.getDocument(getParameterByName('id'))
                .then(function (response) {

                    $scope.formData = response.data[0];
                    $scope.getPattern(response.data[0].DOCTYPE);

                    setTimeout(function(){
                        // getDepartment();
                    },2500)

                })
                .catch(function (err) {
                    console.log(err);
                });

        };


        //Dashboard
        $scope.goToDashboard = function () {

            fileUploadServices.goToDashboard();

        };

        getParameterByName = function (params) {
            if ( $location.search().hasOwnProperty( params ) ) {
                return $location.search()[params];
            }
        };

        //Initially calling the function
        if ($location.path() === '/documents/editDoc'){


            $scope.editForm();
            $scope.getPattern($scope.formData.docType);


        }

        getAllProjects = function() {
            projectRegService.getAllProjects()
                .then(function(response) {

                    $scope.projects = response.data;
                })
                .catch(function(error) {
                    alert('error');
                });



        };


        getDocumentType();
        getDepartment();
        getAllProjects();


    }
})();