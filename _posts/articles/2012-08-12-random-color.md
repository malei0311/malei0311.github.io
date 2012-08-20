---
layout: articles
title: 容器透明，内容不透明，随机变色
description: 为了稍微融入本博的色调，demos界面需要各种颜色的浅色调，用rgba比较方便
category: articles
tags: [js, randomColor, 博客志]
---
##想法
看着demos界面，假的瀑布流布局有些单调，于是想随机给个背景颜色。开始没想到各种颜色的`真彩`，冲击这么强烈，让人不舒服。于是就产生了`容器透明，内容不透明`的想法。
##步骤
###1.分配颜色
我们知道颜色正整数值的取值范围为：`0 - 255`。除以5，来个均分

	var colorBit = new Array(6);
    colorBit[0] = "255";
    colorBit[1] = "204";
    colorBit[2] = "153";
    colorBit[3] = "102";
    colorBit[4] = "51";
    colorBit[5] = "0";

###2.颜色组合
red,green,blue三原色的不同组合，融合成了不同色彩。根据排列组合原理，从`6`个数取出`3`个，进行可重复的排列，有 `6`的`3`次方种情况，即：取`3`次，每次有`6`种选择，`6*6*6`是也。

	var colorArray=new Array();
    for (var i = 0; i < 6; i++){
        for (var j = 0; j < 6; j++){
            for (var k = 0; k < 6; k++){
                colorArray.push(colorBit[i]+','+colorBit[j]+','+colorBit[k]);
            }
        }
    }

###3.上色(借助JQuery)

	$('#waterFallContainer article').each(function(index,domEle){
        var randomColor=colorArray[Math.floor((colorArray.length)*Math.random())];
        $(domEle).css('backgroundColor','rgba('+randomColor+',0.1)');
    });

##小插曲
容器透明，内容不透明，有两种方法(来自`飘零雾雨`的经验谈)：
###1.方法一
原理是容器层与内容层并级，容器层设置透明度，内容层通过负`margin`或者`position`绝对定位等方式覆盖到容器层上

	.outer{width:200px;height:200px;background:#000;filter:alpha(opacity=20);opacity:.2;}
	.inner{width:200px;height:200px;margin-top:-200px;}
						
	<div class="outer"><!--我是透明的容器--></div>
	<div class="inner">我是不透明的内容</div>

###2.方法二
高级浏览器直接使用rgba颜色值实现；IE浏览器在定义容器透明的同时，让子节点相对定位，也可达到效果

	.outer{width:200px;height:200px;background:rgba(0,0,0,.2);background:#000\9;filter:alpha(opacity=20)\9;}
	.outer .inner{position:relative\9;}
						
	<div class="outer">
		<div class="inner">我是不透明的内容</div>
	</div>

##追加
把随机的背景色改成了随机border