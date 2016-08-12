/**
 * Created by Administrator on 05.07.2016.
 */

(function(){
    angular
        .module('myApp')
        .controller('messageController', messageController);

    messageController.$inject = [
        '$scope',
        'messageServices',
        'groupServices',
        '$filter',
        'departmentServices'
    ];

    function messageController($scope,messageServices,groupServices,$filter,departmentServices){
        //$scope.selectedContacts=[];                                                        //selected contact list
        $scope.contacts=[];                                               //contact List
        $scope.newSms= {
            smsText:'',
            selectedContacts:[],
            selectGroup:[]
        };

        $scope.numSms=1;
        $scope.contactString='';
        $scope.grpList=[];
        $scope.selectedGrp=null;
        $scope.selProject=null;
        $scope.selStud=null;
        $scope.selDep=null;
        $scope.contInfo=[];
        $scope.prDepartment=[];
        $scope.prInfo=[];

        var str='';

        $scope.getDepartment=function(){
            departmentServices.getDepartment()
                .then(function(response){
                    $scope.prDepartment=response.data;
                },function(err){

                });

        };

        $scope.getContactsBySelection=function(id){
            if($scope.selStud===null) return;
            $scope.newSms.selectedContacts.push($scope.selStud);
        };

        $scope.clearAllContacts=function(){
            $scope.newSms.selectedContacts=[];
        };


        $scope.getAllContacts=function(){
            $scope.newSms.selectedContacts=[];
            $scope.newSms.selectedContacts=$scope.contInfo.slice();
        };

        $scope.getContactsByPrId=function(){
            $scope.newSms.selectedContacts = $filter("filter")($scope.contInfo,{prId:$scope.selProject});
        };

        $scope.getContactsByPrDep=function(){

            $scope.newSms.selectedContacts=[];
            if($scope.selDep===null) return;
            var selProjects=$filter("filter")($scope.prInfo,{prDep:$scope.selDep.DEP_NAME});

            for(var i=0;i<selProjects.length;i++){

                var obj=$filter("filter")($scope.contInfo,{prId:selProjects[i].prId});
                for(var j=0;j<obj.length;j++){
                    var data=[];
                    $scope.newSms.selectedContacts.push(obj[j]);
                }

            }
            
        };

        $scope.removeContact=function(id){
            $scope.newSms.selectedContacts.splice(id,1);
            str='';
        };

        $scope.removeGroup=function(id){
            $scope.newSms.selectGroup.splice(id,1);
        };

        $scope.removeImage=function(id){
            $scope.imgFiles.splice(id,1);
        };

        $scope.calculateCharacter=function(){
            $scope.numSms=Math.ceil($scope.newSms.smsText.length/160);                         //considering 160 character in one message
        };

        $scope.sendSms=function(){

            if($scope.newSms.selectGroup.length <=0 && $scope.newSms.selectedContacts.length <=0){
                alert("please select a valid contacts");
                return;
            }

            messageServices.sendSms($scope.newSms)
                .then(function(response){
                        alert(response.data);

                },function(err){
                        alert(err)
                });
            newSms();
        };

        function getContactList(){
            messageServices.getContactList()
                .then(function(response){
                    $scope.contInfo=response.data;
                    console.log($scope.contInfo)
                },function(err){

                })
        };

        function getProjectInfo(){
            messageServices.getProjectInfo()
                .then(function(response){
                    $scope.prInfo=response.data;
                },function(err){

                })
        };

        function newSms(){
            $scope.newSms= {
                smsText:'',
                selectedContacts:[],
                selectGroup:[]
            };
        }

        function splitString() {

            $scope.newSms.selectedContacts=[];
            // str=str+$scope.contactString;
            var arrayString = str.split(',');
            for(i=0;i<arrayString.length;i++){
                $scope.newSms.selectedContacts.push(arrayString[i]);
                console.log(arrayString[i]);
            }

        };

        $scope.checkValidOnBlur=function(){
            if($scope.contactString.length===0) return;
            $scope.contactString=$scope.contactString+",";
        };

        $scope.$watch("contactString",function(oldVal,newVal){

            if($scope.contactString[$scope.contactString.length-1]===','){
                if(isNaN($scope.contactString.substr(0,$scope.contactString.length-2)) || $scope.contactString.length <=7 || $scope.contactString.length >=12){
                    alert("inavlid");
                    document.getElementById('contactId').focus();
                    $scope.contactString=$scope.contactString.substring(0,$scope.contactString.length-1);
                    return;
                }
                str=str+$scope.contactString;
                $scope.contactString='';
                splitString();
            }

        });

        $scope.selectGroup=function(){
                $scope.newSms.selectGroup.push({"grpId":$scope.selectedGrp.grpId,"grpName":$scope.selectedGrp.grpName});

        };

        function listGroup(){
            groupServices.listGroup()
                .then(function(response){
                    $scope.grpList=response.data;
                },function(err){
                    alert(err);
                });
        };

        if(document.getElementById("contactId")!==null)
        {
            document.getElementById("contactId").addEventListener("keydown", KeyCheck);  //or however you are calling your method
            function KeyCheck(event)
            {
                var KeyID = event.keyCode;
                if(KeyID===8)
                {
                    if($scope.contactString.length<=0 && $scope.newSms.selectedContacts.length >0){
                        str='';
                        $scope.newSms.selectedContacts.splice($scope.newSms.selectedContacts.length-1,1);
                        $scope.contactString=$scope.newSms.selectedContacts[$scope.newSms.selectedContacts.length-1];
                        $scope.$digest();
                    }

                }
            }
        }


        listGroup();
        getContactList();
        $scope.getDepartment();
        getProjectInfo();
    }
})();
