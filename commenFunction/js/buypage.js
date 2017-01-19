require.config({
    paths:{
        'jquery':'jquery-2.1.1',
    }
});
require(['../js/zy.js','jquery'],function(zy,jquery) {
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
        // this.goto(50);
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
                for(var str0 = 0; str0<s3.length; s3++){
                    s4.push(s3[str0].split('"'));
                }
                for(var str2 = 0; str0<s4.length; s4++){
                    if(s4[str2][9] == 'categoryid'){
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
              }
        },
        userItemHover:function () {
            var inputItem = zy_self.$('#input-item');
            var searchBox = zy_self.$('#search-text');
            inputItem.addEventListener('mousemove',function (e) {
                var ele = e.target || e.srcElement;
                if(ele.tagName === 'LI'){
                    searchBox.value = ele.getElementsByTagName('a')[0].innerHTML;
                }
                });

            inputItem.addEventListener('mouseleave',function () {
                this.style.display = 'none';
            });
        },
        goto:function (speed) {
            var topEle = zy_self.$('#to-top'),
                minH = 100,
                timer = null,
                flag = true;
            window.addEventListener('scroll',function () {
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                if(scrollTop > minH){
                    // speed = 0;
                    topEle.style.display = 'block';
                }
                if(scrollTop < minH){
                    topEle.style.display = 'none';
                }
                if(!flag){
                    clearInterval(timer);
                }
                flag = false;
            });
           /* window.onscroll = function () {
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

            };*/
            topEle.addEventListener('click',function () {
                timer = setInterval(function () {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
                    document.documentElement.scrollTop = document.body.scrollTop -= speed;
                    speed += 150;
                    flag = true;
                    if(scrollTop <= 0){
                        clearInterval(timer);
                    }
                },70);
            });
        },
    };
    new pieces();
    var picShow = function () {
        this.color = "藏蓝";
        this.colorSelectArea='';
        this.sizeSelectArea='';
        this.selectRightArea='';
        this.mouseEvent();
        this.addColor();
        this.selectColor();
        this.selectSize();
        this.selectedShow();
        this.changeCommon();
        this.leftHoverEvent();
        // this.carOpen();
        this.carOpenJ();
        // this.carOpnInTopJ();
    };
    picShow.prototype = {
        leftHoverEvent:function () {
            var little_pic = zy_self.$(".left-select-pic");
            for(var ele of little_pic){
                ele.onmouseover = function () {
                    for(var ele1 of little_pic){
                        ele1.className = 'left-select-pic';
                    }
                    this.className += ' red-border';
                };
            }
        },
        windowLoad:function () {
            var colorDes = zy_self.$('.colorDes');
            var colorIndex;
            var img = new Image();
            var tempList = '<li class="left-select-pic" index="look-{index}"></li>';
            var html = [];
            var len;
            var tempH;
            var left_pic_select = zy_self.$('#left-pic-select');
            var leftList;
            for(var ele of colorDes){
                if(ele.innerHTML == this.color){
                    ele.parentNode.parentNode.style.cssText = 'border:1px solid #a10000;';
                    zy_self.get_nxt(ele).className = 'active-color';
                    colorIndex = ele.parentNode.parentNode.getAttribute('index').substr(-1,1);
                    img.src = '../images/left-pic-select-'+colorIndex+'.jpg';
                    img.onload = function () {
                        len = Math.floor(img.height/68);
                        for (var i = 0; i < len; i++) {
                            tempH = tempList.replace(/\{index\}/,i);
                            html.push(tempH);
                        }
                        left_pic_select.innerHTML = html.join('');
                        html.length = 0;
                        leftList = left_pic_select.children;
                        for(var j = 0; j < len; j++){
                            leftList[j].style.cssText = 'background:url('+ img.src+') no-repeat 0 '+68*j*-1+'px';
                        }
                    };
                    break;
                }
            }
            zy_self.$('#head-color').innerHTML = this.color;
            zy_self.$('#small').src = "../images/common-pic-"+colorIndex+"-0.jpg";
            zy_self.$('#big').src = "../images/big-pic-"+colorIndex+"-0.jpg";
        },
        changeCommon:function () {
            var little_pic = zy_self.$(".left-select-pic");
            var little_pic_all = zy_self.$("#left-pic-select");
            var leftIndex;
            var colorIndex;
            little_pic_all.addEventListener("mousemove",function (e) {
                var mouseEle = e.srcElement || e.target;
                if(mouseEle.tagName === 'LI') {
                    leftIndex = mouseEle.getAttribute("index").substr(-1, 1);
                    colorIndex = zy_self.$('.active-color')[0].parentNode.parentNode.getAttribute('index').substr(-1, 1);
                    zy_self.$('#small').src = "../images/common-pic-" + colorIndex + "-" + leftIndex + ".jpg";
                    zy_self.$('#big').src = "../images/big-pic-" + colorIndex + "-" + leftIndex + ".jpg";
                }
                });
        },
        mouseEvent:function () {
            var small_img = zy_self.$("#common-pic");
            var mask = zy_self.$("#shadow-pic");
            var small = zy_self.$("#small");
            var big = zy_self.$("#big");
            var big_pic = zy_self.$("#big-pic");
            small_img.addEventListener("mouseout",function () {
                big_pic.style.display = mask.style.display = "none";
            });
            small_img.addEventListener("mouseenter",function () {
                big_pic.style.display = mask.style.display = "block";
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
            this.windowLoad();
        },
        /*
        * 通过选择颜色定位左边的小图片
        * */
        selectColor:function () {
            this.selectRightArea = zy_self.$('#right-area-select').cloneNode(true);
            this.selectColorSize('color');
            var ul = zy_self.$('#color').getElementsByTagName('ul')[0];
            var ulChild = ul.children;
            var currentIndex ;
            var tempList = '<li class="left-select-pic" index="look-{index}"></li>';
            var html = [];
            var len;
            var tempH;
            var img = new Image();
            var left_pic_select = zy_self.$('#left-pic-select');
            var leftList;
            var that = this;
            for(var i = 0; i<ulChild.length; i++){
                ulChild[i].addEventListener('click',function () {
                    zy_self.$('#common-pic').style.marginLeft = '80px';
                    currentIndex = this.getAttribute('index').substr(-1,1);
                    img.src = '../images/left-pic-select-'+currentIndex+'.jpg';
                    img.onload = function () {
                        len = Math.floor(img.height/68);
                        for (var i = 0; i < len; i++) {
                            tempH = tempList.replace(/\{index\}/,i);
                            html.push(tempH);
                        }
                        left_pic_select.innerHTML = html.join('');
                        html.length = 0;
                        leftList = left_pic_select.children;
                        for(var j = 0; j < len; j++){
                            leftList[j].style.cssText = 'background:url('+ img.src+') no-repeat 0 '+68*j*-1+'px';
                            if(len>4){
                                leftList[j].style.marginBottom = '10px';
                            }
                        }
                        if(len>5){
                            zy_self.$('.to-page')[1].style.cssText=zy_self.$('.to-page')[0].style.cssText='display:block';
                        }else{
                            left_pic_select.style.marginTop = '12px';
                            zy_self.$('.to-page')[1].style.cssText=zy_self.$('.to-page')[0].style.cssText='display:none';
                        }
                        zy_self.$('#small').src = "../images/common-pic-"+currentIndex+"-0"+".jpg";
                        zy_self.$('#big').src = "../images/big-pic-"+currentIndex+"-0"+".jpg";
                        that.changeCommon();
                        that.leftHoverEvent();
                        that.triangleButClick();
                    };
                });
            }
        },
        selectColorJ:function () {

        },
        selectColorOnly:function () {
            var that = this,
                ul = zy_self.$('#color').getElementsByTagName('ul')[0];
            ul.addEventListener(function (e) {
                var target = e.target || e.srcElement;
                if(target == 'LI'){

                }
            });

        },
        selectSize:function () {
            this.selectColorSize('size');
        },
        /*
        * 选择颜色或size将选中的一项加上红色对勾
        * */
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
        selectColorSizeJ:function (id) {
            var ul = jquery('#'+id+' ul'),
                li = ul.children('li');
            ul.delegate('li','click',function () {

                   for(var j = 0; j<li.length; j++){
                            ulChild[j].getElementsByTagName('span')[0].className = '';
                            ulChild[j].style.cssText = 'border:1px solid #B4B4B4;';
                        }
                        this.getElementsByTagName('span')[0].className = 'active-color';
                        this.style.cssText = 'border:1px solid #a10000';


            })

        },
        selectedShow:function () {
            var showColorSize = zy_self.$('#show-select-item');
            var eleSelect;
            var color;
            var size;
            var typeList;
            listenHover('color','mouseenter');
            listenHover('color','mouseleave');
            listenSelect('size');
            listenSelect('color');
            function listenHover(typeSelect,event) {
                typeList = zy_self.$('#'+typeSelect).getElementsByTagName('li');
                for (var i = typeList.length - 1; i >= 0; i--) {
                    typeList[i].addEventListener(event,function(){
                        if(event == 'mouseenter'){
                            this.style.cssText = 'border:1px solid #a10000';
                        }else if(event == 'mouseleave'){
                            this.style.cssText = 'border:1px solid #B4B4B4;';
                            zy_self.$('.active-color')[0].parentNode.parentNode.style.cssText = 'border:1px solid #a10000';
                        }
                    });
                }
            }
            function listenSelect(typeSelect){
                typeList = zy_self.$('#'+typeSelect).getElementsByTagName('li');
                for (var i = typeList.length - 1; i >= 0; i--) {
                typeList[i].addEventListener('click',function(){
                    eleSelect = zy_self.$('.active-color');
                    color = zy_self.get_pre(eleSelect[0]).innerHTML;
                    if (eleSelect.length > 1) {
                        size = zy_self.get_pre(eleSelect[1]).innerHTML;
                        zy_self.$('#head-color').innerHTML = showColorSize.innerHTML = color+"，"+size;
                    }else{
                        zy_self.$('#head-color').innerHTML = showColorSize.innerHTML = color;
                    }
                });
            }
            }
        },
        triangleButClick:function () {
            var up = zy_self.$('#last-page'),
                down = zy_self.$('#next-page'),
                left_pic_select = zy_self.$('#left-pic-select');
            mouseEvent(up,'mousedown',-310,down);
            mouseEvent(down,'mousedown',12,up);
            function mouseEvent(ele,event,margin,pro) {
                ele.addEventListener(event,function () {
                    if(ele == up){
                        this.style.borderBottomColor = '#B8B8B8';
                        pro.style.borderTopColor = '#666666';
                    }else{
                        this.style.borderTopColor = '#B8B8B8';
                        pro.style.borderBottomColor = '#666666';
                    }
                    left_pic_select.style.marginTop = margin+'px';
                });
            }
        },
        carOpen:function () {
            var car = zy_self.$('#added-car'),
                addCar = zy_self.$('#addcar'),
                closeIcon = zy_self.$('#car-close');
            addCar.addEventListener('click',function () {
                car.style.display = 'block';
            });
            closeIcon.addEventListener('click',function () {
                car.style.display = 'none';
            });
        },
        carOpenJ:function () {
            var car = jquery('#added-car'),
                addCar = jquery('#addcar'),
                closeIcon =jquery('#car-close');
            addCar.on('click',function () {
                car.css('display','block');
            });
            closeIcon.on('click',function () {
                car.css('display','none');
            });
        },
        carOpnInTop:function () {
            var rightAreaSelect = zy_self.$('#right-area-select'),
                rightClone= rightAreaSelect.cloneNode(true),
                middlePic = '<div id="big-shopingCar"></div>',
                activeColor = document.querySelector('.active-color'),
                imgIndex = activeColor.parentNode.parentNode.getAttribute('index').substr(-1,1),
                img = new Image(),
                that = this;
            zy_self.$('#wrap').innerHTML += middlePic;
            zy_self.$('#head-addCar').addEventListener('click',function () {
                var bigShopingCar = zy_self.$('#big-shopingCar');
                // zy_self.$('#right-area-select').style.visibility = 'hidden';
                // zy_self.$('#right-area-select').remove();
                img.src='../images/common-pic-'+imgIndex+'-0.jpg';
                img.onload = function () {
                    bigShopingCar.appendChild(img);
                    bigShopingCar.appendChild(rightClone);
                };
            });
        },
        carOpnInTopJ:function () {
            var rightAreaSelect = jquery('#right-area-select'),
                rightClone= rightAreaSelect.clone(true),
                middlePic = '<div id="big-shopingCar"></div>',
                activeColor = jquery('.active-color'),
                imgIndex = activeColor.parent().parent().attr('index').substr(-1,1),
                img = new Image(),
                that = this;
            document.body.innerHTML += middlePic;
            var bigShopingCar = jquery('#big-shopingCar');
            jquery('#head-addCar').on('click',function () {
                bigShopingCar.css('display','none');
                // zy_self.$('#right-area-select').style.visibility = 'hidden';
                // jquery('#right-area-select').css('visibility','hidden');
                img.src='../images/common-pic-'+imgIndex+'-0.jpg';
                img.onload = function () {
                    bigShopingCar.append(img);
                    bigShopingCar.append(rightClone);
                };
        });
        },
    };
    new picShow();
    var scrollNav = function () {
        this.nav_len = [];
        this.setNavArr();
        this.fixTitleAndScroll();
    };
    scrollNav.prototype = {
        setNavArr:function () {
        var img_show = zy_self.$('.img-show');
        for(var img of img_show){
            this.nav_len.push(img.offsetTop);
        }
        },
        fixTitleAndScroll:function () {
            var will_fixed = zy_self.$('#will-fixed'),
              head_addCar = zy_self.$('#head-addCar'),
              h1 = zy_self.$('#hr-bottom-desnav'),
              h2 = zy_self.$('#hr-bottom-desnav2'),
              choose_img = zy_self.$('.choose-img'),
              tempIndex ,
              that = this,
               topEle = zy_self.$('#to-top'),
               minH = 100,
               timer = null,
               flag = true,
               scrollTop,
               speed = 50;
            for(var ele of choose_img){
                ele.addEventListener('click',function () {
                    tempIndex = this.id.substr(-1,1);
                    document.documentElement.scrollTop = document.body.scrollTop = zy_self.$('#select'+tempIndex).offsetTop;
                });
            }
            topEle.addEventListener('click',function () {
                timer = setInterval(function () {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
                    document.documentElement.scrollTop = document.body.scrollTop -= speed;
                    speed += 150;
                    flag = true;
                    if(scrollTop <= 0){
                        clearInterval(timer);
                    }
                },70);
            });
            window.addEventListener('scroll',function () {

                scrollTop = document.documentElement.scrollTop | document.body.scrollTop;
                if(scrollTop > minH){
                    // speed = 0;
                    topEle.style.display = 'block';
                }
                if(scrollTop < minH){
                    topEle.style.display = 'none';
                }
                if(!flag){
                    clearInterval(timer);
                }
                flag = false;
                if(scrollTop > 600 ){
                    will_fixed.style.cssText = 'position: fixed;top:0px;left:0px;width:100%;min-width:980px';
                    head_addCar.style.cssText = 'display:block';
                    h2.style.cssText = 'display:block';
                    h1.style.cssText = 'display:none';
                }else{
                    will_fixed.style.cssText = 'position: relative';
                    head_addCar.style.cssText = 'display:none';
                    h1.style.cssText = 'display:block';
                    h2.style.cssText = 'display:none';
                }
                for(var ele1 of choose_img){
                    ele1.className = 'choose-img';
                }
                for(var seq = 1; seq < that.nav_len.length; seq++){
                    if(that.nav_len[seq - 1] <= scrollTop && scrollTop <= that.nav_len[seq]){
                        choose_img[seq -1].className = 'choose-img hover-red';
                    }
                    if(scrollTop > that.nav_len[that.nav_len.length-1]){
                        choose_img[choose_img.length -1].className = 'choose-img hover-red';
                    }
                }
            });
            }
        },
    new scrollNav();
    var commentsChoose = function () {
        this.chooseType();
        this.myAsk();
    };
    commentsChoose.prototype = {
        chooseType:function () {
            var commntsFont = zy_self.$('#all-comments'),
                commntsPic = zy_self.$('#pic-comments'),
                commentsListContent = zy_self.$('#comments-list-content'),
                picCommentsList = zy_self.$('#pic-comments-list');
            picCommentsList.style.display = 'none';
            commntsFont.addEventListener('click',function () {
                picCommentsList.style.display = 'none';
                commentsListContent.style.display = 'block';
            });
            commntsPic.addEventListener('click',function () {
                commentsListContent.style.display = 'none';
                picCommentsList.style.display = 'block';
            });
        },
        myAsk:function () {
            var myA = zy_self.$('#my-A'),
                want_Q = zy_self.$('#want-Q'),
                A_text = zy_self.$('#A-text'),
                A_submit = zy_self.$('#A-submit'),
                AQ_close = zy_self.$('#AQ-close');
            want_Q.addEventListener('click',function () {
                myA.style.display = 'block';
            });
            AQ_close.addEventListener('click',function () {
                myA.style.display = 'none';
            });
            A_submit.addEventListener('click',function () {
                if(A_text.value == ''){
                    alert("请输入提问内容！");
                }else{
                    alert('提问已提交，请等待审核！');
                    myA.style.display = 'none';
                }
            });

        },
    }
    new commentsChoose();
});
