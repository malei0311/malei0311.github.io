---
layout: articles
title: articlesLayout构建之右侧目录索引
description: 一直以来梦想有一种博客，可以像wiki那样自动生成目录索引，可以用类似wiki的写文档方式
category: articles
keywords: layout,directory
tags: [js, 博客志]
---
##总述
就像前面说的一样，这种博客，一直是一个梦。因为所有的博客程序在编辑时，都不把博客的书写风格规范化。都只是按自己所想，随心所欲的在 `textarea` 中添加，发布。

事实上，在知道 `MarkDown` 之前，也懒得把 `textarea` 中的内容规范化，太费事。直到2012年的7月底，无意间看到了BeiYuu搭建在GitHub的博客，知道了 `jekyll + GitHub + MarkDown` 的书写方式，加之这种目录索引，这正是我想要的。

兴奋了几天，一心扑在上面，也要完成一款自己的 `jekyll` 博客，其实对 `jekyll` 早就有耳闻，但是只是停留在听说过的地步。后悔没有早一点打开 `jekyll` 这扇门。
##声明
在下面出现的某些算法思想、核心部分都是继承自BeiYuu。当然也有自己的想法杂烩其中，如不指明，均来自于BeiYuu。
##界面构建
###总体布局
此界面主要分两栏，右栏是绝对定位，脱离正常文档流 `position:absolute`。

	<article>
		<!-- 文章内容 -->
	</article>
	<aside id="menuIndex" class="right">
		<!-- 目录索引 -->
	</aside>

###文章的详细信息头
这里并没有像BeiYuu那样每次的`h1`标题都需自己手动书写，简化了一哈，把对 `page.title` 等头部信息的处理，放在了 `layout` 中，另外，加了不少其他信息。

	{% raw %}<div class="article-title">
        <h1><a href="{{ page.url }}">{{ page.title }}</a></h1>
        <div class="clearfix">
            <div class="article-post-time left">
                <span>&#8227;</span>
                <time class="date" pubdate="{{ page.date | date_to_utc | date: '%Y-%m-%d' }}">{{ page.date | date_to_utc | date: "%Y-%m-%d" }}</time>
            </div>
            {% if page.tags != empty %}
            <div class="article-tags right">
                <span class="pure-css-tag">&nbsp;</span>
                <span class="pure-css-tag-behind left">
                    <ul>
                        {% for tag in page.tags %} 
                        <li>
                            <a href="/tags.html#{{ tag }}">
                                {{ tag }}
                            </a>
                            <span>
                                ,
                            </span>
                        </li>
                        {% endfor %}
                    </ul>
                </span> 
            </div>
            {% endif %}
        </div>
	</div>{% endraw %}

##生成目录
主要列表的是二级、三级标题。
###收集信息
把文章中标题的内容“拿到”相应数组中，而 id 信息则同步生成出来，写入相应数组。有两条线：

* jquery取出的 `h2` 、`h3` 的index线；
* 自建两个数组的index线，`h2` 数组是顺次的不间断的从 `0` 依次到 `n`，`h3` 数组是间断的，对应于相应 `h2` 的index

下面代码：

	var h2 = [],h3 = [],tmpl = '<ul>',h2index = 0;
	$.each($('.article-div-content>h2,.article-div-content>h3'),function(index,item){
	    if(item.tagName.toLowerCase() == 'h2'){
	        var h2item = {};
	        h2item.name = $(item).text();
	        h2item.id = 'menuIndex'+index;
	        h2.push(h2item);
	        h2index++;
	    }else{
	        var h3item = {};
	        h3item.name = $(item).text();
	        h3item.id = 'menuIndex'+index;
	        if(!h3[h2index-1]){
	            h3[h2index-1] = [];
	        }
	        h3[h2index-1].push(h3item);
	    }
	    item.id = 'menuIndex' + index
	});

###生成目录串

	tmpl += '<li class="h1"><a href="#" data-top="0">'+$('.article-title>h1').text()+'</a></li>';           
    for(var i=0;i<h2.length;i++){
        tmpl += '<li><a href="#" data-id="'+h2[i].id+'">'+h2[i].name+'</a></li>';
        if(h3[i]){
            for(var j=0;j<h3[i].length;j++){
                tmpl += '<li class="h3"><a href="#" data-id="'+h3[i][j].id+'">'+h3[i][j].name+'</a></li>';
            }
        }
    }
    tmpl += '</ul>';

###插入目录并赋事件
`Chocolate` 为本博客的一个通用类库

	var $scrollable = Chocolate.findScrollableElement('body','html');
    $('#menuIndex').append($(tmpl)).delegate('a','click',function(e){
        e.preventDefault();
        var scrollNum = $(this).attr('data-top') || $('#'+$(this).attr('data-id')).offset().top;
        $scrollable.animate({ scrollTop: scrollNum-30 }, 400, 'swing');
    })

