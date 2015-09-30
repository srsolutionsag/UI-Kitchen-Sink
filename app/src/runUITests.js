runUITests = function(){
    var handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(function (error, dom) {
    }, { verbose: true, ignoreWhitespace: true });
    var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
    parser.parseComplete($(".il-header").html()+$(".il-content").html()+$(".il-footer").html());

    var entries = [{
        "id": "il-button",
        "rules": [
            {
                "title": "Must be Green",
                "description": "Must really be so much green!",
                "function": function(element,info){
                    console.log(element,info);
                    if($("."+info.className).css("background-color")!="rgb(112, 139, 174)"){
                        return false;
                    }
                    return true;
                }
            }
        ]
    }

    ];
    var camelize = function(str){
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    };

    var testFunction = function(element){
        if(element.type == "tag"){
            if(element.attributes && element.attributes.class){
                var className = element.attributes.class.split(" ")[0];
                entries.forEach(function(entry){
                    if(entry.id==className){
                        entry.rules.forEach(function(rule){
                            var info = {};
                            info.className = className;
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
    handler.dom.forEach(testFunction);


};
