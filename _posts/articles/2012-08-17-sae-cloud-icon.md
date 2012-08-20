---
layout: articles
title: 仿 SAE 的收藏夹图标，做了一个 Pure CSS 的版本
description: 没有网络，硬盘上又没有相应的资源，只能自己动手了
category: articles
tags: [css, icon]
---
##效果预览
在[About](/about.html "关于我")界面的 Feb. 2012 的 SAE
##一个 span 搞定

	<span class='cloud-icon'>

##添砖加瓦

### span 主体：底座
	.cloud-icon{
		width: 266px;
		height: 115px;
		float:left;
		background:#555;
		border-radius: 60px;
		-moz-border-radius:60px;
		-webkit-border-radius: 60px;
		-ms-border-radius:60px;
	}

###右边突出比较大的部分

	.cloud-icon::before{
		position:relative;
		content:'';
		left: 82px;
		top: -82px;
		width: 130px;
		height: 130px;
		float:left;
		background:#555;
		border-radius:65px;
		-moz-border-radius:65px;
		-webkit-border-radius: 65px;
		-ms-border-radius:65px;
	}

###左边突出比较小的部分
	
	.cloud-icon::after{
		position:relative;
		content:'';
		left: -98px;
		top: -38px;
		width: 70px;
		height: 70px;
		float:left;
		background: #555;
		border-radius:35px;
		-moz-border-radius:35px;
		-webkit-border-radius: 35px;
		-ms-border-radius:35px;
	}

##结语
* 云已完成，完整的显示，需要调父元素的 `padding`
* `float` 当该属性不等于none引起对象浮动时，对象将被视作块对象(`block-level`)，即display属性等于block。也就是说，浮动对象的display特性将被忽略。 该属性可以被应用在非绝对定位的任何元素上。 
