$(function () {
    var category = getSearch('category');
    var brandName = getSearch('brandName');
    var productId = getSearch('productId')
    $('.category').html(category+">");
    $('.brandName').html(brandName);


    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getproduct",
        data:{
            productid:productId
        },
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl',info);
            $('.product').html(htmlStr);
        }
    })

    $.ajax ({
        type:'get',
        url:"http://127.0.0.1:9090/api/getproductcom",
        data:{
            productid:productId
        },
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl2',info);
            $('.user_com ul').html(htmlStr);
        }
    })
})