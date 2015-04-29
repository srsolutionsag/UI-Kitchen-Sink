angular.module('uiKitchenSink').controller('SearchController', function($scope,  $routeParams, Entries,$location) {
    $scope.searchCategories = {};
    $scope.searchCategories.selectedElement = {};

    $scope.onSearch = function () {
        $location.path("/content/"+$scope.searchCategories.selectedElement.categoryIndex+"/"+$scope.searchCategories.selectedElement.subCategoryIndex+"/"+$scope.searchCategories.selectedElement.itemGroupIndex);
    };

    Entries.promisedData().then(function(){
        $scope.searchCategories = Entries.categories;
    });
});