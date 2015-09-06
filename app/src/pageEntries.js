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

    this.getComponentRelations = function(component){
        var relations = {};

        if(component.relations){
            if(component.relations.isA){
                relations.isA = this.getComponentById(component.relations.isA);
            }
            if(component.relations.mustUse){
                relations.mustUse = {};
                for(var indexMust in component.relations.mustUse){
                    relations.mustUse[indexMust] = this.getComponentById(component.relations.mustUse[indexMust]);
                }
            }

            if(component.relations.mayUse){
                relations.mayUse = {};
                for(var indexMay in component.relations.mayUse){
                    relations.mayUse[indexMay] = this.getComponentById(component.relations.mayUse[indexMay]);
                }
            }
        }

        relations.children = {};
        relations.mayBeUsedBy = {};
        relations.mustBeUsedBy = {};

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
                            if(item.relations){
                                if(item.relations.isA == component.id){
                                    var child = {
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
                                        "item" : item
                                    };
                                    relations.children[item.id] = child;
                                }

                                for(var mayBeUsedByIndex in item.relations.mayUse)
                                {
                                    if(item.relations.mayUse[mayBeUsedByIndex] == component.id){
                                        var mayBeUsedBy = {
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
                                            "item" : item
                                        };
                                        relations.mayBeUsedBy[item.id] = mayBeUsedBy;
                                    }
                                }
                                for(var mustBeUsedByIndex in item.relations.mustUse)
                                {
                                    if(item.relations.mustUse[mustBeUsedByIndex] == component.id){
                                        var mustBeUsed = {
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
                                        };
                                        relations.mustBeUsedBy[item.id] = mustBeUsed;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if(Object.keys(relations.children).length === 0){
            relations.children =  false;
        }
        if(Object.keys(relations.mayBeUsedBy).length === 0){
            relations.mayBeUsedBy =  false;
        }
        if(Object.keys(relations.mustBeUsedBy).length === 0){
            relations.mustBeUsedBy =  false;
        }

        return relations;
    };



    this.getComponentById = function(componentId){
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
                                if(item.id == componentId){
                                    return {
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
                                        "item": item
                                    };
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
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