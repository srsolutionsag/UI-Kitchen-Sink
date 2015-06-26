angular.module('uiKitchenSink').factory('Entries', function ($http,$q,$rootScope) {
    var self = this;
    this.loaded = false;
    //Load the data from JSON from Server
    this.jsonPath =  '/app/data/entries.json';
    this.categoryIndexSelected = 0;
    this.subCategoryIndexSelected = 0;
    this.tabIndexSelected = 0;
    this.subTabIndexSelected = 0;

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

    this.changeSelection = function (categoryIndex,subCategoryIndex,tabIndex,subTabIndex) {
        this.categoryIndexSelected = categoryIndex;
        this.subCategoryIndexSelected = subCategoryIndex;
        this.tabIndexSelected = tabIndex;
        this.subTabIndexSelected = subTabIndex;
        $rootScope.$broadcast('changeSelection', categoryIndex,subCategoryIndex,tabIndex,subTabIndex);
    };

    return this;
});