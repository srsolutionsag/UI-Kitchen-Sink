angular.module('uiKitchenSink').controller('CenterContentController', function($scope, Entries) {
    $scope.$on('changeSelection', function (d,categoryIndex,subCategoryIndex,tabIndex, subTabIndex) {
        console.log(subTabIndex);
        $scope.setContent(categoryIndex,subCategoryIndex,tabIndex,subTabIndex);
    });

    $scope.setContent = function(categoryIndex,subCategoryIndex,tabIndex,subTabIndex){
        if(typeof $scope.categories === 'undefined'){
            $scope.categories = Entries.categories;
        }
        console.log(subTabIndex);
        console.log($scope.categories);
        $scope.categorySelected = $scope.categories[categoryIndex];
        $scope.categorySelected.index = categoryIndex;
        console.log($scope.categorySelected);
        $scope.subCategorySelected = $scope.categorySelected.subCategories[subCategoryIndex];
        $scope.subCategorySelected.index = subCategoryIndex;
        $scope.tabSelected = $scope.subCategorySelected.itemGroups[tabIndex];
        $scope.tabSelected.index = tabIndex;
        if($scope.tabSelected.type != "html"){
            $scope.subTabSelected = $scope.tabSelected.items[subTabIndex];
            $scope.subTabSelected.index = subTabIndex;
        }
        $scope.tabSelected.path = 'app/data/'+$scope.categorySelected.id+'/'+$scope.subCategorySelected.id+'/'+$scope.tabSelected.id;
    };

    $scope.setContent(Entries.categoryIndexSelected,Entries.subCategoryIndexSelected,Entries.tabIndexSelected,Entries.subTabIndexSelected);
});