angular.module('uiKitchenSink').controller('SearchController', function($scope,  $routeParams, Entries,$location) {
    $scope.searchCategories = {};
    $scope.searchCategories.selectedElement = {};

    $scope.onSearch = function () {
        console.log("onSerach");
        console.log($scope.searchCategories.selectedElement);
        $location.path("/content/"+$scope.searchCategories.selectedElement.categoryIndex+"/"+
            $scope.searchCategories.selectedElement.subCategoryIndex+"/"+
            $scope.searchCategories.selectedElement.itemGroupIndex+"/"+
            $scope.searchCategories.selectedElement.itemIndex);
    };

    Entries.promisedData().then(function(){
        $scope.searchCategories = Entries.categories;
    });
});