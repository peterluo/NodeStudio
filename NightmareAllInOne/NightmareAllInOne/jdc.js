var Nightmare = require('nightmare');

var myScrape = new Nightmare(
    {
        loadImages: false,
        webSecurity: false,
        weak: false,
        timeout: 5000,
        port: 10005
    }
);
myScrape.on('resourceRequested', function(requestData, networkRequest) {
        var url = requestData.url;
        if (url.indexOf('.css') > 0) {
            return;
        }
    })
    .goto('http://www.jd.com/allSort.aspx')
    //.inject('js', 'jquery-2.1.1.min.js')
    .wait()
    .evaluate(function () {
        
            var cate = "";
    var mtDoms = $('.mt');
        cate += mtDoms.length + "/n";
            var i = 0;
            mtDoms.each(function(index, element) {
                //一级
                var levelOneNames = $(element).find('a');
                //cate += i++;
        //cate += $(element).text()+levelOneNames.length + "/n";
                
                levelOneNames.each(function(j,item) {
                    cate += $(item).text();
                });
            });
            return cate;
        },
        function(result) {
            console.log(result);
        });
    //console.log(((new Date()).getTime() - ttime1) / 1000.000 + "秒");

myScrape.run();
