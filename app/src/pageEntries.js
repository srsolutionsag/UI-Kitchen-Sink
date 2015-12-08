angular.module('uiKitchenSink').factory('Entries', function ($http,$q,$rootScope, $routeParams) {
    var self = this;
    this.loaded = false;
    //Load the data from JSON from Server
    this.jsonPath =  '/app/data/entries.json';
    this.categoryIndexSelected = 0;
    this.subCategoryIndexSelected = 0;
    this.tabIndexSelected = 0;
    this.subTabIndexSelected = 0;
    this.visibility = 'all';

    this.changeVisibility = function(visiblity){
        this.visibility = visiblity;
    };

    this.getVisibility = function(){
        return this.visibility;
    };

    this.isEntryStateVisible = function(state){
        if(!state){
            return false;
        }
        if(state == 'static'){
            return true;
        }
        if(this.visibility == 'all'){
            return true;
        }
        else if(this.visibility == 'implemented'){
            switch(state.toLowerCase()){
                case "implemented":
                case "implemented for 5.0":
                case "implemented for 5.1":
                case "implemented for 5.2":
                    return true;
                default:
                    return false;
            }
        }
        else if(this.visibility == 'accepted'){
            if(state.toLowerCase() == 'accepted by jf'){
                return true;
            }
        }
        else if(this.visibility == 'proposal'){
            if(state.toLowerCase() == 'proposal'){
                return true;
            }
        }
        else if(this.visibility == 'toRevise'){
            if(state.toLowerCase() == 'to be revised'){
                return true;
            }
        }
        return false;
    };

    this.getStateAlert = function (state) {
        if(!state){
            return "danger";
        }

        switch(state.toLowerCase()){
            case "static":
                return "default";
            case "proposal":
            case "to be revised":
            case "to be implemented":
                return "warning";
            case "proposed":
                return "info";
            case "accepted":
                return "success";
            default:
                return "danger";
        }
    };

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
                var tempComponentIsA = this.getComponentById(component.relations.isA);
                if(tempComponentIsA.item && this.isEntryStateVisible(tempComponentIsA.item.statusEntry)){
                    console.log(relations.isA);
                    relations.isA  =tempComponentIsA;
                }
            }
            if(component.relations.mustUse){
                relations.mustUse = {};
                for(var indexMust in component.relations.mustUse){
                    var tempComponentMust = this.getComponentById(component.relations.mustUse[indexMust]);
                    if(this.isEntryStateVisible(tempComponentMust.item.statusEntry)){
                        relations.mustUse[indexMust]  = tempComponentMust;
                    }
                }
            }

            if(component.relations.mayUse){
                relations.mayUse = {};
                for(var indexMay in component.relations.mayUse){
                    var tempComponentMay = this.getComponentById(component.relations.mayUse[indexMay]);
                    if(this.isEntryStateVisible(tempComponentMay.item.statusEntry)){
                        relations.mayUse[indexMay]  =tempComponentMay;
                    }
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
                            if(item.relations && this.isEntryStateVisible(item.statusEntry)){
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
                            if(item.type == 'less'){
                                for(var variableIndex in item.variables){
                                    var variable = item.variables[variableIndex];
                                    if(variable.title == componentId){
                                        variable.path = "#/content/"+category.id+"/"+subCategory.id+"/"+itemGroup.id+"/"+item.id;
                                        return variable;
                                    }
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
                                    if(item.lessVariables[variableIndex] == lessId){
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
                                            "title": item.lessVariables[variableIndex]
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

    this.getEntriesRelationsNetwork = function(type){
        var links = [];
        var nodes = [];
        this.categories.forEach(function(category){
            category.subCategories.forEach(function(subCategory){
                subCategory.itemGroups.forEach(function(itemGroup){
                    if(itemGroup.items){
                        itemGroup.items.forEach(function(item){
                            if(item.type != "html" && item.type != "less" && (type=="visualizationEntries" || type=="visualizationLessEntries")){
                                nodes.push({
                                    id: item.id,
                                    title: item.title,
                                    category: subCategory.title
                                });
                                if(item.relations && item.relations.isA && item.relations.isA.length > 0){
                                    links.push({
                                        source: {id : item.id},
                                        target: {id :item.relations.isA},
                                        relation: "isA"
                                    });
                                }
                                if(item.relations && item.relations.mustUse){
                                    for(var mustUseIndex in item.relations.mustUse){
                                        links.push({
                                            source: {id :item.id},
                                            target: {id :item.relations.mustUse[mustUseIndex]},
                                            relation: "mustUse"
                                        });
                                    }
                                }
                                if(item.relations && item.relations.mayUse){
                                    for(var mayUseIndex in item.relations.mayUse){
                                        links.push({
                                            source: {id :item.id},
                                            target: {id :item.relations.mayUse[mayUseIndex]},
                                            relation: "mayUse"
                                        });
                                    }
                                }
                                if(item.lessVariables && type=="visualizationLessEntries"){
                                    item.lessVariables.forEach(function(variable){
                                        if(variable){
                                            console.log(variable);
                                            links.push({
                                                source: {id :variable},
                                                target: {id :item.id},
                                                relation: "lessUse"
                                            });
                                        }
                                    });
                                }
                            }
                            if(item.type == "less" && (type=="visualizationLess" || type=="visualizationLessEntries")){
                                item.variables.forEach(function(variable){
                                    nodes.push({
                                        id: variable.title,
                                        title: variable.title,
                                        category: item.title
                                    });
                                    if(variable.relations){
                                        for(var relationIndex in variable.relations){
                                            if(variable.relations[relationIndex]){
                                                links.push({
                                                    source: {id :variable.title},
                                                    target: {id :variable.relations[relationIndex]},
                                                    relation: "uses"
                                                });
                                            }

                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
        return {
            "links": links,
            "nodes": nodes
        };
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