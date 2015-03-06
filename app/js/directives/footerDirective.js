module.directive('footer', function () {
    return {
        restrict: 'AEC', //matches either attribute or element or class name
        replace: true,
        templateUrl: "app/views/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    };
});