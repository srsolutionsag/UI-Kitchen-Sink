angular.module('uiKitchenSink').controller('ContentController', function($scope, Entries) {
    $scope.$on('changeSelection', function (d,categoryIndex,subCategoryIndex,tabIndex) {
        $scope.setContent(categoryIndex,subCategoryIndex,tabIndex);
    });

    $scope.setContent = function(categoryIndex,subCategoryIndex,tabIndex){
        if(typeof $scope.categories === 'undefined'){
            $scope.categories = Entries.categories;
        }
        $scope.categorySelected = {"index":categoryIndex,"title":$scope.categories[categoryIndex].title,"id":$scope.categories[categoryIndex].id};
        $scope.subCategorySelected = $scope.categories[categoryIndex].subCategories[subCategoryIndex];
        $scope.subCategorySelected.index = subCategoryIndex;
        $scope.tabSelected = $scope.categories[categoryIndex].subCategories[subCategoryIndex].itemGroups[tabIndex];
        $scope.tabSelected.index = tabIndex;
        console.log("start3");
        $scope.tabSelected.path = 'app/data/'+$scope.categorySelected.id+'/'+$scope.subCategorySelected.id+'/'+$scope.tabSelected.id;
    };

    Entries.promisedData().then(function(){
        $scope.doRouting();
    });
});