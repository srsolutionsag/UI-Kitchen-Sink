'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('buildEntriesJson', 'Builds the json data structure for the entries', function(){
        var self = this;

        this.deleteFolders = grunt.option('deleteFolders');
        this.structure = grunt.file.readJSON(this.data.dataDir+'/categories.json');
        this.finalOutput = this.structure;

        this.existingFoldersAsArray = grunt.file.expand(this.data.dataDir+'/**/','!'+this.data.dataDir+'/');
        this.existingFolders = {};


        this.createFolderIfNotExists = function(path){
            if(typeof this.existingFolders[path] === 'undefined'){
                grunt.log.writeln('Creating new folder: '+path);
                grunt.file.mkdir(path);
                this.existingFolders[path]  = {};
                this.existingFolders[path].stillExists = true;
            } else{
                this.existingFolders[path].stillExists = true;
            }
        };

        this.generateJsonsForDirectory = function(path){
            var existingHtmlsAsArray = grunt.file.expand(path+'/*.html');
            /**
             if(existingHtmlsAsArray.length === 0){
                    grunt.file.copy(this.data.htmlTemplatePath,path+'/example.html');
                    existingHtmlsAsArray = grunt.file.expand(path+'/*.html');
                }**/

            for(var id in existingHtmlsAsArray){
                var targetJsonPath = existingHtmlsAsArray[id].substring(0,existingHtmlsAsArray[id].length-5)+'.json';
                /**
                 if(!grunt.file.exists(targetJsonPath)){
                        grunt.log.writeln('Creating new json from template: '+targetJsonPath);
                        var templateEntry = grunt.file.readJSON(this.data.jsonTemplatePath);
                        var fileName = targetJsonPath.replace(/^.*[\\\/]/, '');
                        templateEntry.id = fileName.substring(0,fileName.length-5);
                        grunt.file.write(targetJsonPath, JSON.stringify(templateEntry,null,2));
                    }**/
            }
        };

        this.addJsonsToOutputForDirectory = function(path,categoryIndex,subCategoryIndex,itemGroupIndex){
            var templateJson = grunt.file.readJSON(this.data.jsonTemplatePath);
            var templateProperties = JSON.stringify(Object.getOwnPropertyNames (templateJson));

            var existingJsonsAsArray = grunt.file.expand(path+'*.json');
            var tempJsonObjects = [];
            for(var id in existingJsonsAsArray){
                var jsonPath = existingJsonsAsArray[id];
                var jsonObject = grunt.file.readJSON(jsonPath);
                jsonObject.fullPath = path+jsonObject.id;

                jsonObject.path = jsonObject.fullPath.substr(this.data.dataDir.length);

                if(jsonObject.order === undefined){
                    jsonObject.order = 100;
                }
                //var jsonObjectProperties = JSON.stringify(Object.getOwnPropertyNames (jsonObject));
                if(false){//jsonObjectProperties != templateProperties){
                    grunt.log.error("Warning: "+jsonPath+" has invalid properties and will not be added to: "+this.data.jsonOutputPath);
                    grunt.log.error("---> Expected: "+templateProperties);
                    grunt.log.error("---> but got:  "+jsonObjectProperties);
                } else{
                    tempJsonObjects.push(jsonObject);
                }
                tempJsonObjects.sort(function(a,b)
                    {
                        return a.order - b.order;
                    }
                );
            }
            this.finalOutput.categories[categoryIndex].subCategories[subCategoryIndex].itemGroups[itemGroupIndex].items = tempJsonObjects;
        };


        for(var objectId in this.existingFoldersAsArray){
            this.existingFolders[this.existingFoldersAsArray[objectId]] = {};
            this.existingFolders[this.existingFoldersAsArray[objectId]].stillExists = false;
        }


        this.structure.categories.forEach(function(category,categoryIndex){
            var categoryPath = self.data.dataDir+'/'+category.id+'/';
            self.createFolderIfNotExists(categoryPath);

            category.subCategories.forEach(function(subCategory,subCategoryIndex){
                var subCategoryPath = categoryPath+subCategory.id+'/';
                self.createFolderIfNotExists(subCategoryPath);

                subCategory.itemGroups.forEach(function(itemGroup,itemGroupIndex){
                    var itemGroupPath = subCategoryPath+itemGroup.id+'/';
                    self.createFolderIfNotExists(itemGroupPath);
                    if(itemGroup.type != "html"){
                        self.generateJsonsForDirectory(itemGroupPath);
                        self.addJsonsToOutputForDirectory(itemGroupPath,categoryIndex,subCategoryIndex,itemGroupIndex);
                    }
                    else{
                        var existingHtmlsAsArray = grunt.file.expand(itemGroupPath+'/*.html');
                        if(existingHtmlsAsArray.length === 0){
                            grunt.file.copy(this.data.htmlTemplatePath,itemGroupPath+'/'+itemGroup.id+'.html');
                        }

                    }
                });
            });
        });

        for(var path in this.existingFolders){
            if(!this.existingFolders[path].stillExists){
                if(grunt.option('deleteFolders')){
                    grunt.log.writeln('Deleting Folder: path'+": "+path);
                    if(grunt.file.exists(path)){
                        grunt.file.delete(path);
                    }
                } else{
                    grunt.log.error('The following folder is orphaned (is not listed in categories.json): '+path);
                    grunt.log.error("---> You can permanently delete orphaned folders by running: 'grunt buildEntries --deleteFolders=true'");
                }

            }
        }
        grunt.file.write(this.data.jsonOutputPath, JSON.stringify(this.finalOutput, null, 2));
    });
};