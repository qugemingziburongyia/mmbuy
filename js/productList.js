$(function () {
    //获取categoryid
    var id = getSearch('categoryId');
    var currentPage = 1;
    var category,page;
    //1. 获取商品列表
    $.ajax({
        type:'get',
        url:"http://127.0.0.1:9090/api/getcategorybyid",
        data:{
            categoryid:id
        },
        success:function(info) {
            console.log(info);
            category = info.result[0].category;
            var htmlStr = template('tpl',info);
            $('.categoryId').html(htmlStr);
        }
    })

    renderProductlist();
    //2. 获取商品列表
    function renderProductlist() {
        $.ajax({
            type:'get',
            url:"http://127.0.0.1:9090/api/getproductlist",
            data:{
                categoryid:id,
                pageid:currentPage
            },
            dataType:'json',
            success:function(info) {
                console.log(info);
                info.category = category;
                var htmlStr = template('tpl2',info);
                $('.content ul').html(htmlStr);
                 page = Math.ceil(info.totalCount / info.pagesize);
                 var html="";
                 for (var i = 1 ; i <= page;i++) {
                    html += '<option>'+i+"/"+page+'</option>'
                }
                $('.page').html(html);
                $('.page option:eq('+(currentPage-1)+')').attr('selected','selected');
            }
        })
    }


    $('.next').click(function () {
        currentPage++;
        if(currentPage<=page) {
            renderProductlist();
        } 
        else {
            currentPage = page;
        }
    })    
    $('.prev').click(function() {
        currentPage--
        if(currentPage >= 1) {
            renderProductlist();
           
        } else {
            currentPage = 1;
        }
    })

    $('.page').on('change',function() {
        currentPage = $(this).find('option:selected').text().split('/')[0];
        renderProductlist();
    })
} )