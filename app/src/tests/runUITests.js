var runUITests = function(entries){

    this.entries = entries;
    var self = this;


    this.init = function(trigger){
        this.categoryIndex = -1;
        this.subCategoryIndex =-1;
        this.itemGroupIndex = -1;
        this.itemIndex = -1;
        this.ruleIndex = -1;
        this.elementIndex = -1;
        this.ruleReports = [];
        this.running = true;
        this.trigger = trigger;
        this.currentDisplay = null;
    };

    this.processClick = function(e){
        if(this.running && !this.trigger){
            if(this.currentDisplay) {
                this.currentDisplay.hide(self.checkNextRule);
            }
        }
        if(this.trigger == "click"){
            this.trigger  = false;
        }
    };

    this.checkNextRule = function(){
        console.log(this.categoryIndex, this.subCategoryIndex,this.itemGroupIndex,this.itemIndex,this.ruleIndex);
        for(var categoryIndex in entries.categories){
            if(categoryIndex >= this.categoryIndex){
                var category = entries.categories[categoryIndex];
                this.categoryIndex = categoryIndex;
                for(var subCategoryIndex in category.subCategories){
                    if(subCategoryIndex >= this.subCategoryIndex){
                        var subCategory = category.subCategories[subCategoryIndex];
                        this.subCategoryIndex = subCategoryIndex;
                        for(var itemGroupIndex in subCategory.itemGroups){
                            if(itemGroupIndex >= this.itemGroupIndex){
                                var itemGroup = subCategory.itemGroups[itemGroupIndex];
                                this.itemGroupIndex = itemGroupIndex;
                                if(itemGroup.type != 'less' && itemGroup.type != 'html'){
                                    for(var itemIndex in itemGroup.items){
                                        if(itemIndex >= this.itemIndex){
                                            this.itemIndex = itemIndex;
                                            var item = itemGroup.items[itemIndex];
                                            if(item.type != 'less' && item.type != 'html'){
                                                for(var ruleIndex in item.rules)
                                                {
                                                    if(ruleIndex >= this.ruleIndex){
                                                        this.ruleIndex = ruleIndex;
                                                        var rule = item.rules[ruleIndex];
                                                        if(rule.type){
                                                            var passed = true;
                                                            $(item.selector).each(function( elementIndex ) {
                                                                if(self.elementIndex >= elementIndex){
                                                                    switch(rule.type){
                                                                        case "contain":
                                                                            passed = containTest(this,item.selector, rule);
                                                                            break;

                                                                        default:
                                                                            console.log("Unknown Type");
                                                                    }
                                                                    var report = new ruleReport(this,item.title, rule.message, passed, rule.level);
                                                                    self.ruleReports.push(report);

                                                                    if(!report.passed){
                                                                        self.currentDisplay = new ruleDisplay(report);
                                                                        self.currentDisplay.show();
                                                                        console.log("Rule " + report + "not passed");
                                                                        self.elementIndex++;
                                                                        return false;
                                                                    }else{
                                                                        console.log("Rule " + report+ "passed");
                                                                    }
                                                                }
                                                                console.log( index + ": " + $( this ).text() );
                                                            });
                                                            this.elementIndex = -1;
                                                        }
                                                    }
                                                }
                                                this.ruleIndex = -1;
                                            }
                                        }
                                    }
                                    this.itemIndex = -1;
                                }
                            }
                        }
                        this.itemGroupIndex = -1;
                    }
                }
                this.subCategoryIndex =-1;
            }
        }

        this.running = false;
        console.log("Complete Report: "+this.ruleReports);

        return false;
    };
    
    this.run = function(trigger){
        this.init(trigger);
        this.checkNextRule();

    };

    return this;


    /**
    var handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(function (error, dom) {
    }, { verbose: true, ignoreWhitespace: true });
    var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
    parser.parseComplete($(".il-header").html()+$(".il-content").html()+$(".il-footer").html());


    var camelize = function(str){
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    };

    var testFunction = function(element){
        if(element.type == "tag"){
            if(element.attributes && element.attributes.class){
                var classNames = element.attributes.class.split(" ");
                entries.forEach(function(entry){
                    var classId= $.inArray(entry.id, classNames);
                    if(classId != -1){
                        var className = classNames[classId];
                        entry.rules.forEach(function(rule){
                            var info = {};
                            info.className = className;
                            console.log($("."+className));

                            if(!rule.function(element,info)){
                                $("."+info.className).css("background-color","red");
                                console.log(rule.title);
                                console.log(rule.description);
                                $("."+info.className).popover({
                                    "title":rule.title,
                                    "content": rule.description
                                });
                                $("."+info.className).popover('show');
                            }


                        });
                    }
                });
            }
        }
        if(element.children){
            element.children.forEach(testFunction);
        }

    };
    handler.dom.forEach(testFunction);**/


};
