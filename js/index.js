$(function() {
    //1.导航栏渲染
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:9090/api/getindexmenu",
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('navTpl',info);
            $('.nav_list').html(htmlStr);
        }
    })

    //2.导航栏显示隐藏
    $('.nav ul').on('click','li:nth-child(8)',function() {
        $(this).nextAll().slideToggle();
    })

    //3.折扣商品渲染
    $.ajax({
        type:'get',
        url:"http://127.0.0.1:9090/api/getmoneyctrl",
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('proTpl',info);
            $('.product_list').html(htmlStr);
            var result = info.result;
            var arr = [];
            result.forEach(function (v,i) {
                var str = v.productComCount;
                var num = str.replace(/[^0-9]+/g,'');
                arr.push(num);
            })
            arr.forEach(function(v,i) {
                $('.content').eq(i).text(v);
            })

        }
    })

  


})