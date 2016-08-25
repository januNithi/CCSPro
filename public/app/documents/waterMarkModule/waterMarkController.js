(function(){

    angular
        .module('myApp')
        .controller('waterMarkController', waterMarkController);
    waterMarkController.$inject = [
        '$scope',
        '$http',
        '$window',
        'unRegisterService'
    ];


    function waterMarkController($scope,$http,$window,unRegisterService)
    {

        $scope.selected='';
        $scope.selectDepNames=[];
        $scope.datas=[];

        $scope.onLogout = function () {
            dashboardService.logout();
        };
        $scope.goToDashboard = function() {
            unRegisterService.goToDashboard();
        };

        $scope.data=[];

        $scope.mechanical=true;
        $scope.CAD=true;
        $scope.Electronics=true;
        $scope.Mini=true;
        $scope.IEEE=true;
        $scope.Software=true;
        $scope.hideAllDept=true;

        $scope.showMechanical=function(){
            $scope.mechanical=true;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=false;
            $scope.hideAllDept=true;
        };

        $scope.showCAD=function(){
            $scope.mechanical=false;
            $scope.CAD=true;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=false;
            $scope.hideAllDept=false;
        };

        $scope.showElectronics=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=true;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=false;
            $scope.hideAllDept=false;
        };

        $scope.showMini=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=true;
            $scope.IEEE=false;
            $scope.Software=false;
            $scope.hideAllDept=false;
        };

        $scope.showIEEE=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=true;
            $scope.Software=false;
            $scope.hideAllDept=false;
        };

        $scope.showSoftware=function(){
            $scope.mechanical=false;
            $scope.CAD=false;
            $scope.Electronics=false;
            $scope.Mini=false;
            $scope.IEEE=false;
            $scope.Software=true;
            $scope.hideAllDept=false;
        };


        $scope.showFile = function(id,file) {
alert(file);
            var thisFile;
            if(file===undefined || file===null) return;
            if (file.split('.').pop() === "doc") {
                var f = file.replace("doc", "pdf");
                thisFile = "../uploads/waterMarkpdf/" + f;
            }
            else
                thisFile="../uploads/waterMarkpdf/"+file;

            $window.open(thisFile);

        };


        $scope.getFileDoc=function(){

            unRegisterService.getFileDoc()


                .then(function(response){


                    $scope.files=response.data;
                    console.log(response.data);
                    //alert('the file was selected');

                })
                .catch(function(error){

                alert('unable to retrive a feedback');
            });
        };

       //$scope.getFileDoc();

        $scope.getDocHead=function(){

            unRegisterService.getDocHead().then(function(data){

               $scope.data=data.data;

                $scope.selected=$scope.data[0].DEP_NAME;

                $scope.selectDepName();

            });

        };
        $scope.getDocHead();

        $scope.selectDepName=function(){

            unRegisterService.DepName($scope.selected).then(function(data){

                $scope.selectDepNames=data.data;

                
                
            });
            
            
        };
        
        $scope.chooseSubHead=function(Tittledata){

            unRegisterService.tittle(Tittledata).then(function(tittleData){
                
              $scope.datas=tittleData.data;
            });
            
        };




    }

})();






