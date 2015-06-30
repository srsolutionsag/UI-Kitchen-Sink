angular.module('uiKitchenSink').controller('MainController', function($scope,  $routeParams, Entries) {
    $scope.doRouting = function(){
        Entries.changeSelectionThroughId($routeParams.categoryId,$routeParams.subCategoryId,$routeParams.itemGroupId,$routeParams.itemId);
    };
});



