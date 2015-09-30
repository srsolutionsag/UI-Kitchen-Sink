'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('addLessRelationsFromEntries', 'Read less variables form less files from the entries and add the corresponding variables to the entries', function(){

        var self = this;
        this.structure = grunt.file.readJSON(this.data.jsonOutputPath);
        this.finalOutput = this.structure;

        this.getTreeFromVariableLess = function(lessFile){
            console.log(lessFile);
            var regexReference = /(?:@)([a-zA-Z_-]*)/g;
            console.log(regexReference.exec(lessFile));
        };

        this.structure.categories.forEach(function(category,categoryIndex){
            category.subCategories.forEach(function(subCategory,subCategoryIndex){
                subCategory.itemGroups.forEach(function(itemGroup,itemGroupIndex){
                    if(itemGroup.items){
                        itemGroup.items.forEach(function(item,itemGroupIndex){
                            var path = item.fullPath+".less";
                            console.log(path);
                            if(grunt.file.exists(path)){
                                console.log(grunt.file.read(path).toString());
                                self.getTreeFromVariableLess(grunt.file.read(path).toString());
                            }
                        });
                    }
                });
            });
        });

        grunt.file.write(this.data.jsonOutputPath, JSON.stringify(this.finalOutput, null, 2));
    });
};