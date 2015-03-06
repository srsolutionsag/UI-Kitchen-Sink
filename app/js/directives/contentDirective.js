module.directive('content', function () {
    return {
        restrict: 'AEC', //matches either attribute or element or class name
        replace: true,
        templateUrl: "app/views/content.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    };
});