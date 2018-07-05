function getSearch (key) {
    var search = location.search;// ?name=zs&age=ls
    search =  decodeURI(search).slice(1); // name=zs&age=ls
    var arr = search.split('&'); // ['name=zs','age=ls']
    var obj = {};
    arr.forEach(function(v,i) {
        var key = v.split('=')[0];
        var value = v.split('=')[1];
        obj[key] = value;
    })
    return obj[key];
}

  //4.返回顶部功能
  $('.w40').click(function() {
    $("html,body").animate({scrollTop:0},'slow');
})
