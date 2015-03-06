angular.module('uiKitchenSink').controller('ContentController', function($scope, Entries) {
    $scope.categories = Entries.categories;
    console.log($scope.categories);

    $scope.onEntrySelected = function (category,SubCategory,itemGroup) {
        Entries.changeSelection(category,SubCategory,itemGroup);
    };

    $scope.$on('changeSelection', function (d,category,subCategory,itemGroup) {
        console.log(subCategory);

        $scope.categorySelected = {"index":category,"title":$scope.categories[category].title};
        $scope.subCategorySelected = {"index":subCategory,"title":$scope.categories[category].subCategories[subCategory].title};
        $scope.itemGroupSelected = "Test";

    });

    Entries.changeSelection("views","subCategory1","itemGroup1");
});