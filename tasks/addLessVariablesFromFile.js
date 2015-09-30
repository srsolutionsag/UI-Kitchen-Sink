'use strict';

module.exports = function(grunt) {
    var camelize = function(str){
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    };

    grunt.registerMultiTask('addLessVariablesFromFile', 'Read less variables form variables.less file and add them to the entries', function(){

        this.structure = grunt.file.readJSON(this.data.jsonOutputPath);
        this.finalOutput = this.structure;

        var self = this;

        this.getTreeFromVariableLess = function(){
            var Parser = require("simple-text-parser"),
                parser = new Parser();

            parser.addRule(/\/\/\s--\s(.*)/g, function(lessLine) {
                // Get the variable minus @
                var regexCategory = /\/\/\s--\s(.*)/g;
                var category = regexCategory.exec(lessLine);

                if(category){
                    return { 'category': category[1]};
                }
            });

            parser.addRule(/\/\/==\s(.*)/g, function(lessLine) {
                // Get the variable minus @
                var regexGroup = /\/\/==\s(.*)/g;
                var group = regexGroup.exec(lessLine);
                if(group){
                    return { 'group': group[1]};
                }
            });


            parser.addRule(/\/\/##\s(.*)/g, function(lessLine) {
                var regexGroupDescription = /\/\/##\s(.*)/g;
                var groupDescription = regexGroupDescription.exec(lessLine);

                if(groupDescription){
                    return { 'groupDescription': groupDescription[1]};
                }
            });

            parser.addRule(/\/\/\*\*\s(.*)/g, function(lessLine) {
                var regexVariableDescription = /\/\/\*\*\s(.*)/g;
                var variableDescription = regexVariableDescription.exec(lessLine);
                if(variableDescription){
                    return { 'variableDescription': variableDescription[1]};
                }
            });

            // Define a rule using a regular expression
            parser.addRule(/@(.*)/g, function(lessLine) {
                // Get the variable minus @
                var regexVariable = /(?:@)(.*)(?:\:)/g;
                var variable = regexVariable.exec(lessLine);

                // Get the value
                var regexValue = /(?::)(.*)(?:;)/g;
                var value = regexValue.exec(lessLine)[1].trim();

                // Get the value
                var tempValue = value;
                var references = [];
                var reference = false;
                do{
                    var regexReference = /(?:@)([a-zA-Z_-]*)/g;
                    var reference = regexReference.exec(tempValue);
                    if(reference){
                        tempValue = tempValue.replace(reference[0],'');
                        references.push(reference[1]);
                    }

                }while(reference);

                if(!variable){
                    grunt.log.error('@ without defined variable: '+lessLine);
                }

                if(!value){
                    grunt.log.error('Variable '+variable[1]+"is missing a value");
                }

                return { 'variable': variable[1], 'value': value, 'relations': references};
            });
            return parser.toTree(grunt.file.read(this.data.lessVariablesPath).toString());
        };

        var tempLessVariables = this.getTreeFromVariableLess();

        var lessVariables = [];
        var currentCategoryIndex = false;
        var currentGroupIndex = false;
        var currentVariableIndex = false;

        tempLessVariables.forEach(function(item){
            if(item.category){
                currentCategoryIndex = lessVariables.length;
                lessVariables[currentCategoryIndex] = {
                    "id": camelize("less"+item.category+"VariablesCategory"),
                    "title":item.category+" Variables",
                    "items": []
                };
            }
            if(item.group && currentCategoryIndex !== false){
                currentGroupIndex = lessVariables[currentCategoryIndex].items.length;
                lessVariables[currentCategoryIndex].items[currentGroupIndex] = {
                    "id": camelize("less"+item.group+"VariablesGroup"),
                    "title":item.group,
                    "description": "Description missing",
                    "type": "less",
                    "state": "static",
                    "variables": []
                };
            }else if(item.group){
                grunt.log.error('Group '+item.group+' is defined before a category. Please define your category (marker: // -- Category Title) first.');

            }

            if(item.groupDescription && currentGroupIndex !== false && currentCategoryIndex !== false){
                lessVariables[currentCategoryIndex].items[currentGroupIndex].description = item.groupDescription;
            }else if(item.groupDescription){
                grunt.log.error('Group description '+item.groupDescription+' is defined before a group. Please define your group (marker: //==  Group Title) first.');

            }

            if(item.variableDescription && currentGroupIndex !== false && currentCategoryIndex !== false){
                currentVariableIndex = lessVariables[currentCategoryIndex].items[currentGroupIndex].variables.length;
                lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex] = {
                    "description": item.variableDescription
                };
            }else if(item.variableDescription){
                grunt.log.error('Variable Description '+item.groupDescription+' is defined before a group. Please define your group (marker: //==  Group Title) first.');
            }

            if(item.variable && currentVariableIndex ===false){
                currentVariableIndex = lessVariables[currentCategoryIndex].items[currentGroupIndex].variables.length;
                lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex] = {};

                //grunt.log.error('Variable '+item.variable+' is defined before a description. Please describe your variable (marker: //**  Description) first.');
            }
            if(item.variable && currentGroupIndex !== false && currentCategoryIndex !== false && currentVariableIndex !== false){
                lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex].title = item.variable;
                lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex].state = "implemented";
                if(item.value){
                    lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex].value = item.value;
                }else{
                    grunt.log.error('Variable '+item.variable+' has no valid value assigned.');

                }
                if(item.relations){
                    lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex].relations = item.relations;
                }
                currentVariableIndex = false;
            }


        });

        lessVariables.forEach(function(variable){
            var existingLessEntries = self.finalOutput.categories[self.data.jsonVariablesIndex.first].subCategories[self.data.jsonVariablesIndex.second].itemGroups.length;
            self.finalOutput.categories[self.data.jsonVariablesIndex.first].subCategories[self.data.jsonVariablesIndex.second].itemGroups[existingLessEntries] = variable;
        });

        grunt.file.write(this.data.jsonOutputPath, JSON.stringify(this.finalOutput, null, 2));
    });
};