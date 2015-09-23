module.directive('search', function ($location, Entries) {
    return {
        restrict: 'AEC',
        scope: {
        },
        replace: true,
        templateUrl: 'app/src/content/sidebars/blocks/search/search.tpl.html',
        link: function (scope, element) {
            scope.categories = Entries.categories;
            scope.selectedElement = {};

            scope.searchCategories = Entries.categories;

            scope.onSearchClicked = function(){
                if(!$.isEmptyObject(scope.selectedElement)){
                    $location.path("/content/"+scope.selectedElement.categoryId+"/"+
                        scope.selectedElement.subCategoryId+"/"+
                        scope.selectedElement.itemGroupId+"/"+
                        scope.selectedElement.itemId);
                }
            };

            scope.initSearch = function (){
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
                                if(Entries.isEntryStateVisible(item.state))
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
                        if(data.state === undefined){
                            data.state = "Empty";
                        }
                        var stateType = Entries.getStateAlert(data.state);
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
            };

            scope.$watch("categories",function(newValue,oldValue) {
                scope.initSearch();
            });
            scope.$on("visibilityChange",function() {
                console.log("test");
                scope.initSearch();
            });
        }
    };
});
