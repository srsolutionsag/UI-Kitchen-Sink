module.directive('centerContent', function () {
    return {
        restrict: 'AEC', //matches either attribute or element or class name
        replace: true,
        templateUrl: "app/src/content/center/centerContent.tpl.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    };
});