require(['../js/zy.js'],function(zy) {
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
        },
    };
    new menu();
    var pieces = function () {
        this.ajaxData = [];
        this.ajaxData2 = [];
        this.copyright();
        this.focus();
        this.openIndexPage();
        this.Intellisense();
        this.userItemHover();
        this.gotop(50);
    };
    pieces.prototype = {
        openIndexPage:function () {
            var logo = zy_self.$('#logo');
            logo.onclick = function () {
                window.open('index.html');
            };
        },
        copyright:function () {
            var header_height =  zy_self.$('#header').offsetHeight;
            var wrap_height =  zy_self.$('#wrap').offsetHeight;
            var copyrightEle =  zy_self.$('#copyright');
            copyrightEle.style.top =  header_height + wrap_height+65+'px';
        },
        focus:function () {
            var searchBox = zy_self.$('#search-text');
            searchBox.addEventListener('mouseenter',function () {
                searchBox.select();
            });
        },
        Intellisense:function () {
            var inputItem = zy_self.$('#input-item');
            var oldUrl = 'http://page.vanclimg.com/autocompletehandler.ashx?callback=jqautocompletecallback&k=毛&limit=13';
            var searchBox = zy_self.$('#search-text');
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
            xml.open('GET',url,true);
            xml.onreadystatechange = function () {
                if(xml.status == 200 && xml.readyState == 4){
                    that.setAjaxData(xml.responseText);
                }
            };
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
                    inputItem = zy_self.$('#input-item'),
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
            var inputItem = zy_self.$('#input-item');
            var searchBox = zy_self.$('#search-text');
            var liItem = inputItem.children;
            for(var li of liItem){
                li.addEventListener('mouseenter',function () {
                    console.log(this.getElementsByTagName('a')[0].innerHTML);
                    searchBox.value = this.getElementsByTagName('a')[0].innerHTML;
                });
            }
            inputItem.addEventListener('mouseleave',function () {
                this.style.display = 'none';
            });

        },
        gotop:function (speed) {
            var topEle = zy_self.$('#to-top'),
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
                },10);
            });
        },
    };
    new pieces();
});