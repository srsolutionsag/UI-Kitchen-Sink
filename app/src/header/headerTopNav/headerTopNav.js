module.directive('headerTopNav', function () {
    return {
        restrict: 'AEC',
        scope: {},
        transclude: true,
        templateUrl: 'app/src/header/headerTopNav/headerTopNav.tpl.html',
        replace: false,
        link: function(scope, element){

        }
    };
});