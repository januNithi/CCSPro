/**
 * Created by CSS on 13-06-2016.
 */

describe('#Admin Profile Controller', function () {

    beforeEach(module('myApp'));

    var $controller,dashboardService,spinnerService,window;
    var filterFilter,adminProfileService;
    var $q;
    var deferred;

    beforeEach(inject(function ($compile,_$controller_,_$rootScope_,_$window_,_adminProfileService_,_dashboardService_,_spinnerService_,_filterFilter_,_$q_,$httpBackend) {
        //$location = _$location_;
        scope = _$rootScope_.$new();

        $controller = _$controller_;

        $q = _$q_;

        spinnerService = _spinnerService_;

        dashboardService = _dashboardService_;
        
        adminProfileService = _adminProfileService_;
        
        filterFilter = _filterFilter_;        

        window = _$window_;

        deferred = $q.defer();

        window = jasmine.createSpyObj('$window', ['confirm']);

        $controller('adminProfileController', {
            $scope: scope,
            $window:window
        });

        element = angular.element('<spinner name="html5spinner" ng-cloak="">' +
            '<div class="overlay"></div>'+
            '<div class="spinner">'+
            '<div class="double-bounce1"></div>'+
            '<div class="double-bounce2"></div>'+
            '</div>'+
            '<div class="please-wait">Please Wait...</div>'+
            '</spinner>');

        $compile(element)(scope);
        $httpBackend.when("GET","/getLoggedInUser").respond("sample");
        $httpBackend.when("GET","/getUserDetails").respond({data:[{id: 1},{id: 1},{id: 1},{id: 1}],length:4});
        spyOn(adminProfileService, 'getUserDetails').and.returnValue(deferred.promise);
        spyOn(adminProfileService, 'goToAdminDashboard').and.returnValue();
        spyOn(dashboardService, 'logout').and.returnValue();
        spyOn(dashboardService, 'showError').and.returnValue();
        // spyOn(dashboardService, 'project').and.returnValue();
        // spyOn(dashboardService, 'forum').and.returnValue();

    }));

    describe('#Admin Profile', function () {
        it('getUser Details', function () {

            scope.getUserDetails();

            deferred.resolve({data:[{id: 1, STNAME: 'ABC',mode:'Admin'},{id: 1, STNAME: 'ABC',mode:'Admin'}],length:2});
            scope.$apply();


        });

        it('getUser Details', function () {

            scope.getUserDetails();

            deferred.reject({data:{error:{code:''}}});
            scope.$apply();
            // expect(dashboardService.showError).toHaveBeenCalled();


        });

        it('should return local image path from user data', function () {

            var user = {
                profilePic : '1.jpg'
            }
            var path = scope.getImageSrcProfile(user);
            expect(path).toBeDefined();

        });

        it('should return facebook image path from user data', function () {

            var user = {
                facebookImage : '1.jpg'
            }
            var path = scope.getImageSrcProfile(user);
            expect(path).toBeDefined();

        });

        it('should return google image path from user data', function () {

            var user = {
                googleImage: '1.jpg'
            }
            var path = scope.getImageSrcProfile(user);
            expect(path).toBeDefined();

        });

        it('should return default path from user data', function () {

            var user = {
                data:1
            }
            var path = scope.getImageSrcProfile(user);
            expect(path).toBeDefined();

        });

        it('Should return the image path from the src or default image', function () {

            var path = scope.getImageSrc('1.jpg');
            expect(path).toBeDefined();

            var path = scope.getImageSrc(undefined);
            expect(path).toBeDefined();

        });

        it('should return to dashboard page', function () {
            scope.goToDashboard();
            expect(adminProfileService.goToAdminDashboard).toHaveBeenCalled();

        });

        it('should return true or false based on pagination', function () {
            var value = scope.showPagination();
            expect(value).toBeDefined();

        });

        it('Should open logout screen', function () {

            window.confirm.and.returnValue(true);

            scope.onLogout();

            expect(dashboardService.logout).toHaveBeenCalled();

        });
    });
});