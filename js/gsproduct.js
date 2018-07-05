$(function () {
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getgsshop',
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl',info);
            $('.shopname').html(htmlStr);
        }
    })

    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getgsshoparea',
        dataType:'json',
        success:function(info) {
            console.log(info);
            var htmlStr = template('tpl1',info);
            $('.shoparea').html(htmlStr);
        }
    })
    renderlist();
    function renderlist () {
        $.ajax({
            type:'get',
            url:"http://127.0.0.1:9090/api/getgsproduct",
            data:{
                shopid:shopid || 0,
                areaid:areaid || 0
            },
            dataType:'json',
            success:function(info) {
                console.log(info);
                var htmlStr = template('tpl2',info);
                $('.li_list').html(htmlStr);
                
            }
        })
    }
   
    var shopid,areaid;
    //点击京东a标签,显示shopname列表
    $('.left').click(function() {
        $('.shopname').slideToggle().next().hide();
    })

    $('.right').click(function() {
        $('.shoparea').slideToggle().prev().hide();
    })
    $('.shopname').on('click','li',function() {
        $(this).addClass('current').siblings().removeClass('current');
        $('.shopname').hide();
        shopid = $(this).find('a').data('id');
        $('.left').find('span').text($(this).find('a').text());
        renderlist();
    })

    $('.shoparea').on('click',"li",function() {
        $(this).addClass('current').siblings().removeClass('current');
        $('.shoparea').hide();
        areaid = $(this).find('a').data('id');
        $('.right').find('span').text($(this).find('a').text().split('（')[0]);
        renderlist();
    })

})