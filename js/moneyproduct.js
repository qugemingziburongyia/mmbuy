$(function() {
    
    var productid = parseInt(getSearch('productid'));
    //1.商品详情渲染
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        data:{
            productid:productid
        },
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl',info);
            $('.content').html(htmlStr);
        }

    })



})