###Chocolate 类 findScrollableElement
`$scrollElement = $(el)` 这个变量以 `$` 开头，因为被赋予了一个 JQuery 对象，增强程序的可读性。

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
    }

###JQuery 之 scrollTop() 
“匹配的元素集合中获取第一个元素的滚动条的垂直位置”。

垂直滚动位置等于浏览器可见区域以上的已经淡出我们视野的隐藏区域。如果滚动条是在最顶部，或者这个元素没有滚动条，那么这个数字是0。当此元素没有滚动条时 `scrollTop(value)` 是不起作用的（包括 body,html,window）。理论上，应该只有 window 可滚动，但是，在浏览器有滚动条的情况下，经测试 firefox 和 ie 的可滚动元素为 html、window，而 webkit 内核的浏览器为 body、window。

既然这样，为什么不直接用 window 呢？like this:

    $('#menuIndex').append($(tmpl)).delegate('a','click',function(e){
        e.preventDefault();
        var scrollNum = $(this).attr('data-top') || $('#'+$(this).attr('data-id')).offset().top;
        //window.scrollTo(0,scrollNum-30);
        // $(window).scrollTop(scrollNum-30);
    })

两条注释语句，随便开一条，即可以点击时跳转到相应位置。原因是没有滚动效果：

    $(window).animate({ scrollTop: scrollNum-30 }, 400, 'swing');

是没有效果的，window 并不是 dom 元素，而是 window 对象，animate 不起作用。当然我们可以用原生的 javascript 完成滚动效果：

    //TODO:

###相应目录项高亮
`scrollTop`数组中，应该比 `$('#menuIndex li')` 集合中 `li` 的个数少一个，利用这种特殊关系，通过数值调整，很巧妙地实现了相应目录的高亮。

    $(window).load(function(){
        var scrollTop = [];
        $.each($('#menuIndex li a'),function(index,item){
            if(!$(item).attr('data-top')){
                var top = $('#'+$(item).attr('data-id')).offset().top;
                scrollTop.push(top);
                $(item).attr('data-top',top);
            }
        });
        $(window).bind('scroll',function(){
            var nowTop = $(window).scrollTop(),index,length = scrollTop.length;
            if(nowTop+60 > scrollTop[length-1]){
                index = length
            }else{
                for(var i=0;i<length;i++){
                    if(nowTop+60 <= scrollTop[i]){
                        index = i
                        break;
                    }
                }
            }
            $('#menuIndex li').removeClass('on')
            $('#menuIndex li').eq(index).addClass('on')
        });
    });

##我的改善
其实上面的代码中，也有我的小改，不过核心的东西还是来自于 BeiYuu 。下面写一小段判断，很简单，使目录索引随着滚动，不断移动，不断出现在我们的视野中。当没有这一 `($(window).height()-60)>$('#menuIndex').height()` 条件时，是很可怕的，一旦 `$('#menuIndex').height()` 大于 `$(window).height()` 了，滚动条会因为目录区域的溢出可无限往下滚动。之所以 `$(window).height()-60` 减 60，是因为本博客的版权高度大概60像素，这样避免了版权区域与目录区域的重叠覆盖。
    
    $(window).bind("scroll", function(){
        var menuIndex_scrHeight = $(window).scrollTop(),menuIndex_topHeight;
        if(menuIndex_scrHeight > 140 && ($(window).height()-60)>$('#menuIndex').height()) {
            menuIndex_topHeight = menuIndex_scrHeight-140;
            $('#menuIndex').animate({top: menuIndex_topHeight},10);
        } 
        else{
            $('#menuIndex').animate({top: 0},10);
        }
    });

如果减去的 footer 高度很大，岂不是达不到想要的效果，上面这种方法不是很好，或者说很局限，很差，那你可以这样：

    $(window).bind("scroll", function(){
        var menuIndex_scrHeight = $(window).scrollTop(),menuIndex_topHeight;
        var footerOffsetTop=$('footer').offset().top;
        if(menuIndex_scrHeight > 140 && menuIndex_scrHeight<(footerOffsetTop-$('#menuIndex').height()) && $(window).height()>$('#menuIndex').height()) {
            menuIndex_topHeight = menuIndex_scrHeight-140;
            $('#menuIndex').animate({top: menuIndex_topHeight},10);
        } 
        else{
            $('#menuIndex').animate({top: 0},10);
        }
    });

`footerOffsetTop` 这个高度只要保持取到“分栏容器”后的，第一个元素的 `.offset().top` 即可
##结语
不写不知道，很多概念还很模糊，试着解释了一哈，很不到位，不过理解稍微加深了一些。