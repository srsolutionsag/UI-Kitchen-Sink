angular.module('uiKitchenSink').controller('CenterContentController', function($scope, Entries) {
    $scope.$on('changeSelection', function (d,categoryIndex,subCategoryIndex,tabIndex, subTabIndex) {
        $scope.setContent(categoryIndex,subCategoryIndex,tabIndex,subTabIndex);
    });

    $scope.setContent = function(categoryIndex,subCategoryIndex,tabIndex,subTabIndex){
        if(typeof $scope.categories === 'undefined'){
            $scope.categories = Entries.categories;
        }
        $scope.categorySelected = $scope.categories[categoryIndex];
        $scope.categorySelected.index = categoryIndex;
        $scope.subCategorySelected = $scope.categorySelected.subCategories[subCategoryIndex];
        $scope.subCategorySelected.index = subCategoryIndex;
        $scope.tabSelected = $scope.subCategorySelected.itemGroups[tabIndex];
        $scope.tabSelected.index = tabIndex;

        $scope.showSubTabs = true;

        if($scope.tabSelected.items.length <= 1){
            $scope.showSubTabs = false;
        }

        if($scope.tabSelected.type != "html"){
            $scope.subTabSelected = $scope.tabSelected.items[subTabIndex];
            if(!$scope.subTabSelected){
                $scope.subTabSelected = {};
                $scope.subTabSelected.title = "Empty Entry";
                $scope.subTabSelected.description = "Todo";
                $scope.subTabSelected.id = "noID";
            }else{
                $scope.subTabSelected.index = subTabIndex;
            }
        }
        console.log($scope.tabSelected);
        $scope.tabSelected.path = 'app/data/'+$scope.categorySelected.id+'/'+$scope.subCategorySelected.id+'/'+$scope.tabSelected.id;
    };
    $scope.setContent(Entries.categoryIndexSelected,Entries.subCategoryIndexSelected,Entries.tabIndexSelected,Entries.subTabIndexSelected);
});