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

        if(!$scope.tabSelected.items || $scope.tabSelected.items.length <= 1){
            $scope.showSubTabs = false;
        }

        if($scope.tabSelected.type != "html"){
            var index = subTabIndex;
            do{
                $scope.subTabSelected = $scope.tabSelected.items[index];
                index++;
            }while($scope.subTabSelected && $scope.tabSelected.items[index] && !Entries.isEntryStateVisible($scope.subTabSelected.state));
            subTabIndex = index;

            if((!$scope.subTabSelected || !Entries.isEntryStateVisible($scope.subTabSelected.state))){
                $scope.subTabSelected = {};
                $scope.subTabSelected.title = "Empty";
                $scope.subTabSelected.description = "There is currently no entry listed in this section. Currently you display only entries with state: '"+ Entries.getVisibility()+"'.";
                $scope.subTabSelected.id = "noID";
                $scope.subTabSelected.state = "None";
            }else{
                $scope.subTabSelected.index = subTabIndex;
            }
        }
        $scope.tabSelected.path = 'app/data/'+$scope.categorySelected.id+'/'+$scope.subCategorySelected.id+'/'+$scope.tabSelected.id;
    };
    $scope.setContent(Entries.categoryIndexSelected,Entries.subCategoryIndexSelected,Entries.tabIndexSelected,Entries.subTabIndexSelected);
});