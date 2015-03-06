angular.module('uiKitchenSink').controller('ContentController', function($scope, Entries) {
    $scope.categories = Entries.categories;


    $scope.onTabSelected = function (tabIndex) {
        Entries.changeSelection($scope.categorySelected.index,$scope.subCategorySelected.index,tabIndex);
    };
    $scope.$on('changeSelection', function (d,categoryIndex,subCategoryIndex,tabIndex) {
        $scope.categorySelected = {"index":categoryIndex,"title":$scope.categories[categoryIndex].title,"id":$scope.categories[categoryIndex].id};
        $scope.subCategorySelected = $scope.categories[categoryIndex].subCategories[subCategoryIndex];
        $scope.subCategorySelected.index = subCategoryIndex;
        $scope.tabSelected = $scope.categories[categoryIndex].subCategories[subCategoryIndex].itemGroups[tabIndex];
        $scope.tabSelected.index = tabIndex;
        $scope.tabSelected.path = 'app/data/'+$scope.categorySelected.id+'/'+$scope.subCategorySelected.id+'/'+$scope.tabSelected.id;
    });
});