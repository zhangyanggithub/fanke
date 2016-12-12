var ball1 = document.querySelector('.ball1');
var ball2 = document.getElementById('ball2');
var ball3 = document.getElementById('ball3');
function animation(ele,distance,cb) {
    setTimeout(function () {
        var marginLeft = parseInt(ele.style.marginLeft,10);
        if(marginLeft == distance){
            cb && cb();
        }else{
            if(marginLeft < distance){
                marginLeft++;
            }else{
                marginLeft--;
            }
            ele.style.marginLeft = marginLeft +'px';
            animation(ele,distance,cb);
        }
    },13);
}
/*
animation(ball1,100,function () {
    animation(ball2,150,function () {
        animation(ball3,200,function () {
            animation(ball3,150,function () {
                animation(ball1,150,function () {
                })
            })
        })
    })
});*/
function promiseAnimation(ele,distance) {
    return new Promise(function (resolve,reject) {
        (function _animation() {
            setTimeout(function () {
                var marginLeft = parseInt(ele.style.marginLeft,10);
                if(marginLeft == distance){
                    resolve();
                }else{
                    if(marginLeft < distance){
                        marginLeft++;
                    }else{
                        marginLeft--;
                    }
                    ele.style.marginLeft = marginLeft + 'px';
                    // _animation();
                }
            },13);
            _animation();
        })();
    });
}
promiseAnimation(ball1,100)
    .then(function () {
        return promiseAnimation(ball2,200)
    })
    .then(function () {
        return promiseAnimation(ball3,300)
    })
    .then(function () {
        return promiseAnimation(ball3,150)
    })
    .then(function () {
        return promiseAnimation(ball2,150)
     })
    .then(function () {
        return promiseAnimation(ball1,150)
    });


