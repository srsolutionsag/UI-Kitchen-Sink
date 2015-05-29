module.directive('search', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            categories:'=',
            selectedElement: '=',
            onSearch:'&'
        },
        replace: true,
        templateUrl: 'app/src/header/mainHeader/search/search.tpl.html',
        link: function (scope, element) {
            scope.onSearchClicked = function(){
                console.log(scope.onSearch);
                if(!$.isEmptyObject(scope.selectedElement)){
                    scope.onSearch();
                }
            };

            scope.$watch("categories",function(newValue,oldValue) {
                if(scope.categories == "{}"){
                    return;
                }
                var data = [];

                for(var categoryIndex in scope.categories){
                    var category = scope.categories[categoryIndex];
                    data[categoryIndex] = {
                        id: category.id,
                        categoryIndex: categoryIndex,
                        subCategoryIndex: 0,
                        itemGroupIndex: 0,
                        text: category.title,
                        type: "Category",
                        children: []
                    };
                    for(var subCategoryIndex in category.subCategories){
                        var subCategory = category.subCategories[subCategoryIndex];
                        data[categoryIndex].children.push({
                            id: subCategory.id,
                            categoryIndex: categoryIndex,
                            subCategoryIndex: subCategoryIndex,
                            itemGroupIndex: 0,
                            itemGroupId: "",
                            text: subCategory.title,
                            type: "Sub Category",
                            children: []
                        });

                        for(var itemGroupIndex in subCategory.itemGroups){
                            var itemGroup= subCategory.itemGroups[itemGroupIndex];
                            data[categoryIndex].children[subCategoryIndex].children.push({
                                id: itemGroup.id,
                                categoryIndex: categoryIndex,
                                subCategoryIndex: subCategoryIndex,
                                itemGroupIndex: itemGroupIndex,
                                text: itemGroup.title,
                                type: "",
                                children: []
                            });
                            for(var itemIndex in itemGroup.items){
                                var item= itemGroup.items[itemIndex];
                                data[categoryIndex].children[subCategoryIndex].children[itemGroupIndex].children.push({
                                    id: item.id,
                                    categoryIndex: categoryIndex,
                                    subCategoryIndex: subCategoryIndex,
                                    itemGroupIndex: itemGroupIndex,
                                    text: item.title,
                                    type: "",
                                    children: []
                                });
                            }
                        }
                    }
                }

                function formatResult(data,container) {
                    if(data && data.type){
                        return data.type + ": " +data.text;
                    } else{
                        return data.text;
                    }
                }

                var select2Element = $(".select2-append");
                select2Element.select2({
                    placeholder: "Search Kitchen-Sink",
                    allowClear: true,
                    formatSelection: formatResult,
                    formatResult: formatResult,
                    data: data

                });
                select2Element.on("change",
                    function (e) {
                        scope.selectedElement = e.added;
                        scope.$apply();
                    });
            });
        }
    };
});
