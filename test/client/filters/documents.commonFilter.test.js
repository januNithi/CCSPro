/**
 * Created by Administrator on 6/2/2016.
 */
describe('myApp', function () {
    beforeEach(function () {
        module('myApp');
    });
    it('date filter myDate', inject(function($filter) {
       expect($filter('myDate')).not.toBeNull();
    }));
    it("should return true if the input is not equal some date", inject(function ($filter) {
        expect($filter('myDate')(null)).toMatch('');
        expect($filter('myDate')('05-06-2016')).toMatch('06-05-2016');
        expect($filter('myDate')('05/06/2016')).toMatch('06-05-2016');

    }));


});
