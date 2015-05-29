module.directive('headerBranding', function () {
    return {
        restrict: 'AEC',
        scope: {},
        transclude: true,
        templateUrl: 'app/src/header/headerBranding/headerBranding.tpl.html',
        replace: true,
        link: function(scope, element){ }
    };
});