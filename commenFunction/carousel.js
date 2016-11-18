require(['zy.js'],function(zy){
    'use strict';
    var zy_self = new zy.zy_define();
    var carousel = function (){
        this.timer = null;
        this.picCarousel();
        this.hoverEvent();
        this.index = 0;
        this.p = 1;
        this.pic = zy_self.$('.pic-item');
        this.length = this.pic.length;
        this.dotEvent();
        this.arrowEvent();
    };
    carousel.prototype = {
        picCarousel:function () {
            this.animationInterval();
        },
        animationInterval:function () {
            this.timer = setInterval(()=> {
                this.index++;
                this.p++;
                this.index = this.index % this.length;
                for(var ele of zy_self.$('.pic-item')){
                    ele.style.cssText = "opacity:0"
                }
                this.pic[this.index].style.cssText = "opacity:1";
            },2000);
        },
        hoverEvent:function () {
            var that = this;
            for(var ele of zy_self.$('.pic-item')){
                ele.addEventListener('mouseover',function () {
                    clearInterval(that.timer);
                });
                ele.addEventListener('mouseout',function () {
                    that.animationInterval();
                })
            }

        },
        dotEvent:function () {
            var that = this;
            var dot_item = zy_self.$('.dot-item');
            for(var ele of dot_item){
                ele.addEventListener('mouseover',function () {
                    clearInterval(that.timer);
                    for(var ele of zy_self.$('.pic-item')){
                        if(ele.id == this.getAttribute('index')){
                            ele.style.cssText = "opacity:1";
                        }
                        else{
                            ele.style.cssText = "opacity:0";
                        }
                    }
                });
                ele.addEventListener('mouseout',function () {
                    that.animationInterval();
                });
            }
        },
        arrowEvent:function () {
            var that = this;
            var pre = zy_self.$('.left')[0];
            var next = zy_self.$('.right')[0];
            pre.addEventListener('click',function () {
                clearInterval(that.timer);
                detail(1);
            });
            pre.addEventListener('mouseout',function () {
                that.animationInterval();
            });
            next.addEventListener('click',function () {
                clearInterval(that.timer);
                detail(0);
            });
            next.addEventListener('mouseout',function () {
                that.animationInterval();
            });
            function detail(flag) {
                var preIndex;
                for(var ele of zy_self.$('.pic-item')){
                    if(ele.style.opacity == 1){
                        flag == 1 ? preIndex = parseInt(ele.id)-1 : preIndex = parseInt(ele.id)+1;
                        preIndex == 0 ? preIndex = 5 : preIndex = preIndex;
                        preIndex == 6 ? preIndex = 1 : preIndex = preIndex;
                        for(var ele of zy_self.$('.pic-item')){
                            ele.style.cssText = "opacity:0";
                        }
                        zy_self.$('#'+preIndex).style.cssText = "opacity:1";
                        break;
                    }
                }
            }
        }
    };
    new carousel();
});