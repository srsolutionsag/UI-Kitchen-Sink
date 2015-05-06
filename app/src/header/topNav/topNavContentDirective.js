module.directive('topNavContent', function () {
    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'app/src/header/topNav/topNavContent.tpl.html',
        replace: true
    };
});