require(['zy.js'],function(zy) {
    'use strict';
    var zy_self = new zy.zy_define();
    var menu = function () {
        this.ulHeight = [];
        this.setArr();
        this.menuEvent('mouseenter');
        this.menuEvent('mouseleave');
    };

    menu.prototype = {
        menuEvent:function (flag) {
            var that = this;
            for(var i = 1; i< zy_self.$('.menu-item').length;i++){
                (function (i) {
                    zy_self.$('.menu-item')[i].addEventListener(flag,function () {
                        var contentEle = this.getElementsByClassName('menu-son')[0];
                        var contentUl = contentEle.getElementsByTagName('ul')[0];
                        var a = that.ulHeight[i];
                        var h;
                        if(flag == 'mouseleave'){
                            h = a;
                        }else{
                            h = 0;
                            contentUl.style.cssText = 'height:0';
                            contentEle.style.cssText = 'visibility:visible;';
                        }
                        var timer = setInterval(function () {
                            flag == 'mouseleave' ? h -=3 : h +=3;
                            if(flag == 'mouseleave'){
                                if(h > 0){
                                    contentUl.style.cssText = 'height:' + h+'px;';
                                }else{
                                    contentUl.style.height = 0;
                                    contentEle.style.visibility = 'hidden';
                                    clearInterval(timer);
                                }
                            }else{
                                if(h <= a){
                                    contentUl.style.cssText = 'height:' + h+'px;';
                                }else{
                                    contentUl.style.height = a;
                                    clearInterval(timer);
                                }
                            }
                        },1)
                    });
                })(i);
            }
        },
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
                          contentEle.style.visibility = 'hidden';
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
                    zy_self.$('.menu-item')[i].addEventListener('mouseenter',function () {
                        var contentEle = this.getElementsByClassName('menu-son')[0];
                        var contentUl = contentEle.getElementsByTagName('ul')[0];
                        var a = that.ulHeight[i];
                        var h = 0;
                        contentUl.style.cssText = 'height:0';
                        contentEle.style.cssText = 'visibility:visible;';
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