'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('addLessRelationsFromEntries', 'Read less variables form less files from the entries and add the corresponding variables to the entries', function(){

        this.structure = grunt.file.readJSON(this.data.jsonOutputPath);
        this.finalOutput = this.structure;

        this.getVariableFromLess = function(){
            var Parser = require("simple-text-parser"),
                parser = new Parser();

            // Define a rule using a regular expression
            parser.addRule(/(?!@media)@([a-zA-Z_-]*)/g, function(lessLine) {
                // Get the variable minus @
                var regexVariable = /(?!@media)@([a-zA-Z_-]*)/g;
                var variable = regexVariable.exec(lessLine);

                if(!variable){
                    grunt.log.error('@ without defined variable: '+lessLine);
                }

                if(!value){
                    grunt.log.error('Variable '+variable[1]+"is missing a value");
                }

                return { 'variable': variable[1], 'value': value[1].trim()};
            });
            return parser.toTree(grunt.file.read(this.data.lessVariablesPath).toString());
        };

        var tempLessVariables = this.getTreeFromVariableLess();

        var lessVariables = [];
        var currentCategoryIndex = false;
        var currentGroupIndex = false;
        var currentVariableIndex = false;

        for(var index in tempLessVariables){
            var item = tempLessVariables[index];


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

                grunt.log.error('Variable '+item.variable+' is defined before a description. Please describe your variable (marker: //**  Description) first.');
            }
            if(item.variable && currentGroupIndex !== false && currentCategoryIndex !== false && currentVariableIndex !== false){
                lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex].title = item.variable;
                lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex].state = "implemented";
                if(item.value){
                    lessVariables[currentCategoryIndex].items[currentGroupIndex].variables[currentVariableIndex].value = item.value;
                }else{
                    grunt.log.error('Variable '+item.variable+' has no valid value assigned.');

                }
                currentVariableIndex = false;
            }


        }
        for(var index in lessVariables){
            var existingLessEntries = this.finalOutput.categories[this.data.jsonVariablesIndex.first].subCategories[this.data.jsonVariablesIndex.second].itemGroups.length;
            this.finalOutput.categories[this.data.jsonVariablesIndex.first].subCategories[this.data.jsonVariablesIndex.second].itemGroups[existingLessEntries] = lessVariables[index];

        }
        grunt.file.write(this.data.jsonOutputPath, JSON.stringify(this.finalOutput, null, 2));
    });
};