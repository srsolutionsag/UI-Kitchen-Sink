angular.module('uiKitchenSink').controller('MainController', function($scope,  $routeParams, Entries) {
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



