angular.module('uiKitchenSink').controller('SearchController', function($scope,  $routeParams, Entries,$location) {
    $scope.searchCategories = {};
    $scope.searchCategories.selectedElement = {};

    $scope.onSearch = function () {
        $location.path("/content/"+$scope.searchCategories.selectedElement.categoryId+"/"+
            $scope.searchCategories.selectedElement.subCategoryId+"/"+
            $scope.searchCategories.selectedElement.itemGroupId+"/"+
            $scope.searchCategories.selectedElement.itemId);
    };

    Entries.promisedData().then(function(){
        $scope.searchCategories = Entries.categories;
    });
});