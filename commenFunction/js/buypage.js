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
    var picShow = function () {
        this.color = "藏蓝";
        this.changeCommon();
        this.mouseEvent();
        this.addColor();
        this.windowLoad();
        this.selectColor();
        this.selectSize();
        this.selectedShow();
    };
    picShow.prototype = {
        windowLoad:function () {
            var colorDes = zy_self.$('.colorDes');
            for(var ele of colorDes){
                if(ele.innerHTML == this.color){
                    ele.parentNode.parentNode.style.cssText = 'border:1px solid  #a10000;';
                    zy_self.get_nxt(ele).className = 'active-color';
                }
            }
        },
        changeCommon:function () {
            var little_pic = zy_self.$(".left-select-pic");
            var common_pic = zy_self.$("#common-pic");
            var big_pic = zy_self.$("#big-pic");
            var index;
            for(var ele of little_pic){
                ele.addEventListener("mouseover",function () {
                    for(var elein of little_pic){
                        elein.style.cssText = "border:1px solid #B4B4B4;";
                    }
                    this.style.cssText = " border:1px solid #a10000;";
                    index = this.getAttribute("index");
                    if(index == "look-1"){
                        common_pic.getElementsByTagName('img')[0].src = "../images/common-pic-2.jpg";
                        big_pic.getElementsByTagName('img')[0].src = "../images/big-pic-2.jpg";
                    }else{
                        common_pic.getElementsByTagName('img')[0].src = "../images/common-pic.jpg";
                        big_pic.getElementsByTagName('img')[0].src = "../images/big-pic.jpg";

                    }
                    for(var elein of little_pic){
                        elein.className = "left-select-pic";
                    }
                });
            }
        },
        mouseEvent:function () {
            var small_img = zy_self.$("#common-pic");
            var mask = zy_self.$("#shadow-pic");
            var small = zy_self.$("#small");
            var big = zy_self.$("#big");
            var big_pic = zy_self.$("#big-pic");
            small_img.addEventListener("mouseout",function () {
                mask.style.display = "none";
                big_pic.style.display = "none";
            });
            small_img.addEventListener("mouseenter",function () {
                mask.style.display = "block";
                big_pic.style.display = "block";
            });
            small_img.addEventListener("mousemove",function (event) {
                var e = event || window.event;
                var offsetX = e.offsetX;//鼠标相对于当前元素左上角的偏移
                var offsetY = e.offsetY;
                var mask_top = offsetY-mask.offsetHeight/2;
                var mask_left = offsetX-mask.offsetWidth/2;

                mask_top = mask_top < 0 ? 0 : mask_top;
                mask_top = mask_top > small_img.offsetHeight-mask.offsetHeight ? small_img.offsetHeight-mask.offsetHeight : mask_top;
                mask_left = mask_left < 0 ? 0 : mask_left;
                mask_left = mask_left > small_img.offsetWidth-mask.offsetWidth ? small_img.offsetWidth-mask.offsetWidth : mask_left;

                mask.style.top = mask_top+'px';
                mask.style.left = mask_left+'px';

                var img_scaleX = big.offsetWidth/small.offsetWidth;
                var img_scaleY = big.offsetHeight/small.offsetHeight;

                var big_img_top = mask.offsetTop*img_scaleY ;
                var big_img_left = mask.offsetLeft*img_scaleX;

                big.style.top = -big_img_top+'px';
                big.style.left = -big_img_left+'px';
            });
        },
        addColor:function () {
            var ul = zy_self.$("#color").getElementsByTagName('ul')[0];
            var colorArr = ['紫底白条纹','蓝底白条纹','黑底白条纹','浅紫','黑色','复古蓝','藏蓝','浅灰','浅粉'];
            var temp = '<li index="color-{seq}"><a href="##"><div class="little-img-right"></div><p class="colorDes">{colorDes}</p><span class="canActive"></span></a></li>';
            var temp_h = null;
            var html = [];
            for(var i = 0; i< colorArr.length; i++){
                temp_h = temp.replace(/\{seq\}/,i)
                    .replace(/\{colorDes\}/,colorArr[i]);
                html.push(temp_h);
            }
            ul.innerHTML = html.join('');
            var ulChild = ul.children;
            for(var j = 0; j< ulChild.length; j++){
                ulChild[j].getElementsByClassName('little-img-right')[0].style.backgroundPosition = "0px "+j*36*(-1)+'px';
            }
        },
        selectColor:function () {
            this.selectColorSize('color');
        },
        selectSize:function () {
            this.selectColorSize('size');
        },
        selectColorSize:function (id) {
            var ul = zy_self.$('#'+id).getElementsByTagName('ul')[0];
            var ulChild = ul.children;
            for(var i = 0; i<ulChild.length; i++){
                ulChild[i].addEventListener('click',function () {
                    for(var j = 0; j<ulChild.length; j++){
                        ulChild[j].getElementsByTagName('span')[0].className = '';
                        ulChild[j].style.cssText = 'border:1px solid #B4B4B4;';
                    }
                    this.getElementsByTagName('span')[0].className = 'active-color';
                    this.style.cssText = 'border:1px solid #a10000';
                });
            }
        },
        selectedShow:function () {
            var showColorSize = zy_self.$('#show-select-item');
            var eleSelect = zy_self.$('.active-color');
            var color = zy_self.get_pre(eleSelect[0]).innerHTML;
            var size =zy_self.get_pre(eleSelect[1]).innerHTML;
            
            showColorSize.innerHTML = color+","+size;

        },
    };
    new picShow();
});
