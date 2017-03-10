require(['../js/publicApplication.js'],function(publicApp){
    var selectMore = function () {
        this.animationInterval = null;
        this.animationTimeout = null;
        this.commentsList = [];
        this.hoverSeeBig();
        this.hideTri();
    };
    selectMore.prototype = {
      hoverSeeBig: function () {
        var littleImg = document.getElementsByClassName('scanne-little'),
            scannBig = document.getElementsByClassName('scannOne-big'),
            that = this;
          for(var i = 0,len=littleImg.length;i<len;i++){
              (function (i) {
                  littleImg[i].addEventListener('mouseover',function(){
                      scannBig[i].style.display = 'block';
                      that.getcommentsList("xx");//根据用户ID获取用户评论
                      that.commentInterval2(this.parentNode.parentNode);
                  });
                  littleImg[i].addEventListener('mouseleave',function(){
                      scannBig[i].style.display = 'none';
                      clearInterval(that.animationInterval);
                      clearTimeout(that.animationTimeout);
                  });
              })(i);
          }

      },
      getcommentsList:function(id){//获取用户评论并逐条显示
          this.commentsList = [
              {"111111":":一人一马一江湖，红颜相见不相识，杨柳依依雨雪霏霏，任嘉伦，你最帅"},
              {"222222":":一人一马一江湖，红颜相见不相识，杨柳依依雨雪霏霏，任嘉伦，你最帅"},
              {"333333":":一人一马一江湖，红颜相见不相识，杨柳依依雨雪霏霏，任嘉伦，你最帅"},
              {"444444":":一人一马一江湖，红颜相见不相识，杨柳依依雨雪霏霏，任嘉伦，你最帅"},
              {"555555":":一人一马一江湖，红颜相见不相识，杨柳依依雨雪霏霏，任嘉伦，你最帅"},
              {"666666":":一人一马一江湖，红颜相见不相识，杨柳依依雨雪霏霏，任嘉伦，你最帅"},
          ];
      },
      commentInterval:function(){
          var commentsWrap = document.getElementsByClassName('scannone-comments')[0],
              scannOne = document.getElementsByClassName('scannOne')[0],
              commentsP,
              index=0,
              tempUser,tempComments,
              contain = document.getElementsByClassName('contain-comments')[0];
          this.animationInterval = setInterval(()=>{
              commentsP = document.getElementById('pInComments');
              commentsP.style.marginTop = -40+'px';
              for(var u in this.commentsList[index]) {
                  tempUser = u;
                  tempComments = this.commentsList[index][u];
              }
              this.animationTimeout = setTimeout(()=>{
                  commentsWrap.innerHTML = '<p id="pInComments"><span>'+tempUser+'</span><span>'+tempComments+'</span></p>';
              },1500);
              index++;
              if(index == this.commentsList.length){
                  index = 0;
              }
          },2000);
      },
    commentInterval2:function(fatherEle){
            var commentsWrap = fatherEle.getElementsByClassName('scannone-comments')[0],
                commentsP = commentsWrap.getElementsByTagName('p')[0],
                index=0,
                tempUser,tempComments,
                contain = commentsWrap.getElementsByClassName('contain-comments')[0];
                this.animationInterval = setInterval(()=>{
                    commentsP = commentsWrap.getElementsByTagName('p')[0];
                    commentsP.style.marginTop = -40+'px';
                    for(var u in this.commentsList[index]) {
                        tempUser = u;
                        tempComments = this.commentsList[index][u];
                    }
                    this.animationTimeout = setTimeout(()=>{
                        contain.innerHTML = '<p><span>'+tempUser+'</span><span>'+tempComments+'</span></p>';
                    },2000);
                    index++;
                    if(index == this.commentsList.length){
                        index = 0;
                    }
                },4000);

        },
        //点击小三角隐藏所有颜色图标
        hideTri:function(){
            var icon = document.getElementById('hide-color'),
                allFlower = document.getElementsByClassName('allS-flower')[0],
                spanEle = icon.getElementsByTagName('span')[0];
            icon.addEventListener('click', function () {
                if(allFlower.style.display == 'none'){
                    allFlower.style.display = 'block';
                    spanEle.style.cssText = 'margin-top: -4px;border-bottom-color: #b81c22;border-top-color:transparent;'
                }else{
                    allFlower.style.display = 'none';
                    spanEle.style.cssText = 'margin-top: 3px;border-bottom-color: transparent;border-top-color: #b81c22;'
                }
            });
        },
    };
    new selectMore();
    var styleHover = function () {
        this.backgroundChange();
        this.changeBorder();
    };
    styleHover.prototype = {
      backgroundChange: function () {
          var rowList = document.getElementsByClassName('style-list');
          for(var i=0,len=rowList.length; i<len; i++){
              (function (i) {
                  rowList[i].addEventListener('mouseover',function(){
                      this.getElementsByTagName('span')[0].style.color = '#FFF';
                      this.getElementsByTagName('span')[0].style.backgroundColor = '#a20000';
                      this.getElementsByTagName('ul')[0].style.backgroundColor = '#ededed';
                  });
                  rowList[i].addEventListener('mouseleave',function(){
                      this.getElementsByTagName('span')[0].style.color = '#959595';
                      this.getElementsByTagName('span')[0].style.backgroundColor = '#ededed';
                      this.getElementsByTagName('ul')[0].style.backgroundColor = '#FFF';
                  });
              })(i);
          }
      },
      changeBorder: function () {
          var colorUl = document.getElementById('color-ul'),
              allColor = document.getElementById('all-color');
          allColor.addEventListener('click', function (e) {
              var target = e.srcElement || e.target;
              if(target.tagName === 'LI'){
                  for(var i=0,len=colorUl.childNodes.length; i<len; i++){
                      allColor.style.border = colorUl.childNodes[i].style.border = 'thin solid #CECACA';
                  }
                  target.style.border = 'thin solid #b81c22';
              }
          });

      },
    };
    new styleHover();
    new publicApp.pieces()
});