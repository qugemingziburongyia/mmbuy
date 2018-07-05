$(function() {
    var productId = getSearch('productId');
    $.ajax({
        type:'get',
        url:"http://127.0.0.1:9090/api/getdiscountproduct",
        data:{
            productid:productId
        },
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl',info);
            $('.content').html(htmlStr);
            
        }

    })
})