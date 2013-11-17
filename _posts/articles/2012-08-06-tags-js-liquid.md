---
layout: articles
title: Tags界面构建之123
description: 在Tags界面构建中有了`js`与`liquid`脚本，交互的想法，事后证明是完全错误的
category: articles
keywords: tags,jekyll,js,liquid
tags: [js, 博客志]
---
##起因
说道产生这种想法的起因，刚开始，想的是点击一个按钮链接，在 `location` 中产生相应的锚，这样用`js`获取锚中的值，就可以实现无论在tags界面还是文章界面，都能用这一种做法实现显示相应的文章。
##错误的方向
在构建tags界面当时，鬼迷了心窍，一心想着`js`与`liquid`脚本交互，根本没有想可行性。尝试了各种蹩脚的方法尝试`js`向`liquid`传参，都失败了。现在想想，当时真是傻透了，白白的浪费了大量的时间。
##放弃vs转机
大概浪费了半天时间纠结于传参问题，要命的是当时已把`jekyll`的工作原理抛向脑后，还咒骂过`jekyll`的`liquid`脚本竟然不提供与`js`的交互。渐渐地，心气儿被时间磨平了，于是就放弃了（在放弃的那一刻，我还坚信着他们之间一定能传参，只是我还没有找对路子）。说到转机，其实并不是传参这件事，而是用`liquid`脚本遍历出所有的`tag`，然后用`js`达到自己想要的效果。
##为什么不能传参
因为`jekyll`是静态的，在把代码注入到`_site`文件夹时，`liquid`脚本已然运行了，根本没有交互的机会，他们的生存期错开了。
##小效果的实现
site.tags一览

	site = {
    	"tags"=>
 		{
 		 "permalinks"=>
 		  [...(Array of liquified Jekyll::Post objects)...],
 		 "urls"=>
 		  [...(Array of liquified Jekyll::Post objects)...],
 		 "templating"=>
 		  [...(Array of liquified Jekyll::Post objects)...],
 		 "liquid"=>
 		  [...(Array of liquified Jekyll::Post objects)...],
 		 "posts"=>
 		  [...(Array of liquified Jekyll::Post objects)...]
 		}
 	}

###遍历tags

	{% raw %}{% assign tags_list = site.tags %}  
    {% for tag in tags_list %} 
        <li><a href="/tags.html#{{ tag[0] }}"><span class="tag-name">{{ tag[0] }}<span>({{ tagsize }})</span></a></li>
    {% endfor %}{% endraw %}

###遍历相应tag的文章
每一类tag的文章放入一个`div`中，其`id`为`{% raw %}{{ tag[0] }}-ref{% endraw %}`,防止被锚点跟踪。

	{% raw %}{% for tag in site.tags %}
    <div class="articles-for-the-tag none" id="{{ tag[0] }}-ref">
        <h3 class="tag-name">{{ tag[0] }}</h3>
        {% assign articles_list = tag[1] %}  
        {% for node in articles_list %}
            {% if node.title != null %}
                <article>
                    <div class="article-head">
                        <h3><a href="{{ node.url }}">{{ node.title }}</a></h3>
                        <div class="clearfix">
                            <div class="article-post-time left">
                                <span>&#8227;</span>
                                <time pubdate="{{ node.date | date: '%b %d, %Y' }}">{{ node.date | date: '%b %d, %Y' }}</time>
                            </div>
                        </div>
                    </div>
                    <div class="article-body">
                        <p>{{ node.description }}</p>
                    </div>
                </article>
            {% endif %}
        {% endfor %}
    </div>
    {% endfor %}{% endraw %}

###显示
刚开始，所有的文章都`display:none`，等到触发相应事件后，显示相应tag的文章。
	
	$(function(){
        var param=Chocolate.getParameterFromURL();
        if(param !== ""){
            $('#all-tags').css('width','290px');
            $('#all-articles').animate({width:'660px'});
            $('#'+param+'-ref').slideDown();
        }
        $('#all-tags ul li a').bind('click',  function() {
            $('#all-tags').css('width','290px');
            $('#all-articles').animate({width:'660px'});
            var tagName=$(this).children('span.tag-name').text();
            $('.articles-for-the-tag').slideUp();
            $('#'+tagName+'-ref').slideDown();
        });
    });

为了达到与整体博客的融合，tags界面采用的是左文章、右标签的布局。为了使点击tag时，文章显示的不那么突兀，配合CSS,做了个拉动效果。
##结语
虽然历经坎坷，但终于还是有了一个令自己看着还行的的效果。