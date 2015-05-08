angular.module('uiKitchenSink').controller('ContentController', function($scope,  $routeParams, Entries) {
    $scope.onAreaSelected = function (area) {
        //$scope.onViewChange(area);
    };

    $scope.isLeftSidebarOpen = function(){
        console.log("left");
        return $scope.contentClasses.current.id=="left"||$scope.contentClasses.current.id=="three";
    };

    $scope.isRightSidebarOpen = function(){
        return $scope.contentClasses.current.id=="left"||$scope.contentClasses.current.id=="three";
    };
});



