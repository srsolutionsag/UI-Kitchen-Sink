angular.module('uiKitchenSink').controller('MainController', function($scope,  $routeParams, Entries) {
    $scope.onAreaSelected = function (area) {
        console.log(area);
    };
});