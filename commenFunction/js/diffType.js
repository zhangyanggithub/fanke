require.config({
    paths:{
        'jquery':'jquery-2.1.1',
    }
});
require(['../js/publicApplication.js','jquery'],function (publicApp,$) {
    new publicApp.carousel();
    publicApp.pieces;
    var chooseBL = function () {
        this.clcikEvent();
    };
    chooseBL.prototype = {
        clcikEvent:function () {
            var leisuretri = document.querySelector('.leisure-tri'),
                businesstri = document.querySelector('.bussiness-tri'),
                bul = document.querySelector('#b-ul'),
                lul = document.querySelector('#l-ul'),
                business = document.querySelector('#business-type'),
                leisure = document.querySelector('#leisure-type'),
                leisureclick = document.querySelector('#leisure-click'),
                businessclick = document.querySelector('#business-click');
            business.addEventListener('click',function () {
                leisure.className = '';
                this.className = 'active-one';
                lul.style.visibility = leisuretri.style.visibility = 'hidden';
                bul.style.visibility = businesstri.style.visibility = 'visible';
                leisureclick.style.display = 'none';
                businessclick.style.display = 'block';
            });
            leisure.addEventListener('click',function () {
                business.className = '';
                this.className = 'active-one';
                lul.style.visibility = leisuretri.style.visibility = 'visible';
                bul.style.visibility = businesstri.style.visibility = 'hidden';
                leisureclick.style.display = 'block';
                businessclick.style.display = 'none';
            });
        }
    }
    new chooseBL();
});