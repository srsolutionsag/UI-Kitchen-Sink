angular.module('uiKitchenSink').controller('HeaderController', function($scope, Entries) {
    $scope.onDropdownEntrySelected = function (categoryIndex,subCategoryIndex) {
        Entries.changeSelection(categoryIndex,subCategoryIndex,0);
    };

    $scope.$on('changeSelection', function (d,categoryIndex,subCategoryIndex,tabIndex) {
        $scope.categorySelected = {"index":categoryIndex,"title":$scope.categories[categoryIndex].title,"id":$scope.categories[categoryIndex].id};
        $scope.subCategorySelected = $scope.categories[categoryIndex].subCategories[subCategoryIndex];
        $scope.subCategorySelected.index = subCategoryIndex;
    });
    Entries.promisedData().then(function(){
        $scope.categories = Entries.categories;
        Entries.changeSelection(0,0,0);
    });
});