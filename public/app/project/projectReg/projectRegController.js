(function() {
    angular.module('myApp')
        .controller('projectRegController', projectRegController);

    projectRegController.$inject=[
        '$scope',
        '$window',
        'projectRegService',
        'DEPARTMENTS',
        'TITLE',
        'SUB_HEADS',
        'CATELOG_CODE',
        'DOMAIN'

    ];

    function projectRegController($scope,$window,projectRegService,DEPARTMENTS,TITLE,SUB_HEADS,CATELOG_CODE,DOMAIN) {

        $scope.departments = DEPARTMENTS;
        $scope.Title = TITLE;
        $scope.subHeads = SUB_HEADS;
        $scope.catlogCode = CATELOG_CODE;
        $scope.Domain = DOMAIN;

        var isEdit = true;

        var noData = true;

        $scope.cur_page = 1;

        $scope.datas = [];

        $scope.dataFilter = [];

        $scope.items_per_page = 10;

        $scope.totalLength = 0;

        $scope.max_size = Math.ceil($scope.userDetails / $scope.items_per_page);
        $scope.new = {projectCode: '',
            title: '',
            department: '',
            subHeads: '',
            software: '',
            hardware: '',
            catlogCode: '',
            domain: '',
            abstract:'',
            docFile:''
        };

        $scope.onLogout = function () {
            dashboardService.logout();
        };

        $scope.showPagination = function() {
            return noData;
        };

        // $scope.goToDashboard = function() {
        //     projectRegService.goToDashboard();
        // };

        $scope.reverse = false;

        $scope.searchText = [false,false,false,false,false,false,false];

        $scope.visible = [true,true,true,true,true,true,true];

        $scope.order = function(predicate)    {
            $scope.predicate = predicate;
            if ($scope.predicate === predicate)
                $scope.reverse = false;
        };

        $scope.order1 = function(predicate)    {

            $scope.predicate = predicate;
            if ($scope.predicate === predicate)
                $scope.reverse = true;

        };

        $scope.searchBox = function(index)    {
            $scope.searchText[index] = true;
            $scope.visible[index] = false;

        };

        $scope.search1Box = function(index)    {

            $scope.searchText[index] = false;
            $scope.visible[index] = true;
        };



        

        $scope.getAllProjects = function() {
            projectRegService.getAllProjects()

                .then(function(response) {

                    $scope.datas = response.data;

                    if ($scope.datas.length > 0) {

                        noData = false;

                        $scope.totalLength = $scope.datas.length;

                        $scope.max_size = Math.ceil($scope.totalLength / $scope.items_per_page);

                        $scope.$watch('cur_page + items_per_page', function() {

                            var begin = (($scope.cur_page - 1) * $scope.items_per_page), end = begin + $scope.items_per_page;
                            console.log(begin + ' ' + end);
                            $scope.dataFilter = $scope.datas.slice(begin, end);

                        });
                    }

                    $scope.new = {
                        projectCode: '',
                        title: '',
                        department: '',
                        subHeads: '',
                        software: '',
                        hardware: '',
                        catlogCode: '',
                        domain: '',
                        abstract:'',
                        docFile:''

                    };
                    
                })

                .catch(function(error) {
                    //Showing error message
                    $scope.status = 'Unable To Retrieve The Project Details' + error;

                });



        };

        $scope.editData = function(index)    {
            $scope.edit = {
                projectCode: $scope.datas[index].projectCode,
                title: $scope.datas[index].title,
                department: $scope.datas[index].department,
                subHeads: $scope.datas[index].subHeads,
                software: $scope.datas[index].software,
                hardware: $scope.datas[index].hardware,
                catlogCode: $scope.datas[index].catlogCode,
                domain: $scope.datas[index].domain,
                abstract:$scope.datas[index].abstract,
                docFile:$scope.datas[index].docFile,
                id:$scope.datas[index].id

            };

        };

        $scope.updateProject = function(id) {
            projectRegService.updateProject($scope.edit)

                .then(function(response) {
                    alert('The Project Updated Successfully!!!');
                    $scope.getAllProjects();
                    window.location.reload();
                })
                .catch(function(error) {
                    alert('Unable to Update The Project: ' + error);
                });
        };

        $scope.deleteProject = function(id)    {
            projectRegService.deleteProject(id)
                .then(function(data) {
                    alert('The Selected Project deleted successfully');
                    $scope.getAllProjects();
                }).
            catch(function(error) {
                alert('Unable To Delete The Project' + error);
            });
        };
        $scope.getAllProjects();
    }
})();







