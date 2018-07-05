$(function() {
    var brandtitleid = getSearch('brandtitleid');
    var brandtit = getSearch('brandtit');
    var productid,productimg,productname;
    $('.hot').html(brandtit+"哪个牌子好");
    $('.sales').html(brandtit+"产品销量排行");
    $('.newcom').html(brandtit+'最新评论')
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getbrand',
        data:{
            brandtitleid:brandtitleid
        },
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl',info);
            $('.ten').html(htmlStr);
            //在里面修改i的样式
            $('.item-list i').eq(0).css('backgroundColor',"#f10e0e");
            $('.item-list i').eq(1).css('backgroundColor',"#ff9314");
            $('.item-list i').eq(2).css('backgroundColor',"#8adf5b");
        }
    })

    $.ajax({
        type:'get',
        url:"http://127.0.0.1:9090/api/getbrandproductlist",
        data:{
            brandtitleid:brandtitleid,
            pagesize:5
        },
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl2',info);
            $('.brandsales ul').html(htmlStr);

            //获取商品id
            productid = info.result[0].productId;
            productimg = info.result[0].productImg;
            productname = info.result[0].productName;
            rendercom();    
        }
    })
    function rendercom() {
        $.ajax({
            type:'get',
            url:"http://127.0.0.1:9090/api/getproductcom",
            data:{
                productid:productid
            },
            dataType:'json',
            success:function(info) {
                console.log(info);
                info.productName = productname;
                info.productImg = productimg;
                var htmlStr = template('tpl3',info);
                $('.com ul').html(htmlStr);
                
                
            }
        })
    }


})