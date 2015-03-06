angular.module('uiKitchenSink').factory('Entries', function ($http,$q,$rootScope) {
    var self = this;
    //Load the data from JSON from Server
    this.jsonPath =  '/app/data/entries.json';
    this.promisedData = function() {
        var defer = $q.defer();

        $http.get(this.jsonPath)
            .success(function(data) {
                angular.extend(self, data);
                defer.resolve();
            })
            .error(function() {
                defer.reject('could not find '+self.jsonPath);
            });

        return defer.promise;
    };

    this.changeSelection = function (category,subCategory,itemGroup) {
        if(!category){

        } else{
            this.categorySelected = category;
        }

        this.subCategorySelected = subCategory;
        this.itemGroupSelected = itemGroup;
        $rootScope.$broadcast('changeSelection', category,subCategory,itemGroup);
    };

    return this;
});