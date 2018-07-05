$(function () {
    var currentPage = 1;
    var page;
    renderProductlist();
    function renderProductlist() {
        $.ajax({
            type:'get',
            url:"http://127.0.0.1:9090/api/getmoneyctrl",
            data:{
                pageid:currentPage || 1
            },
            dataType:'json',
            success:function(info) {
                console.log(info);
                var htmlStr = template('tpl',info);
                $('.product_list').html(htmlStr);
                page = Math.ceil(info.totalCount/info.pagesize);
                var html = "";
                for(var i = 1; i <= page; i++) {
                    html += '<option>' + i + "/" + page + '</option>';
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
        currentPage = $(this).find('option:selected').text().split("/")[0];
        renderProductlist();
    })
} )

