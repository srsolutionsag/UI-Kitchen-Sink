angular.module('uiKitchenSink').controller('HeaderController', function($scope, Entries) {
    $scope.categorySelected = {};
    $scope.categorySelected.index = -1;

    $scope.$on('changeSelection', function (d,categoryIndex,subCategoryIndex,tabIndex,subTabIndex) {
        if(typeof $scope.categories === 'undefined'){
            $scope.categories = Entries.categories;

        }
        if(categoryIndex!=-1){
            $scope.categorySelected = {"index":categoryIndex,"title":$scope.categories[categoryIndex].title,"id":$scope.categories[categoryIndex].id};
            $scope.subCategorySelected = $scope.categories[categoryIndex].subCategories[subCategoryIndex];
            $scope.subCategorySelected.index = subCategoryIndex;
        }
        else{
            $scope.categorySelected ={};
            $scope.categorySelected.index = -1;
        }
    });
});