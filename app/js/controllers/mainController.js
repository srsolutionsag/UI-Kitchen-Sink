angular.module('uiKitchenSink').controller('MainController', function($scope,  $routeParams, Entries) {
    $scope.contentClasses = {};
    $scope.contentClasses.full = {};
    $scope.contentClasses.three = {};
    $scope.contentClasses.left = {};
    $scope.contentClasses.right = {};

    $scope.contentClasses.full.left = "hide";
    $scope.contentClasses.full.center = "col-sm-12";
    $scope.contentClasses.full.right = "hide";

    $scope.contentClasses.left.left = "col-sm-4 il-sidebar-left";
    $scope.contentClasses.left.center = "col-sm-8 col-sm-offset-4";
    $scope.contentClasses.left.right = "hide";

    $scope.contentClasses.right.left = "hide";
    $scope.contentClasses.right.center = "col-sm-8";
    $scope.contentClasses.right.right = "col-sm-4 il-sidebar-right";

    $scope.contentClasses.three.left = "col-sm-3 il-sidebar-left";
    $scope.contentClasses.three.center = "col-sm-6 col-sm-offset-3";
    $scope.contentClasses.three.right = "col-sm-3 il-sidebar-right";

    $scope.contentClasses.current = $scope.contentClasses.full;

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

    };
    Entries.promisedData().then(function(){
        $scope.doRouting();
    });

    $scope.doRouting = function(){
        if(!$routeParams.categoryIndex){
            $routeParams.categoryIndex = 0;
        }
        if(!$routeParams.subCategoryIndex){
            $routeParams.subCategoryIndex = 0;
        }
        if(!$routeParams.itemGroupIndex){
            $routeParams.itemGroupIndex = 0;
        }
        Entries.changeSelection($routeParams.categoryIndex,$routeParams.subCategoryIndex,$routeParams.itemGroupIndex);
    };

    $scope.onAreaSelected = function (area) {
        console.log(area);
    };
});



