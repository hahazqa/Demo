
$(function () {
    /*轮播图*/
    banner();
    /*初始化tooltips*/
    $('[data-toggle="tooltip"]').tooltip();
    /*初始化 tabs*/
    initTabs();
});
// 轮播图
function banner(){


    //数据的缓存
    var myData = '';
    var getData = function(callback) {
        if(myData) {
            callback && callback(myData);

           return false;
        }
        $.ajax({

            url:'js/index.json',
            type:'get',
            data:{},
            dataType:'json',
            success:function(data){

                myData = data;
                callback && callback(myData);
            }
        });
    }


    var renderHtml = function() {

        var width = $(window).width();
        var isMobile = false;
        //在768px一下都是认为是移动端
        if(width<768) {
            isMobile = true;
        }
        getData(function (data) {

            var templatePoint = _.template($('#template_point').html());
            var templateImage = _.template($('#template_image').html());

            var pointHtml = templatePoint({model:data});
            var imageHtml = templateImage({model:{list:data,isMobile:isMobile}});

            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);

        });
    };

    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');

    //在移动端滑动

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('.wjs_banner').on('touchmove', function (e) {
       moveX = e.originalEvent.touches[0].clientX;

       distanceX = moveX - startX;
        isMove = true;
    });

    $('.wjs_banner').on('touchend', function (e) {
        if(isMove && Math.abs(distanceX) > 50 ){
            if(distanceX > 0 ) {
                // 向右滑
                $('.carousel').carousel('prev');
            } else {
                $('.carousel').carousel('next');
            }
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
    });
};

/*初始化 tabs*/
function initTabs(){
    /*父盒子*/
    var parent = $('.wjs_tabs_parent');
    /*子盒子*/
    var child = parent.find('ul');
    /*所有的li*/
    var lis = child.find('li');

    /*获取所有的li的宽度的和*/
    var width = 0;
    /*遍历*/
    lis.each(function(){
        width += $(this).innerWidth()
    });
    console.log(width);

    /*设置child的宽度*/
    child.width(width);

    /*滑动*/
    itcast.iScroll({
        /*dom parent[0]*/
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:60
    });

    /*
     * innerWidth() 内边距+内容
     * outerWidth() 内边距+内容+边框
     * outerWidth(true) 外边距 + 边框 + 内容 + 内边距
     *
     * */
    /*$.each(lis,function(){

     });*/
}