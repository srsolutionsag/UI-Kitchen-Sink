module.directive('header', function () {
    return {
        restrict: 'AEC', //matches either attribute or element or class name
        replace: true,
        templateUrl: "public/src/views/header.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    }
});