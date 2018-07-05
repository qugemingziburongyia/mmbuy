
$(function() {
    //1. 渲染分类标题
    $.ajax({
        type:'get',
        url:"http://127.0.0.1:9090/api/getcategorytitle",
        dataType:'json',
        success:function(info){
            console.log(info);
            $('.row').html(template('tpl',info));
            $('.getCategory').on('click',function() {
                var id = $(this).data('id');
                if($(this).next().find('li').length == 0) {
                    renderCategory(id);
                } else {
                    $(this).next().slideToggle();
                }
            })
        }
    })

    //点击分类标题获取分类品牌
    function renderCategory(id) {
        $.ajax({
            type:'get',
            url:"http://127.0.0.1:9090/api/getcategory",
            data:{
                titleid:id
            },
            dataType:'json',
            success:function(info) {
                console.log(info);
                var htmlStr = template('tpl2',info);
                var $ul = $("a[index=" +id + "]").next();
                $ul.html(htmlStr);
                $ul.css({
                    "display":"none"
                })
                $ul.slideDown();
            }
        })
    }

})