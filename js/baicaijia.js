$(function () {
    var $ul = $('.title');
    var width,lis,len,ulWidth;
    // 计算ul侧边的宽度
    var asideWidth = parseInt($('.nav').width())-parseInt($('.icon_search').width());
         // 改变屏幕宽度时, 需要重新获取 lis 的宽度
    
  window.addEventListener("resize", function () {
    // 设置 width
    asideWidth = parseInt($('.nav').width())-parseInt($('.icon_search').width());
    width = lis[0].offsetWidth;
     $('.title').width(width*len);
     ulWidth = $('.title').width();
  })

    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getbaicaijiatitle',
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl',info);
            $('.nav ul').html(htmlStr);
            //获取li标签的元素,设置ul的宽
            len = info.result.length;
            lis = $('.title').children();
            // console.log(lis);
             width = lis[0].offsetWidth;
            $('.title').width(width*len);         
        }
    })

    var titleid = 0;
    renderproductlist();
    function renderproductlist() {
        $.ajax({
            type:'get',
            url:"http://127.0.0.1:9090/api/getbaicaijiaproduct",
            data:{
                titleid:titleid
            },
            dataType:'json',
            success:function(info) {
                console.log(info);
                var htmlStr = template('tpl2',info);
                $('.product_list').html(htmlStr);
            }

        })
    }
    //点击导航li标签,切换样式,请求数据
    $('.title').on('click','li>a',function() {
        $(this).addClass('current').parent().siblings().find('a').removeClass('current');
        titleid = $(this).data('id');
        // console.log(titleid);
        renderproductlist();
    })
    //区域滚动
    ;(function () {
        var startX = 0;
        var distanceX = 0;
        var left = parseInt($ul.css('left'));

        document.addEventListener('touchstart',function(e) {
            // console.log(e);
            // console.log(left);
            
            $ul[0].style.transition = 'none';
            startX = e.touches[0].clientX;
        })
        document.addEventListener('touchmove',function(e) {
            distanceX = e.touches[0].clientX-startX;
            $ul.css({'transform':'translateX('+(left+distanceX)+'px)'});
        })
        document.addEventListener('touchend',function(e) {
            // console.log(e);
            distanceX = e.changedTouches[0].clientX-startX;
            left += distanceX;
            ulWidth = $ul.width();
            // console.log([left,ulWidth,asideWidth]);
            if(left>0) {
                $ul[0].style.transition = "all 1s";
                $ul.css({'transform':'translateX('+0+'px)'});
                left = 0;
            }else if (left<asideWidth-ulWidth) {
                left = asideWidth-ulWidth;
                $ul[0].style.transition = "all 1s";
                // console.log(left);
                $ul.css({'transform':'translateX('+ left + 'px)'})
            }
        })
    })()

    $('.go_top').click(function() {
        $("html,body").animate({scrollTop:0},"slow");
    })

})