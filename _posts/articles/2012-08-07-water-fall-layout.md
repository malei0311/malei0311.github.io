---
layout: articles
title: Demos界面的伪瀑布流布局的实现
description: 很早以前，就想搞一下瀑布流布局，各种原因吧，借这次玩jekyll构建本博客的机会，稍微玩一下瀑布流。
category: articles
keywords: demos,waterfall,js
tags: [js, waterFall, 博客志]
---
##为什么叫伪瀑布流
因为并没有实现动态loading...，也没有用脚本去嗅探浏览器的宽度，以确定具体有几条瀑布。这是由博客的具体情况决定的，因为所有的demo都是慢慢生成的，所以这个Demos界面主要是做了个collection。写的比较死，主要针对本博客所写。
##liquid脚本
###遍历所有demo
给每篇文章一个特定的`ID`，我这里是从`1`开始，即`demo-index-1`，因为我在`demo-index-0`中存放了所有demo数量的概览，这个总数将由`js`获取，留待后用。

	{% raw %}{% assign index = 0 %}
    {% for post in site.categories.demos %}
    {% capture index %}{{ index | plus:1 }}{% endcapture %}
    {% capture demo_index %}demo-index-{{ index }}{% endcapture %}
        <article id="{{ demo_index }}">
                <div class="demo-title">
                    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
                    <p>{{ post.description }}</p>
                </div>
                <div class="demo-time">
                    <p><span>&#8227;</span><time pubdate="{{ post.date | date: '%b %d, %Y' }}">{{ post.date | date: '%b %d, %Y' }}</time></p>
                </div>
        </article>
    {% endfor %}{% endraw %}

###demo数量概览

	{% raw %}<article id="demo-index-0">
        {% capture list_size %}{{ site.categories.demos | size }}{% endcapture %}
        <h3>
            All demos:
            (<span>
                {{list_size}}
            </span>)
        </h3>         
    </article>{% endraw %}

###给出瀑布流容器

	<div id="waterFallContainer"></div>

##生成瀑布
主要就是用`js`操作`DOM`树，把文档呈现成自己想要的样子。
###首先声明一个静态类
这里声明了如下属性、方法。具体分了5条瀑布，下面分别介绍每个方法的作用。
	
	var waterFall = {
    	container: $("#waterFallContainer"),
    	columnNumber: 5,
    	columnWidth: 184,
    	demoIndex: 0,
    	loadFinish: false,
    	demosNum: parseInt($('#demo-index-0 span').text())+1,
    	create: function(){  },
    	loadAllDemos: function() {	},
    	loadSingleDemo: function(column) {	},
    	init:function(){  }
	};

###生成空瀑布
	
	create: function(){
        var start=0, spans = '';
        for (start; start < this.columnNumber; start++) {
            spans = spans + '<span id="waterFallColumn-'+ start +'" class="waterFallColumns" style="width:'+ this.columnWidth +'px;">'+ '</span> ';
        }
        this.container.html(spans);
        return this;
    }

###填入内容
把所有的demo剪切到瀑布流容器中。首先，在剪切一个节点前，先判断是否所有demo都已加载完毕。

	loadSingleDemo: function(column) {
        
        if (this.demoIndex > this.demosNum) {
            this.loadFinish = true;
        }
        else{
            column.append($("#demo-index-"+this.demoIndex));
            this.demoIndex += 1;
        }
        return this;
    }

其次，有了上述方法，就可以放心的加载了

	loadAllDemos: function() {
        var index=0;
        for(index;index<this.demosNum;index +=5){
            var start = 0;
            for (start; start < this.columnNumber; start++) {
                var eleColumn = $("#waterFallColumn-" + start);
                if (eleColumn && !this.loadFinish) {
                    this.loadSingleDemo(eleColumn);
                }           
            }
        }
        return this;
    }
###初始化
每个方法都`return this;`,这样就可以像下面连着写了。

	init:function(){
        this.create().loadAllDemos();
    }

##FAQ
这里我遇到了一个问题，纠结了半天也没解决。本来想着 `span`的`display:inline-block` 就可以能解决问题了，诡异的是`span`之间总有4像素的间隔（ps:`span`的`margin`为`0`），怎么也找不出是哪的猫腻。于是乎，`display:block;float:left;`。纠结啊。