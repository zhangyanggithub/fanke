require.config({
    paths:{
        'jquery':'jquery-2.1.1',
    }
});
require(['../js/publicApplication.js','jquery'],function (publicApp,$) {
    var getneibor =  publicApp.getNeibor;
    var myEvent = new publicApp.myEvent();
    var picShow = function () {
        this.color = '藏蓝';
        this.mouseEvent();
        this.addColor();
        this.selectColor();
        this.selectSize();
        this.selectedShow();
        this.changeCommon();
        this.leftHoverEvent();
        this.carOpen();
      /*  this.carOpenJ();*/
        this.carOpnInTop();
    };
    picShow.prototype = {
        leftHoverEvent:function () {
            var little_pic = document.querySelectorAll('.left-select-pic');
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
            var colorDes = document.querySelectorAll('.colorDes'),
                 colorIndex,
                 img = new Image(),
                 tempList = '<li class="left-select-pic" index="look-{index}"></li>',
                 html = [],
                 len,
                 tempH,
                 left_pic_select = document.querySelector('#left-pic-select'),
                 leftList;
            for(var ele of colorDes){
                if(ele.innerHTML == this.color){
                    ele.parentNode.parentNode.style.cssText = 'border:1px solid #a10000;';
                    getneibor.get_nxt(ele).className = 'active-color';
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
            document.querySelector('#head-color').innerHTML = this.color;
            document.querySelector('#small').src = '../images/common-pic-'+colorIndex+'-0.jpg';
            document.querySelector('#big').src = '../images/big-pic-'+colorIndex+'-0.jpg';
        },
        changeCommon:function () {
            var little_pic = document.querySelectorAll('.left-select-pic');
            var little_pic_all = document.querySelector('#left-pic-select');
            var leftIndex;
            var colorIndex;
            little_pic_all.addEventListener('mousemove',function (e) {
                var mouseEle = e.srcElement || e.target;
                if(mouseEle.tagName === 'LI') {
                    leftIndex = mouseEle.getAttribute('index').substr(-1, 1);
                    colorIndex = document.querySelectorAll('.active-color')[0].parentNode.parentNode.getAttribute('index').substr(-1, 1);
                    document.querySelector('#small').src = '../images/common-pic-' + colorIndex + '-' + leftIndex + '.jpg';
                    document.querySelector('#big').src = '../images/big-pic-' + colorIndex + '-' + leftIndex + '.jpg';
                }
            });
        },
        mouseEvent:function () {
            var small_img = document.querySelector('#common-pic');
            var mask = document.querySelector('#shadow-pic');
            var small = document.querySelector('#small');
            var big = document.querySelector('#big');
            var big_pic = document.querySelector('#big-pic');
            small_img.addEventListener('mouseout',function () {
                big_pic.style.display = mask.style.display = 'none';
            });
            small_img.addEventListener('mouseenter',function () {
                big_pic.style.display = mask.style.display = 'block';
            });
            small_img.addEventListener('mousemove',function (event) {
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
            var ul = document.querySelector('#color').getElementsByTagName('ul')[0];
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
                ulChild[j].getElementsByClassName('little-img-right')[0].style.backgroundPosition = '0px '+j*36*(-1)+'px';
            }
            this.windowLoad();
        },
        /*
         * 通过选择颜色定位左边的小图片
         * */
        selectColor:function () {
            this.selectColorSize('color');
            var ul = document.querySelector('#color').getElementsByTagName('ul')[0],
                     ulChild = ul.children,
                     currentIndex ,
                     tempList = '<li class="left-select-pic" index="look-{index}"></li>',
                     html = [],
                     len,
                     tempH,
                     img = new Image(),
                     left_pic_select = document.querySelector('#left-pic-select'),
                     leftList,
                     that = this;
            for(var i = 0; i<ulChild.length; i++){
                ulChild[i].addEventListener('click',function () {
                    document.querySelector('#common-pic').style.marginLeft = '80px';
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
                            document.querySelectorAll('.to-page')[1].style.cssText=document.querySelectorAll('.to-page')[0].style.cssText='display:block';
                        }else{
                            left_pic_select.style.marginTop = '12px';
                            document.querySelectorAll('.to-page')[1].style.cssText=document.querySelectorAll('.to-page')[0].style.cssText='display:none';
                        }
                        document.querySelector('#small').src = '../images/common-pic-'+currentIndex+'-0'+'.jpg';
                        document.querySelector('#big').src = '../images/big-pic-'+currentIndex+'-0'+'.jpg';
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
                ul = document.querySelector('#color').getElementsByTagName('ul')[0];
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
            var ul = document.querySelector('#'+id).getElementsByTagName('ul')[0];
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
            var ul = $('#'+id+' ul'),
                li = ul.children('li');
            ul.delegate('li','click',function () {
                for(var j = 0; j<li.length; j++){
                    li[j].getElementsByTagName('span')[0].className = '';
                    li[j].style.cssText = 'border:1px solid #B4B4B4;';
                }
                this.getElementsByTagName('span')[0].className = 'active-color';
                this.style.cssText = 'border:1px solid #a10000';
            })
        },
        selectedShow:function () {
            var showColorSize = document.querySelector('#show-select-item'),
             eleSelect,
             color,
             size,
             typeList;
            listenHover('color','mouseenter');
            listenHover('color','mouseleave');
            listenSelect('size');
            listenSelect('color');
            function listenHover(typeSelect,event) {
                typeList = document.querySelector('#'+typeSelect).getElementsByTagName('li');
                for (var i = typeList.length - 1; i >= 0; i--) {
                    typeList[i].addEventListener(event,function(){
                        if(event == 'mouseenter'){
                            this.style.cssText = 'border:1px solid #a10000';
                        }else if(event == 'mouseleave'){
                            this.style.cssText = 'border:1px solid #B4B4B4;';
                            document.querySelectorAll('.active-color')[0].parentNode.parentNode.style.cssText = 'border:1px solid #a10000';
                        }
                    });
                }
            }
            function listenSelect(typeSelect){
                typeList = document.querySelector('#'+typeSelect).getElementsByTagName('li');
                for (var i = typeList.length - 1; i >= 0; i--) {
                    typeList[i].addEventListener('click',function(){
                        eleSelect = document.querySelectorAll('.active-color');
                        color = getneibor.get_pre(eleSelect[0]).innerHTML;
                        if (eleSelect.length > 1) {
                            size = getneibor.get_pre(eleSelect[1]).innerHTML;
                            document.querySelector('#head-color').innerHTML = showColorSize.innerHTML = color+'，'+size;
                        }else{
                            document.querySelector('#head-color').innerHTML = showColorSize.innerHTML = color;
                        }
                    });
                }
            }
        },
        triangleButClick:function () {
            var up = document.querySelector('#last-page'),
                down = document.querySelector('#next-page'),
                left_pic_select = document.querySelector('#left-pic-select');
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
            var car = document.querySelector('#added-car'),
                addCar = document.querySelector('#addcar'),
                closeIcon = document.querySelector('#car-close');
            addCar.addEventListener('click',function () {
                car.style.display = 'block';
            });
            closeIcon.addEventListener('click',function () {
                car.style.display = 'none';
            });
        },
        carOpenJ:function () {
            var car = $('#added-car'),
                addCar = $('#addcar'),
                closeIcon =$('#car-close');
            addCar.on('click',function () {
                car.css('display','block');
            });
            closeIcon.on('click',function () {
                car.css('display','none');
            });
        },
        headCarClose:function () {
            var headCarClose = document.querySelector('#close_headCar'),
                bigShopingCar = document.querySelector('#big-shopingCar'),
                selectArea = document.querySelector('#select-area')
                that = this;
            myEvent.addHandler(headCarClose,'click',function () {
                bigShopingCar.style.display = 'none';
                selectArea.appendChild(document.querySelector('#right-area-select'));
                that.selectColor();
                that.selectSize();
                that.changeCommon();
                that.leftHoverEvent();
                // document.querySelector('#right-area-select').style.display = 'block';
            });
                },
        carOpnInTop:function () {
            var rightAreaSelect = document.querySelector('#right-area-select'),
                rightClone= rightAreaSelect.cloneNode(true),
                middlePic = document.createElement('div'),
                activeColor = document.getElementsByClassName('active-color')[0],
                closeHeadCar = document.createElement('span'),
                closeHeadCarbg = document.createElement('div'),
                imgIndex = activeColor.parentNode.parentNode.getAttribute('index').substr(-1,1),
                img = new Image(),
                that = this;
            closeHeadCar.id = 'close_headCar';
            closeHeadCar.appendChild(document.createTextNode('X'));
            img.src='../images/common-pic-'+imgIndex+'-0.jpg';
            middlePic.id = 'big-shopingCar';
            closeHeadCarbg.id = 'closeHeadCarbg';
            closeHeadCarbg.appendChild(closeHeadCar);
            middlePic.appendChild(closeHeadCarbg);
            document.querySelector('#wrap').appendChild(middlePic);
            document.querySelector('#head-addCar').addEventListener('click',function () {
                var bigShopingCar = document.querySelector('#big-shopingCar');
                bigShopingCar.style.display = 'block';
                document.querySelector('#right-area-select').remove();
                bigShopingCar.appendChild(img);
                bigShopingCar.appendChild(rightClone);
                that.selectColorSize('color');
                that.selectSize();
                that.selectedShow();
                that.carOpen();
                that.headCarClose();
            });
        },
        carOpnInTopJ:function () {
            var rightAreaSelect = $('#right-area-select'),
                rightClone= rightAreaSelect.clone(true),
                middlePic = '<div id="big-shopingCar"></div>',
                activeColor = $('.active-color'),
                imgIndex = activeColor.parent().parent().attr('index').substr(-1,1),
                img = new Image(),
                that = this;
            document.getElementById('wrap').innerHTML += middlePic;
            var bigShopingCar = $('#big-shopingCar');
            $('#head-addCar').on('click',function () {
                bigShopingCar.css('display','none');
                // document.querySelector('#right-area-select').style.visibility = 'hidden';
                $('#right-area-select').css('display','none');
                img.src='../images/common-pic-'+imgIndex+'-0.jpg';
                img.onload = function () {
                    bigShopingCar.append(img);
                    bigShopingCar.append(rightClone);
                    that.carOpenJ();
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
            var img_show = document.querySelectorAll('.img-show');
            for(var img of img_show){
                this.nav_len.push(img.offsetTop);
            }
        },
        fixTitleAndScroll:function () {
            var will_fixed = document.querySelector('#will-fixed'),
                head_addCar = document.querySelector('#head-addCar'),
                h1 = document.querySelector('#hr-bottom-desnav'),
                h2 = document.querySelector('#hr-bottom-desnav2'),
                choose_img = document.querySelectorAll('.choose-img'),
                tempIndex ,
                that = this,
                topEle = document.querySelector('#to-top'),
                minH = 100,
                timer = null,
                flag = true,
                scrollTop,
                speed = 50;
            for(var ele of choose_img){
                ele.addEventListener('click',function () {
                    tempIndex = this.id.substr(-1,1);
                    document.documentElement.scrollTop = document.body.scrollTop = document.querySelector('#select'+tempIndex).offsetTop;
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
            var commntsFont = document.querySelector('#all-comments'),
                commntsPic = document.querySelector('#pic-comments'),
                commentsListContent = document.querySelector('#comments-list-content'),
                picCommentsList = document.querySelector('#pic-comments-list');
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
            var myA = document.querySelector('#my-A'),
                want_Q = document.querySelector('#want-Q'),
                A_text = document.querySelector('#A-text'),
                A_submit = document.querySelector('#A-submit'),
                AQ_close = document.querySelector('#AQ-close');
            want_Q.addEventListener('click',function () {
                myA.style.display = 'block';
            });
            AQ_close.addEventListener('click',function () {
                myA.style.display = 'none';
            });
            A_submit.addEventListener('click',function () {
                if(A_text.value == ''){
                    alert('请输入提问内容！');
                }else{
                    alert('提问已提交，请等待审核！');
                    myA.style.display = 'none';
                }
            });

        },
    }
    new commentsChoose();
    new publicApp.pieces();
});