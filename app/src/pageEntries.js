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
        $rootScope.$broadcast('changeSelection', this.categoryIndexSelected,this.subCategoryIndexSelected ,this.tabIndexSelected,this.subTabIndexSelected);
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