require(['zy.js'],function(zy) {
    'use strict';
    var zy_self = new zy.zy_define();
    var menu = function () {
        this.ulHeight = [];
        this.setArr();
        this.hide();
        this.show();
    };
    menu.prototype = {
        setArr:function () {
            var menu_item = zy_self.$('.menu-item');
            var len = menu_item.length;
            for(var i = 0; i< len;i++){
                var contentEle = menu_item[i].getElementsByClassName('menu-son')[0];
                var contentUl = contentEle.getElementsByTagName('ul')[0];
                this.ulHeight.push(contentUl.offsetHeight);
            }
            console.log(this.ulHeight);
        },
      hide:function () {
          var that = this;
          for(var i = 1; i< zy_self.$('.menu-item').length;i++){
              zy_self.$('.menu-item')[i].addEventListener('mouseleave',function () {
                  var contentEle = this.getElementsByClassName('menu-son')[0];
                  var contentUl = contentEle.getElementsByTagName('ul')[0];
                  var a = that.ulHeight[i];
                  var h = a;
                  var timer = setInterval(function () {
                      h -=3;
                      if(h > 0){
                          contentUl.style.cssText = 'height:' + h+'px;';
                      }else{
                          contentUl.style.height = 0;
                          contentEle.style.opacity = 0;
                          clearInterval(timer);
                      }
                  },1)
              });
          }
      },
        show:function () {
            var that = this;
            for(var i = 1; i< zy_self.$('.menu-item').length;i++){
                (function (i) {
                    zy_self.$('.menu-item')[i].addEventListener('mouseover',function () {
                        var contentEle = this.getElementsByClassName('menu-son')[0];
                        var contentUl = contentEle.getElementsByTagName('ul')[0];
                        var a = that.ulHeight[i];
                        var h = 0;
                        contentEle.style.cssText = 'opacity:1;';
                        contentUl.style.cssText = 'height:0';
                        var timer = setInterval(function () {
                            h +=3;
                            if(h <= a){
                                contentUl.style.cssText = 'height:' + h+'px;';
                            }else{
                                contentUl.style.height = a;
                                clearInterval(timer);
                            }
                        },1)
                    });
                })(i);
            }
        }
    };
    new menu();
});