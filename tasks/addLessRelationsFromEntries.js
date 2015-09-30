'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('addLessRelationsFromEntries', 'Read less variables form less files from the entries and add the corresponding variables to the entries', function(){

        var self = this;
        this.structure = grunt.file.readJSON(this.data.jsonOutputPath);
        this.finalOutput = this.structure;

        this.getTreeFromVariableLess = function(lessFile){
            var references = [];
            var reference = false;
            do{
                var regexReference = /(?:@)([a-zA-Z0-9_-]*)/g;
                var reference = regexReference.exec(lessFile);
                if(reference){
                    var ref = new RegExp(reference[0], 'g');
                    lessFile = lessFile.replace(ref,'');
                    references.push(reference[1]);
                }

            }while(reference);

            return references;
        };

        this.structure.categories.forEach(function(category,categoryIndex){
            category.subCategories.forEach(function(subCategory,subCategoryIndex){
                subCategory.itemGroups.forEach(function(itemGroup,itemGroupIndex){
                    if(itemGroup.items){
                        itemGroup.items.forEach(function(item,itemGroupIndex){
                            var path = item.fullPath+".less";
                            console.log(path);
                            if(grunt.file.exists(path)){
                                item.lessVariables = self.getTreeFromVariableLess(grunt.file.read(path).toString());
                            }
                        });
                    }
                });
            });
        });

        grunt.file.write(this.data.jsonOutputPath, JSON.stringify(this.finalOutput, null, 2));
    });
};