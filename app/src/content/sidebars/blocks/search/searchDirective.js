module.directive('search', function ($http) {
    return {
        restrict: 'AEC',
        scope: {
            categories:'=',
            selectedElement: '=',
            onSearch:'&'
        },
        replace: true,
        templateUrl: 'app/src/content/sidebars/blocks/search/search.tpl.html',
        link: function (scope, element) {
            scope.onSearchClicked = function(){
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
                        categoryId: category.id,
                        subCategoryId: "",
                        itemGroupId: "",
                        text: category.title,
                        type: "Category",
                        children: []
                    };
                    for(var subCategoryIndex in category.subCategories){
                        var subCategory = category.subCategories[subCategoryIndex];
                        data[categoryIndex].children.push({
                            id: subCategory.id,
                            categoryId: category.id,
                            subCategoryId: subCategory.id,
                            itemGroupId: "",
                            text: subCategory.title,
                            type: "Sub Category",
                            children: []
                        });

                        for(var itemGroupIndex in subCategory.itemGroups){
                            var itemGroup= subCategory.itemGroups[itemGroupIndex];
                            data[categoryIndex].children[subCategoryIndex].children.push({
                                id: itemGroup.id,
                                categoryId: category.id,
                                subCategoryId: subCategory.id,
                                itemGroupId: itemGroup.id,
                                text: itemGroup.title,
                                type: "",
                                children: []
                            });
                            for(var itemIndex in itemGroup.items){
                                var item= itemGroup.items[itemIndex];
                                data[categoryIndex].children[subCategoryIndex].children[itemGroupIndex].children.push({
                                    id: item.id,
                                    categoryId: category.id,
                                    subCategoryId: subCategory.id,
                                    itemGroupId: itemGroup.id,
                                    itemId: item.id,
                                    state: item.state,
                                    text: item.title,
                                    type: "",
                                    children: []
                                });
                            }
                        }
                    }
                }

                function formatResult(data,container) {
                    var html = data.text;
                    if(data.itemId !== undefined){
                        var stateType = "";
                        if(data.state === undefined){
                            data.state = "Empty";
                        }
                        switch(data.state){
                            case "Empty":
                            case "Concept":
                                stateType = "danger";
                                break;
                            case "Proposal":
                                stateType = "warning";
                                break;
                            case "Implemented":
                                stateType = "info";
                                break;
                            default:
                                stateType = "success";
                        }
                        html = "<div class='alert il-search-alert alert-"+stateType+"'>"+html+"</div>";
                    }


                    if(data && data.type){
                        return data.type + ": " +html;
                    } else{
                        return html;
                    }
                }

                function formatSelection(data,container) {
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
                    formatSelection: formatSelection,
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
