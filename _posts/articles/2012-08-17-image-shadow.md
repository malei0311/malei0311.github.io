---
layout: articles
title: 制作图像 picture 的阴影显示效果
description: 在图像下面呈现一条阴影，有稍微的立体效果
category: articles
tags: [css, imgShadow]
---
##效果预览
![imgShadow](/images/articles/css/imgShadow-1.png)
##主要结构
主要是两层，外层的 `div` 层主要是起 “相框” 的作用，里面的 `img` 放图片。
	
	<div class="box-shadow">
		<img src="">
	</div>

##CSS渲染
###“相框” 的主架
* “相框” 要紧紧地包裹图片 => `display:inline-block`
* 伪对象的相对偏移 => `position: relative`

CSS如下：

	.box-shadow{
		position: relative;
		display:inline-block;
		z-index: 1;
		background: white;
	}

###伪对象实现阴影效果
左右两片，绝对定位，效果实现

	.box-shadow::after,.box-shadow::before{
		z-index:-1;
		position:absolute;
		content:"";
		bottom:15px;
		left:10px;
		width:50%;
		top:80%;
		max-width:300px;
		background:#999999;
		-webkit-box-shadow:0 15px 10px #999999;
		-moz-box-shadow:0 15px 10px #999999;
		box-shadow:0 15px 10px #999999;
		-webkit-transform:rotate(-2deg);
		-moz-transform:rotate(-2deg);
		-o-transform:rotate(-2deg);
		-ms-transform:rotate(-2deg);
		transform:rotate(-2deg);
	}

	.box-shadow::after{
		-webkit-transform:rotate(2deg);
		-moz-transform:rotate(2deg);
		-o-transform:rotate(2deg);
		-ms-transform:rotate(2deg);
		transform:rotate(2deg);
		right:10px;
		left:auto;
	}

##结语
* 注意 `transform:rotate(2deg)` 这种小转角的应用
* 层叠的 element 可以显示出不错的效果
* 用更少的 element 干更多的事
* 精简代码