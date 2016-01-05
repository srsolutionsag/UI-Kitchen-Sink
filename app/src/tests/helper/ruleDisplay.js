var ruleDisplay = function(selector, report){
    this.previousBackground = $(selector).css("background-color");
    this.previousBorder = $(selector).css("border");

    this.state = "hidden";
    this.report = report;
    this.element = $(selector).length>0?$(selector):false;

    this.show = function(){
        if(this.element.length){
            if(!this.element.data('bs.popover')){
                this.element.first().popover();
            }
            this.element.first().data('bs.popover').options.title = this.report.itemTitle;
            this.element.first().data('bs.popover').options.content = this.report.message;
            this.element.first().data('bs.popover').options.palcement = "auto";
            this.element.first().popover('show');

            this.element.css("background-color","red", "!important");
            this.element.css("border","5px solid blue", "!important");
        }
        else{
            console.error("Failed rule has no valid selector!");
        }

    };

    this.hide = function(callback){
        if(this.element) {
            this.element.css("border", this.previousBorder);
            this.element.css("background-color", this.previousBackground);

            this.element.first().data('bs.popover').hide(callback);
        }else{
            callback();
        }
    };

    return this;
};