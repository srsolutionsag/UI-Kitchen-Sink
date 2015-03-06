module.directive('titleContent', function () {
    return {
        restrict: 'AEC',
        scope: {
            title : '@'
        },
        transclude: true,
        templateUrl: 'app/views/title/titleContent.html',
        replace: true
    };
});