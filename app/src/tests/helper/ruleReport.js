var ruleReport = function(element, itemTitle, message, passed, level){
    this.element = element;
    this.itemTitle = itemTitle;
    this.message = message;
    this.passed = passed;
    this.level = level;
    return this;
};