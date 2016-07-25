
describe('Main Controller', function () {
    /*jshint expr:true */
  beforeEach(module('myApp'));

  var $controller,starServices,documentListServices,departmentServices;
    var $q;
    var deferred;


  // beforeEach(inject(function(_$controller_){
  //
  //       $controller = _$controller_;
  //
  // }));
    beforeEach(inject(function(_$controller_,_$rootScope_,_$q_,_starServices_,_departmentServices_,_documentListServices_,$httpBackend) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        deferred = _$q_.defer();
        $controller = _$controller_;
        starServices= _starServices_;
        documentListServices=_documentListServices_;
        departmentServices=_departmentServices_;

        $controller('documentListController', {
            $scope: $scope
        });
        spyOn(starServices, 'getStarInfo').and.returnValue(deferred.promise);
        spyOn(departmentServices, 'getDepartment').and.returnValue(deferred.promise);
        spyOn(documentListServices, 'search').and.returnValue(deferred.promise);
        spyOn(documentListServices, 'delete').and.returnValue(deferred.promise);

        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        $httpBackend.when("GET","/api/search?docType=-1&dep=-1&page=undefined&serStr=").respond("sample");
        $httpBackend.when("GET","/api/dep").respond("sample");

    }));

    describe('main Controller', function () {
        it('check getDepartments', function () {
          var $scope = {};
          var controller = $controller('documentListController', { $scope: $scope });

          getDepartment();
          expect($scope.dep).not.toBeNull();
        });

        describe('get department',function(){

            it('should resolve promise', function () {

                getDepartment();
                deferred.resolve({data:[{id:1,DEP_NAME:'ABC'},{id:2,DEP_NAME:'xds'}]});
                expect($scope.dep).toBeObject;
                $scope.$digest();
            });
            it('should resolve promise',function () {
                getDepartment();
                deferred.reject();
                expect($scope.dep).toBeArray;
                $scope.$digest();
            });
        });

        describe('search data',function(){

            it('should resolve promise', function () {

                $scope.searchData ();
                deferred.resolve({data:[{id:1,DOCCAPTION:'ABC'},{id:2,DOCCAPTION:'xds'}]});
                expect($scope.dep).toBeObject;
                $scope.$digest();
            });
            it('should resolve promise', function () {

                $scope.searchData ();
                deferred.resolve({data:[{id:1,DOCCAPTION:'ABC'},{id:2,DOCCAPTION:'xds'}]});
                expect($scope.dep).toBeObject;
                $scope.$digest();
            });

            it('should resolve promise', function () {

                $scope.searchData ();
                deferred.resolve({data:[]});
                expect($scope.noData).toBeTruthy;
                $scope.$digest();
            });
            it('should resolve promise',function () {
                $scope.searchData ();
                deferred.reject();
                expect($scope.dep).toBeArray;
                $scope.$digest();
            });
        });

        // describe('edit data',function(){
        //
        //
        //     it('should resolve promise', function () {
        //         $scope.docs=[{ID:100,DOCCAPTION:'TESTCAP1',DOCDEP:1},
        //             {ID:101,DOCCAPTION:'TESTCAP2',DOCDEP:1},
        //             {ID:102,DOCCAPTION:'TESTCAP3',DOCDEP:1}];
        //
        //         $scope.editDoc(1);
        //         deferred.resolve({data:[{id:1,DOCCAPTION:'ABC'},{id:2,DOCCAPTION:'xds'}]});
        //         expect($scope.dep).toBeObject;
        //         $scope.$digest();
        //     });
        //     it('should resolve promise',function () {
        //         $scope.docs=[{ID:100,DOCCAPTION:'TESTCAP1',DOCDEP:1},
        //             {ID:101,DOCCAPTION:'TESTCAP2',DOCDEP:1},
        //             {ID:102,DOCCAPTION:'TESTCAP3',DOCDEP:1}];
        //
        //         $scope.editDoc (1);
        //         deferred.reject();
        //         expect($scope.dep).toBeArray;
        //         $scope.$digest();
        //     });
        // });

        describe('delete data',function(){


            it('should resolve promise', function () {

                $scope.deleteDoc (1);
                deferred.resolve({data:[{id:1,DOCCAPTION:'ABC'},{id:2,DOCCAPTION:'xds'}]});
                expect($scope.dep).toBeObject;
                $scope.$digest();
            });
            it('should resolve promise',function () {

                $scope.deleteDoc  (1);
                deferred.reject();
                expect($scope.dep).toBeArray;
                $scope.$digest();
            });
        });

        describe("Rating info function",function () {
          it('check rating info with integer value', function () {
              var $scope = {};
              var id=508;
              var controller = $controller('documentListController', { $scope: $scope });

              $scope.getRateInfo(id);
              expect($scope.rateInfo).not.toBeNull();
          });

          it('check rating info with null string', function () {
              var $scope = {};
              var id='';
              var controller = $controller('documentListController', { $scope: $scope });

              var res=$scope.getRateInfo(id);
              expect(res).toBe(false);
          });

          it('check rating info with null value', function () {
              var $scope = {};
              var id=null;
              var controller = $controller('documentListController', { $scope: $scope });

              var res=$scope.getRateInfo(id);
              expect(res).toBe(false);
          });
          it('check rating info with string value', function () {
              var $scope = {};
              var id='abc';
              var controller = $controller('documentListController', { $scope: $scope });

              var res=$scope.getRateInfo(id);
              expect(res).toBe(false);
          });

        });

        describe('get Rating info',function(){

            it('should resolve promise', function () {

                $scope.getRateInfo(5);
                deferred.resolve({id:20});
                expect($scope.rateInfo).toBeObject;
                $scope.$digest();
            });
            it('should resolve promise',function () {
                $scope.getRateInfo(5);
                deferred.reject();
                expect($scope.rateInfo).toBeArray;
                $scope.$digest();
            });
        });

        describe('paginate',function(){

            it('should resolve promise', function () {
                $scope.curPage=1;
                $scope.itemsPage=5;
                var res=$scope.paginate({docCaption:'caption1',id:2},{docCaption:'caption2',id:2});
                expect(res).not.toBeNull;

            });

        });

    describe("Oreder Function",function () {
        it('check order with field value', function () {
            var $scope = {};
            var field='docCaption';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            expect($scope.isReverse).toBeTruthy();
        });

        it('check order with field value', function () {
            var $scope = {};
            var field='DOCDEP';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            expect($scope.isReverse).not.toBeTruthy();

            $scope.orderMe(field);
            expect($scope.isReverse).toBeTruthy();
        });

        it('check order with field value', function () {
            var $scope = {};
            var field='';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            expect($scope.isReverse).toMatch('false');

        });

        it('check order with field value', function () {
            var $scope = {};
            var field=null;
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            expect($scope.isReverse).toMatch('false');

        });

        it('check order with field value', function () {
            var $scope = {};
            var field='';
            var controller = $controller('documentListController', { $scope: $scope });
            $scope.orderMe(field);
            expect($scope.rateInfo).not.toBeNull();
        });



    });

    

        describe("get icon function",function () {
        it('check get Icon function', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
             $result=$scope.getIcon(1);
             expect($result).toMatch('images/documents/pdf.png');



        });

        it('check get Icon function with null', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
            $result=$scope.getIcon(null);
            expect($result).not.toBeTruthy();
        });

        it('check get Icon function with null', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
            $result=$scope.getIcon('');
            expect($result).not.toBeTruthy();
        });

        it('check get Icon function with null', function () {
            var $scope = {};
            var controller = $controller('documentListController', { $scope: $scope });
            $result=$scope.getIcon('abc');
            expect($result).not.toBeTruthy();
        });


});

        describe("logout function",function () {

            var documentListService,scope;
            beforeEach(inject(function ($rootScope, $controller, _documentListServices_) {
                scope = $rootScope.$new();
                documentListService = _documentListServices_;
                $controller('documentListController', {
                    $scope: scope,
                });
            }));

            // it.skip("should receive a successful response", function() {
            //
            //     spyOn(documentListService, "logout");
            //     scope.onLogout();
            //     expect(documentListService.logout).toHaveBeenCalled();  //Verifies this was called
            // });
        });

        describe("goto dashbord function",function () {

            var documentListService,scope;
            beforeEach(inject(function ($rootScope, $controller, _documentListServices_) {
                scope = $rootScope.$new();
                documentListService = _documentListServices_;
                $controller('documentListController', {
                    $scope: scope,
                });
            }));

            it("should receive a successful response", function() {

                spyOn(documentListService, "goToDashboard");
                scope.goToDashboard();
                expect(documentListService.goToDashboard).toHaveBeenCalled();  //Verifies this was calle
            });
        });

        describe("delete doc function",function () {

            var documentListService,scope;

            beforeEach(inject(function ($rootScope, $controller, _documentListServices_,$q,$httpBackend) {
                myHttpBackend = $httpBackend;
                scope = $rootScope.$new();
                documentListService = _documentListServices_;

                $controller('documentListController', {
                    $scope: scope,
                });
                deferred = $q.defer();
                spyPromise = deferred.promise;
                documentListService = jasmine.createSpyObj('documentListService',['delete']);
                documentListService.delete.and.returnValue(spyPromise);

                spyPromise.success = function (fn) {
                    spyPromise.then( function (data) {
                        fn(data);
                    });
                    return spyPromise;
                };

                spyPromise.error = function (fn) {
                    spyPromise.then( undefined, function (status) {
                        fn(status);
                    });
                    return spyPromise;
                };
            }));



        });




    });



});



// describe('get department',function(){
//     var $scope;
//     var $q;
//     var deferred,starServices;
//
//     beforeEach(module('myApp'));
//
//     beforeEach(inject(function($controller, _$rootScope_, _$q_, _starServices_) {
//         $q = _$q_;
//         $scope = _$rootScope_.$new();
//         deferred = _$q_.defer();
//         starServices= _starServices_;
//
//         $controller('documentListController', {
//             $scope: $scope
//
//         });
//         spyOn(starServices, 'getStarInfo').and.returnValue(deferred.promise);
//     }));
//     it('should resolve promise', inject(function ($httpBackend) {
//         $scope.getRateInfo(5);
//         deferred.resolve();
//         $scope.$digest();
//     }));
//     it('should resolve promise', inject(function ($httpBackend) {
//         $scope.getRateInfo(5);
//         deferred.reject();
//         $scope.$digest();
//     }));
// })

