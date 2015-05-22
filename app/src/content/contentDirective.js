module.directive('content', function ($timeout, $window) {
    return {
        restrict: 'AEC',
        scope: {
            viewMode: '@'
        },
        templateUrl: 'app/src/content/content.tpl.html',
        replace: false,

        link: function(scope, element){

        }
    };
});