angular.module('uiKitchenSink').controller('MainController', function($scope,  $routeParams, Entries) {
    $scope.contentClasses = {};
    $scope.contentClasses.full = {};
    $scope.contentClasses.three = {};
    $scope.contentClasses.left = {};
    $scope.contentClasses.right = {};

    $scope.contentClasses.full.left = "col-sm-1 il-sidebar-left";
    $scope.contentClasses.full.center = "col-sm-10 col-sm-offset-1";
    $scope.contentClasses.full.right = "col-sm-1 il-sidebar-right";

    $scope.contentClasses.left.left = "col-sm-3 il-sidebar-left";
    $scope.contentClasses.left.center = "col-sm-8 col-sm-offset-3";
    $scope.contentClasses.left.right = "col-sm-1 il-sidebar-right";

    $scope.contentClasses.right.left = "col-sm-1 il-sidebar-left";
    $scope.contentClasses.right.center = "col-sm-8 col-sm-offset-1";
    $scope.contentClasses.right.right = "col-sm-3 il-sidebar-right";

    $scope.contentClasses.three.left = "col-sm-3 il-sidebar-left";
    $scope.contentClasses.three.center = "col-sm-6 col-sm-offset-3";
    $scope.contentClasses.three.right = "col-sm-3 il-sidebar-right";

    $scope.contentClasses.current = $scope.contentClasses.full;
    console.log($scope.contentClasses.current);
    $scope.onAreaSelected = function (area) {

    };

    $scope.onViewChange = function(type){
        switch(type){
            case "full":
                $scope.contentClasses.current = $scope.contentClasses.full;
                break;
            case "left":
                $scope.contentClasses.current = $scope.contentClasses.left;
                break;
            case "right":
                $scope.contentClasses.current = $scope.contentClasses.right;
                break;
            case "three":
                $scope.contentClasses.current = $scope.contentClasses.three;
                break;

        }
        console.log(type);
        console.log($scope.contentClasses.current);
    };
});