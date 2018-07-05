$(function () {
    var couponid = getSearch('couponid');
    var coupontitle = getSearch('coupontitle');
    $('.head .center').html(coupontitle+"优惠券");
    var imgarr = [],imgSrc;
    var $ul = $('.imgbox');
    $.ajax({
        type:'get',
        url:"http://127.0.0.1:9090/api/getcouponproduct",
        data:{
            couponid:couponid
        },
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl',info);
            $('.product_list').html(htmlStr);
            info.result.forEach(function(v,i) {
                imgSrc = v.couponProductImg.split(' ')[1].slice(5,-1)
                imgarr.push(imgSrc);
                //动态获取ul里的图片
            })
            
            // banner()
        }
    })
    //轮播图
    //1.动态渲染图片
    // renderImg();
    // function renderImg() {
    //     console.log(imgarr);
    //     var htmlStr2 = template('imgtpl',{img:imgarr});
    //     $ul.html(htmlStr2);
    // }
  
    function banner () {
        var htmlStr2 = template('imgtpl',{img:imgarr});
        $ul.html(htmlStr2);
        var ulwidth;
        var $lis = $ul.children();
        // console.log($lis[0]);
        var liwidth = $lis[0].offsetWidth;
        // console.log(liwidth);
        $lis.each(function() {
            $(this).width(liwidth);
        })
        var liheight = $lis[0].offsetHeight;
        var lislen = $lis.length;
        ulwidth = liwidth * lislen;
        $ul.width(ulwidth);
        $ul.height(liheight)
        $('.pic').width(liwidth);
        var index = 0;
        $('.right').on('click',function(e) {
            e.stopPropagation();
            if(index>=lislen-1) {
               index=lislen-2
            }
            index++;
            $ul[0].style.transition = "all 1s";
            $ul.css({"transform":"translateX("+(-index*liwidth)+"px)"})
        })
        $('.left').on('click',function(e) {
            e.stopPropagation();
            if(index<=0) {
                index=1
            }
            index--;
            $ul.css({"transform":"translateX("+(-index*liwidth)+"px)"})
        })
    }

    ;(function () {
        $('#modal').hide();
        $('.product_list').on('click','li',function(e) {
            e.stopPropagation();
            $('#modal').show();
            banner();
        })
        $('body').click(function() {
            $('#modal').hide();
        })

    })()
    
 



})