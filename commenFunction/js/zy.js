define(function () {
    function zy_define() {};
    zy_define.prototype = {
        $:function (ele) {
            var s = ele.substr(1);
            if(ele[0] == "#"){
                return document.getElementById(s);
            }if(ele[0] == "."){
                return document.getElementsByClassName(s);
            }else{
                return document.getElementsByTagName(ele);

            }

        },
        c: function (s) {
            console.log(s);
        },
        get_pre: function (ele) {
            var element = ele.previousSibling;
            while (element.nodeType != 1) {
                var temp = element;
                element = element.previousSibling;
                if (element == null) {
                    element = temp;
                    break;
                }
            }
            return element;
        },
        get_nxt: function (ele) {
            var element = ele.nextSibling;
            while (element.nodeType != 1) {
                var temp = element;
                element = element.nextSibling;
                if (element == null) {
                    element = temp;
                    break;
                }
            }
            return element;
        },
    };
    function extend(target,source) {
        for(var s in source){
            if(!target.hasOwnProperty(s)){
                target[s] = source[s];
            }
        }
        return target;
    };
    return{
        zy_define:zy_define,
        extend:extend,
    };
    /*  var alert_zy = new zy_define();
     alert_zy.zy_alert({has_cancel:'1'});
     alert_zy.zy_handle('alert-attr');*/
});
