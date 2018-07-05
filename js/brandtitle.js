$(function () {
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:9090/api/getbrandtitle',
        dataType:'json',
        success:function(info) {
            console.log(info);
            info.result.forEach(function(v,i) {
                v.brandtit = v.brandTitle.slice(0,-4);
            })
           
            var htmlStr = template('tpl',info);
            $('#category ul').html(htmlStr);
        }
    })
})