module.exports = function(grunt) {

    var host = 'localhost';
    var port = 7979;

    var dataDir = 'app/data';
    var jsonOutputPath = dataDir+'/entries.json';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //JSHint detects errors and potential problems in JavaScript code
        jshint: {
            all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js',"app/**/*.json" ]
        },

        //Starts server at 8080
        connect: {
            server: {
                options: {
                    hostname: host,
                    port: port
                }
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            default: {
                src: [
                    'index.html'
                ]
            }
        },
        // Automatically inject custom components
        includeSource: {
            options: {
                basePath: 'app',
                baseUrl: '/app/'

            },
            target: {
                files: {
                    'index.html': 'app/index.html'
                }
            }
        },
        //Automatically detect file changes and take according actions
        watch: {
            default: {
                files: [ 'Gruntfile.js', 'app/**/*.js', 'app/**/*.html',dataDir+'/**/*.json','!'+jsonOutputPath],
                tasks: [ 'jshint','includeSource', 'wiredep','buildEntriesJson'],
                options: {
                    atBegin: true,
                    debounceDelay: 550
                }
            }

        },
        //Builds the json data structure for the entries
        buildEntriesJson: {
            default: {
                dataDir: dataDir,
                htmlTemplatePath: dataDir+'/entry.template.html',
                jsonTemplatePath: dataDir+'/entry.template.json',
                jsonOutputPath: jsonOutputPath
            }
        }

    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerMultiTask('buildEntriesJson', 'Builds the json data structure for the entries', function(test){
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
            if(existingHtmlsAsArray.length === 0){
                grunt.file.copy(this.data.htmlTemplatePath,path+'/example.html');
                existingHtmlsAsArray = grunt.file.expand(path+'/*.html');
            }

            for(var id in existingHtmlsAsArray){
                var targetJsonPath = existingHtmlsAsArray[id].substring(0,existingHtmlsAsArray[id].length-5)+'.json';
                if(!grunt.file.exists(targetJsonPath)){
                    grunt.log.writeln('Creating new json from template: '+targetJsonPath);
                    var templateEntry = grunt.file.readJSON(this.data.jsonTemplatePath);
                    var fileName = targetJsonPath.replace(/^.*[\\\/]/, '');
                    templateEntry.id = fileName.substring(0,fileName.length-5);
                    grunt.file.write(targetJsonPath, JSON.stringify(templateEntry,null,2));
                }
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
                var jsonObjectProperties = JSON.stringify(Object.getOwnPropertyNames (jsonObject));
                if(jsonObjectProperties != templateProperties){
                    grunt.log.error("Warning: "+jsonPath+" has invalid properties and will not be added to: "+this.data.jsonOutputPath);
                    grunt.log.error("---> Expected: "+templateProperties);
                    grunt.log.error("---> but got:  "+jsonObjectProperties);
                } else{
                    tempJsonObjects.push(jsonObject);
                }
            }
            this.finalOutput.categories[categoryIndex].subCategories[subCategoryIndex].itemGroups[itemGroupIndex].items = tempJsonObjects;
        };


        for(var objectId in this.existingFoldersAsArray){
            this.existingFolders[this.existingFoldersAsArray[objectId]] = {};
            this.existingFolders[this.existingFoldersAsArray[objectId]].stillExists = false;
        }


        for(var categoryIndex in this.structure.categories){
            var category = this.structure.categories[categoryIndex];
            var categoryPath = this.data.dataDir+'/'+category.id+'/';
            this.createFolderIfNotExists(categoryPath);

            for(var subCategoryIndex in category.subCategories){
                var subCategory = category.subCategories[subCategoryIndex];
                var subCategoryPath = categoryPath+subCategory.id+'/';
                this.createFolderIfNotExists(subCategoryPath);

                for(var itemGroupIndex in subCategory.itemGroups){
                    var itemGroup = subCategory.itemGroups[itemGroupIndex];
                    var itemGroupPath = subCategoryPath+itemGroup.id+'/';
                    this.createFolderIfNotExists(itemGroupPath);
                    this.generateJsonsForDirectory(itemGroupPath);
                    this.addJsonsToOutputForDirectory(itemGroupPath,categoryIndex,subCategoryIndex,itemGroupIndex);
                }
            }
        }

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

    grunt.registerTask('info', 'Info about server', function(state){
        grunt.log.writeln('UI-Kitchen-Sink '+state+' at http://'+host+":"+port);
    });

    grunt.registerTask('default', ['connect:server','info:started','watch']);
    grunt.registerTask('buildEntries', ['buildEntriesJson']);


};