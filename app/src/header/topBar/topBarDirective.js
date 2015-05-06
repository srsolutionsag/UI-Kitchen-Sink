module.directive('topBar', function () {
    return {
        restrict: 'AEC',
        scope: {},
        transclude: true,
        templateUrl: 'app/src/header/topBar/topBar.tpl.html',
        replace: true,
        link: function(scope, element){ }
    };
});