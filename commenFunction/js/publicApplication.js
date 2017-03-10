/*
* 导航 搜索 返回顶部 版权位置
* */
define(function () {
    function getNeibor() {};
    getNeibor.prototype = {
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
    var menu = function () {
        this.ulHeight = [];
        this.setArr();
        this.menuEvent('mouseenter');
        this.menuEvent('mouseleave');
    };
    menu.prototype = {
        menuEvent:function (flag) {
            var that = this;
            for(var i = 1,len=document.querySelectorAll('.menu-item').length; i< len;i++){
                (function (i) {
                    document.querySelectorAll('.menu-item')[i].addEventListener(flag,function () {
                        var contentEle = this.getElementsByClassName('menu-son')[0],
                            contentUl = contentEle.getElementsByTagName('ul')[0],
                            a = that.ulHeight[i],
                            h;
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
            var menu_item = document.querySelectorAll('.menu-item');
            var len = menu_item.length;
            for(var i = 0; i< len;i++){
                var contentEle = menu_item[i].getElementsByClassName('menu-son')[0];
                var contentUl = contentEle.getElementsByTagName('ul')[0];
                this.ulHeight.push(contentUl.offsetHeight);
            }
        },
    };
    var carousel = function (){
        this.timer = null;
        this.picCarousel();
        this.hoverEvent();
        this.index = 0;
        this.p = 1;
        this.pic = document.querySelectorAll('.pic-item');
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
                for(var ele of document.querySelectorAll('.pic-item')){
                    ele.style.cssText = "opacity:0"
                }
                this.pic[this.index].style.cssText = "opacity:1";
            },3000);
        },
        hoverEvent:function () {
            var that = this;
            for(var ele of document.querySelectorAll('.pic-item')){
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
            var dot_item = document.querySelectorAll('.dot-item');
            for(var ele of dot_item){
                ele.addEventListener('mouseover',function () {
                    clearInterval(that.timer);
                    for(var ele of document.querySelectorAll('.pic-item')){
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
            var pre = document.querySelectorAll('.left')[0];
            var next = document.querySelectorAll('.right')[0];
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
                for(var ele of document.querySelectorAll('.pic-item')){
                    if(ele.style.opacity == 1){
                        flag == 1 ? preIndex = parseInt(ele.id)-1 : preIndex = parseInt(ele.id)+1;
                        preIndex == 0 ? preIndex = 5 : preIndex = preIndex;
                        preIndex == 6 ? preIndex = 1 : preIndex = preIndex;
                        for(var ele of document.querySelectorAll('.pic-item')){
                            ele.style.cssText = "opacity:0";
                        }
                        document.querySelector('#'+preIndex).style.cssText = "opacity:1";
                        break;
                    }
                }
            }
        }
    };
    var pieces = function () {
        this.ajaxData = [];
        this.ajaxData2 = [];
        // this.copyright();//设置版权位置
        this.focus();//自动对焦
        this.openIndexPage();//打开主页
        this.Intellisense();//智能填充
        this.userItemHover();
        this.gotop(50);//返回顶部
    };
    pieces.prototype = {
        openIndexPage:function () {
            var logo = document.querySelector('#logo');
            logo.onclick = function () {
                window.open('index.html');
            };
        },
        copyright:function () {
            var header_height =  document.querySelector('#header').offsetHeight;
            var wrap_height =  document.querySelector('#wrap').offsetHeight;
            var copyrightEle =  document.querySelector('#copyright');
            copyrightEle.style.top =  header_height + wrap_height+65+'px';
        },
        focus:function () {
            var searchBox = document.querySelector('#search-text');
            searchBox.addEventListener('mouseenter',function () {
                searchBox.select();
            });
        },
        Intellisense:function () {
            var inputItem = document.querySelector('#input-item');
            var oldUrl = 'http://page.vanclimg.com/autocompletehandler.ashx?callback=jqautocompletecallback&k=毛&limit=13';
            var searchBox = document.querySelector('#search-text');
            var that = this;
            searchBox.addEventListener('keyup',function () {
                userEvent();
            });
            searchBox.addEventListener('mouseup',function () {
                userEvent();
            });
            searchBox.addEventListener('mouseover',function () {
                inputItem.style.display = 'block';
                userEvent();
            });
            function userEvent() {
                var userText = searchBox.value;
                if(userText != ''){
                    searchBox.select();
                    var url = oldUrl.replace(/毛/,userText);
                    that.ajaxGet(url);
                }
            }
        },
        ajaxGet:function (url) {
            var that = this;
            var xml = null;
            if(window.XMLHttpRequest){
                xml = new XMLHttpRequest();
            }else if(window.ActiveXObject){
                xml = new ActiveXObject('Msxml2.XMLHTTP');
            }
            xml.onreadystatechange = function () {
                if(200 <= xml.status <=304 && xml.readyState == 4){
                    that.setAjaxData(xml.responseText);
                }
            };
            xml.open('GET',url,true);
            xml.send(null);
        },
        setAjaxData:function (s) {
            if(s){
                var s1=s.split('[')[1],
                    s2= s1.split(']')[0],
                    s3 = s2.split('},{'),
                    s4 = [],
                    template = '<li><a href="##">{usertext}</a><span class="g-number">约{number}条</span></li>',
                    html = [],
                    inputItem = document.querySelector('#input-item'),
                    i = 0,
                    len = this.ajaxData.length,
                    str;
                for(var str0 of s3){
                    s4.push(str0.split('"'));
                }
                for(var str2 of s4){
                    if(str2[9] == 'categoryid'){
                        str2[9] = '';
                    }
                    this.ajaxData.push(str2[3]+''+str2[9]);
                    this.ajaxData2.push(str2[6].substr(1).split(',')[0]);
                }
                html.length = 0;
                inputItem.innerHTML = '';
                for(; i<len; i++){
                    str = template.replace(/\{usertext\}/, this.ajaxData[i])
                        .replace(/\{number\}/,this.ajaxData2[i]);
                    html.push(str);
                }
                inputItem.innerHTML = html.join('');
                console.log(inputItem.innerHTML);
            }
        },
        userItemHover:function () {
            var inputItem = document.querySelector('#input-item');
            var searchBox = document.querySelector('#search-text');
            var liItem = inputItem.children;
            for(var li of liItem){
                li.addEventListener('mouseenter',function () {
                    searchBox.value = this.getElementsByTagName('a')[0].innerHTML;
                });
            }
            inputItem.addEventListener('mouseleave',function () {
                this.style.display = 'none';
            });
        },
        gotop:function (speed) {
            var topEle = document.querySelector('#to-top'),
                minH = 600,
                timer = null,
                flag = true;
            window.onscroll = function () {
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                if(scrollTop > minH){
                    speed = 0;
                    topEle.style.display = 'block';
                }
                if(scrollTop < minH){
                    topEle.style.display = 'none';
                }
                if(!flag){
                    clearInterval(timer);
                }
                flag = false;

            };
            topEle.addEventListener('click',function () {
                timer = setInterval(function () {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
                    document.documentElement.scrollTop = document.body.scrollTop -= speed;
                    speed += 150;
                    flag = true;
                    if(scrollTop <= 0){
                        clearInterval(timer);
                    }
                },50);
            });
        },
    };
    var myEvent = function(){}
     myEvent.prototype = {
        addHandler : function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },
        getEvent : function(event) {
            return event ? event : window.event;
        },
        getTarget : function(event) {
            return event.target || event.srcElement;
        },
        preventDefaultHandler : function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagationEvent : function(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },
    };
    return{
       publicFun:[
           new menu()
       ],
        getNeibor:new getNeibor(),
        carousel:carousel,
        pieces:pieces,
        myEvent:myEvent
    }
 /*   return{
        menu:menu,
        carousel:carousel,
        pieces:pieces,
        getNeibor:getNeibor
    }*/
});