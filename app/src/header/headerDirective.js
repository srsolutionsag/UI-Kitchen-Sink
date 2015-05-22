module.directive('header', function () {
    return {
        restrict: 'AEC', //matches either attribute or element or class name
        templateUrl: "app/src/header/header.tpl.html",
        replace: true,
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    };
});