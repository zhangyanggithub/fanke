/**
 * 返回顶部
 */
function gototop() {
    var icon_top  =document.getElementById("to_top");
    var clientHeight = document.documentElement.clientHeight;
    var timer = null;
    var isTop = true;
    var speed = 50;
    window.onscroll = function () {
        var body_scroll = document.documentElement.scrollTop||document.body.scrollTop;
        if(body_scroll > clientHeight){
            icon_top.style.display = "block";
        }
        if(!isTop){
            clearInterval(timer);
        }
        isTop = false;
    };

    icon_top.onclick = function () {
            timer = setInterval(function () {
            var body_scroll = document.documentElement.scrollTop||document.body.scrollTop;
            document.documentElement.scrollTo = document.body.scrollTop -= speed;
             speed += 100;
            isTop = true;
            if(body_scroll < 0){
                clearInterval(timer)
            }
        },60);

    }
}
gototop();