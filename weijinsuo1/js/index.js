
$(function () {
    /*�ֲ�ͼ*/
    banner();
    /*��ʼ��tooltips*/
    $('[data-toggle="tooltip"]').tooltip();
    /*��ʼ�� tabs*/
    initTabs();
});
// �ֲ�ͼ
function banner(){


    //���ݵĻ���
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
        //��768pxһ�¶�����Ϊ���ƶ���
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

    //���ƶ��˻���

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
                // ���һ�
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

/*��ʼ�� tabs*/
function initTabs(){
    /*������*/
    var parent = $('.wjs_tabs_parent');
    /*�Ӻ���*/
    var child = parent.find('ul');
    /*���е�li*/
    var lis = child.find('li');

    /*��ȡ���е�li�Ŀ�ȵĺ�*/
    var width = 0;
    /*����*/
    lis.each(function(){
        width += $(this).innerWidth()
    });
    console.log(width);

    /*����child�Ŀ��*/
    child.width(width);

    /*����*/
    itcast.iScroll({
        /*dom parent[0]*/
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:60
    });

    /*
     * innerWidth() �ڱ߾�+����
     * outerWidth() �ڱ߾�+����+�߿�
     * outerWidth(true) ��߾� + �߿� + ���� + �ڱ߾�
     *
     * */
    /*$.each(lis,function(){

     });*/
}