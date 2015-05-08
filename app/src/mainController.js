angular.module('uiKitchenSink').controller('MainController', function($scope,  $routeParams, Entries) {
    $scope.contentClasses = {};
    $scope.contentClasses.full = {
        id:"full",
        left: "col-sm-1 il-sidebar-left",
        center: "col-sm-10 col-sm-offset-1",
        right: "col-sm-1 il-sidebar-right"
    };
    $scope.contentClasses.three = {
        id:"three",
        left: "col-sm-3 il-sidebar-left",
        center: "col-sm-6 col-sm-offset-3",
        right: "col-sm-3 il-sidebar-right"
    };
    $scope.contentClasses.left = {
        id:"left",
        left: "col-sm-3 il-sidebar-left",
        center: "col-sm-8 col-sm-offset-3",
        right: "col-sm-3 il-sidebar-right"
    };
    $scope.contentClasses.right = {
        id:"right",
        left: "col-sm-1 il-sidebar-left",
        center: "col-sm-8 col-sm-offset-1",
        right: "col-sm-3 il-sidebar-right"
    };

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
});



