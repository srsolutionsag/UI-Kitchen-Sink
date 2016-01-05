var containTextTest = function(element, rule){
    var text = element.text();
    console.log(text);

    var expression = new RegExp(rule.content);
    return expression.test(text);
};

var containTest = function(element, selector, rule){
    switch(rule.subtype){
        case "text":
            return containTextTest(element, rule);
        default:
            return containTextTest(element, rule);

    }
};
