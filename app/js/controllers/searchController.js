angular.module('uiKitchenSink').controller('SearchController', function($scope,  $routeParams, Entries) {
    $scope.searchCategories = {};
    $scope.searchCategories.selectedElement = {};

    $scope.onSearch = function () {
        console.log($scope.searchCategories.selectedElement);
        Entries.changeSelection($scope.searchCategories.selectedElement.categoryIndex,$scope.searchCategories.selectedElement.subCategoryIndex,$scope.searchCategories.selectedElement.itemGroupIndex);
        Entries.changeSelection($scope.searchCategories.selectedElement.categoryIndex,$scope.searchCategories.selectedElement.subCategoryIndex,$scope.searchCategories.selectedElement.itemGroupIndex);
    };

    Entries.promisedData().then(function(){
        $scope.searchCategories = Entries.categories;
    });
});