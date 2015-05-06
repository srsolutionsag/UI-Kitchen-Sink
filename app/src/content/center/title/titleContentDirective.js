module.directive('titleContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            title : '@',
            description: '@'
        },
        transclude: true,
        templateUrl: 'app/src/content/center/title/titleContent.tpl.html',
        replace: true
    };
});