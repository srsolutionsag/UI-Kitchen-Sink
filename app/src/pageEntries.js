angular.module('uiKitchenSink').factory('Entries', function ($http,$q,$rootScope, $routeParams) {
    var self = this;
    this.loaded = false;
    //Load the data from JSON from Server
    this.jsonPath =  '/app/data/entries.json';
    this.categoryIndexSelected = 0;
    this.subCategoryIndexSelected = 0;
    this.tabIndexSelected = 0;
    this.subTabIndexSelected = 0;

    this.changeSelection = function (categoryIndex,subCategoryIndex,tabIndex,subTabIndex) {
        this.categoryIndexSelected = categoryIndex;
        this.subCategoryIndexSelected = subCategoryIndex;
        this.tabIndexSelected = tabIndex;
        this.subTabIndexSelected = subTabIndex;
        $rootScope.$broadcast('changeSelection', categoryIndex,subCategoryIndex,tabIndex,subTabIndex);
    };

    this.changeSelectionThroughId = function (categoryId,subCategoryId,tabId,subTabId) {
        this.tabIndexSelected = undefined;
        this.subTabIndexSelected = undefined;

        for(var categoryIndex in this.categories){
            var category = this.categories[categoryIndex];
            if(category.id == categoryId){
                this.categoryIndexSelected = categoryIndex;
                for(var subCategoryIndex in category.subCategories){
                    var subCategory = category.subCategories[subCategoryIndex];
                    if(subCategory.id == subCategoryId){
                        this.subCategoryIndexSelected = subCategoryIndex;
                        for(var itemGroupIndex in subCategory.itemGroups){
                            var itemGroup = subCategory.itemGroups[itemGroupIndex];
                            if(itemGroup.id == tabId){
                                this.tabIndexSelected = itemGroupIndex;
                                for(var itemIndex in itemGroup.items){
                                    var item = itemGroup.items[itemIndex];
                                    if(item.id == subTabId){
                                        this.subTabIndexSelected = itemIndex;
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }

        if(this.tabIndexSelected === undefined){
            this.tabIndexSelected = 0;
        }
        if(this.subTabIndexSelected === undefined){
            this.subTabIndexSelected = 0;
        }
        $rootScope.$broadcast('changeSelection', this.categoryIndexSelected,this.subCategoryIndexSelected ,this.tabIndexSelected,this.subTabIndexSelected);
    };

    this.returnLessVariableUsages = function(lessId){
        var lessUsages = {};
        for(var categoryIndex in this.categories){
            var category = this.categories[categoryIndex];
            this.categoryIndexSelected = categoryIndex;
            for(var subCategoryIndex in category.subCategories){
                var subCategory = category.subCategories[subCategoryIndex];
                this.subCategoryIndexSelected = subCategoryIndex;
                for(var itemGroupIndex in subCategory.itemGroups){
                    var itemGroup = subCategory.itemGroups[itemGroupIndex];
                    if(itemGroup.type != 'less' && itemGroup.type != 'html'){
                        this.tabIndexSelected = itemGroupIndex;
                        for(var itemIndex in itemGroup.items){
                            var item = itemGroup.items[itemIndex];
                            if(item.type != 'less' && item.type != 'html'){
                                for(var variableIndex in item.lessVariables)
                                {
                                    var lessVariable = item.lessVariables[variableIndex];
                                    if(lessVariable.title == lessId){
                                        var lessUsage = {
                                            "category" : {
                                                "id":category.id,
                                                "title": category.title
                                            },
                                            "subCategory" : {
                                                "id":subCategory.id,
                                                "title": subCategory.title
                                            },
                                            "itemGroup" : {
                                                "id":itemGroup.id,
                                                "title": itemGroup.title
                                            },
                                            "item" : item,
                                            "variable": lessVariable
                                        };
                                        lessUsages[item.id] = lessUsage;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(Object.keys(lessUsages).length === 0){
            return false;
        }
        return lessUsages;
    };

    this.promisedData = function() {
        var defer = $q.defer();

        if(this.loaded){
            defer.resolve();
            return defer.promise;
        }

        $http.get(this.jsonPath)
            .success(function(data) {
                angular.extend(self, data);
                self.loaded=true;
                defer.resolve();
            })
            .error(function() {
                defer.reject('could not find '+self.jsonPath);
            });

        return defer.promise;
    };


    return this;
});