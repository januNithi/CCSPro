/**
 * Created by CSS on 01-07-2016.
 */

(function () {
    angular
        .module('myApp')
        .directive('disableContents',disableContents);


    function disableContents() {
        return {
            compile: function(tElem, tAttrs) {
                tElem.css('color','grey');
                tElem.css('background-color','rgb(0, 0, 0, .2)');
                tElem.css('pointer-events','none');
            }
        };
    }

})();

