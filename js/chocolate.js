/**
 * @fileoverview chocolate.js.
 *
 * @author <a href="mailto:leiman0311@gmail.com">Lei Ma</a>
 * @time  Aug 4, 2012
 */

/**
 * @description chocolate
 * @static
 */
var Chocolate={
    /**
     * @description 非 IE6/7/8 的浏览器，跳转到 kill-browser 页面
     */
    killIE: function () {
        if ($.browser.msie) {
            // kill IE6 and IE7
            if ($.browser.version === "6.0" || $.browser.version === "7.0" || $.browser.version === "8.0") {
                window.location = "/kill-browser.html";
                return;
            }
            
            // kill 360 
            if (window.external && window.external.twGetRunPath) {
                var path = external.twGetRunPath();
                if(path && path.toLowerCase().indexOf("360se") > -1 ) {
                    window.location = "/kill-browser.html";
                    return; 
                }
            }
        }
    },
    /**
     * @description 高亮显示菜单项
     */
    highLightMenu: function() {
        var navs, url, cur, i;
        navs = $("#top-nav li a");
        for(i = 1 ; i < navs.length; i++ ){
            url = navs[i].href;
            cur = window.location.href;
            if(cur.indexOf(url) !=-1) {
                navs[i].className = "current";
                navs[0].className = "";
            }
            if(cur != navs[0].href) {
                navs[0].className = "";
            }
        }       
    },
    /**
     * @description DOM加载完成后的初始化
     */
    init: function () {
        Chocolate.killIE();
        Chocolate.highLightMenu();
    },
    /**
     * @description
     */
    includeScript: function(file,callback){
        var _doc = document.getElementById('footer-scripts');
        var js = document.createElement('script');
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', file);
        _doc.appendChild(js);
        if (!/*@cc_on!@*/0) { //if not IE
            //Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
            js.onload = function () {
                callback();
            }
        } else {
            //IE6、IE7 support js.onreadystatechange
            js.onreadystatechange = function () {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callback();
                }
            }
        }
        return false;
    },
    /**
     * @description
     */
    includeStyleSheet: function(file){
        var _doc = document.getElementsByTagName('head')[0];
        var css = document.createElement('link');
        css.setAttribute('type', 'text/css');
        css.setAttribute('rel','stylesheet');
        css.setAttribute('href', file);
        _doc.appendChild(css);
    },
    /**
     * @description 回到顶部
     */
    goTop: function () {
        var y = $(window).scrollTop();
        var speed = 1.1;
        window.scrollTo(0, Math.floor(y / speed));

        if (y > 0) {
            var invokeFunction = "Chocolate.goTop()";
            window.setTimeout(invokeFunction, 16);
        }
    },
    /**
     * @description 滚到那
     */
    goThere: function (num,nowTop,goDown) {
        var y = $(window).scrollTop();
        // if(y > num){
            var speed = 1.1;
            if(y > num){
                window.scrollTo(0, Math.floor( Math.abs(y-num) / speed) + num );
            }
            else{
                goDown= goDown+Math.floor( Math.abs(y-num)/speed);
                window.scrollTo(0, goDown + nowTop);

            }
            if (Math.abs(y-num)>0) {
                var innerGoThere = "Chocolate.goThere("+num+","+nowTop+","+goDown+")";
                window.setTimeout(innerGoThere, 16);
            }
        // }

        //if(y < num){
            // var speed = 1.1;
            // // alert(Math.floor( (num-y)/(y+2) *speed)+" vs "+y+" vs "+num)
            // window.scrollTo(num, Math.floor( (num-y)/speed) + y );
    
            // if (y < num) {
            //     var goDown = "Chocolate.goThere("+num+")";
            //     window.setTimeout(goDown, 16);
            // }
        //}
        
    },
    /**
     * @description 找出可以垂直滚动的元素
     */
    findScrollableElement : function(els) {
        for (var i = 0, argLength = arguments.length; i < argLength; i++) {
            var el = arguments[i],
            $scrollElement = $(el);
            var ss=el;
            if ($scrollElement.scrollTop() > 0) {
                return $scrollElement;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop() > 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return $scrollElement;
                }
            }
        }
        return [];
    },
    /**
     * @description 从URL中获取参数(傻了 => window.location.hash 即可，作为傻的证据保留)
     * @time  Aug 9, 2012
     */
    getParameterFromURL:function(){
        var currHref = window.location.href;
        var index = currHref.lastIndexOf("#");
        var param = "";
        if(index != "-1"){
            param = currHref.substr(index+1);
        }
        return param;
    },
    initTimeline: function () {
        var height = $(window).height() - 70;
        $(".time-line").height(height);
        $("#timeline").height(height);
        
        if ($.browser.msie && $.browser.version < 9) {
            return;
        }
        var timeline = new VMM.Timeline();
        timeline.init();
    },
    /**
     * @description 返回一个随机的 rgb 颜色串，例：51,51,51
     * @time  Aug, 2012
     */
    randomColor:function(){
        var colorBit = new Array(6);
        colorBit[0] = "255";
        colorBit[1] = "204";
        colorBit[2] = "153";
        colorBit[3] = "102";
        colorBit[4] = "51";
        colorBit[5] = "0";
        var colorArray=new Array();
        for (var i = 0; i < 6; i++){
            for (var j = 0; j < 6; j++){
                for (var k = 0; k < 6; k++){
                    colorArray.push(colorBit[i]+','+colorBit[j]+','+colorBit[k]);
                }
            }
        }
        var randomColor=colorArray[Math.floor((colorArray.length)*Math.random())];//Math.random()含0,不含1
        return randomColor;
    },
    share: function () {
        var title = encodeURIComponent($('article.article-main-content .article-title>h1').text()),
        url = window.location.href,
        pic;
        if($('article.article-main-content').find('img').attr('src')){
            pic="http://webcraft.malei.tk"+$('article.article-main-content').find('img').attr('src');
        }else{
            pic="http://webcraft.malei.tk/images/webcraft.png";
        }
        
        var urls = {};
        urls.tencent = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + title + 
        "&url=" + url + "&pic=" + pic;
        urls.sina = "http://v.t.sina.com.cn/share/share.php?title=" + 
        title + "&url=" + url + "&pic=" + pic;
        urls.google = "https://plus.google.com/share?url=" + url;
        urls.twitter = "https://twitter.com/intent/tweet?status=" + title + " " + url;
        
        $(".share span").click(function() {
            var key = this.className.replace("-ico", "");
            window.open(urls[key], "_blank", "top=100,left=200,width=648,height=618");
        });
    },
    /**
     * [print description] 打印
     * @param  {[type]} num [description]
     * @return {[type]}      [description]
     */
    printWhatIWant:function(num){
        if (num < 10) {
            bdhtml=window.document.body.innerHTML;//获取当前页的html代码
            sprnstr="<!--startprint"+num+"-->";//设置打印开始区域
            eprnstr="<!--endprint"+num+"-->";//设置打印结束区域
            prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+18); //从开始代码向后取html
            prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));//从结束代码向前取html
            window.document.body.innerHTML=prnhtml;
            window.print();
            window.document.body.innerHTML=bdhtml;
        } else {
            window.print();
        }
    }
}

$(function(){
    Chocolate.init();
})