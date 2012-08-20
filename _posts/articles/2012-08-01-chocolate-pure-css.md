---
layout: articles
title: 本博客使用PureCss
description: 1.LOGO背景的抛光 2.右上角的 ForkMe 3.Tag图标 4.回到顶端图标 5.其他
category: articles
tags: [css, 博客志]
---
##总述
由于本博客用的都是一些高级的css3属性，又是个人博客，没必要为低级浏览器做兼容，已做好kill低级浏览器的程序，现只支持高级浏览器（指的是对html5、css3支持的很好的浏览器）。
##1.LOGO背景的抛光
由于底部背景用的是linear-gradient，下面有一个明显的渐变，为了使抛光柔和呈现，把抛光分成上、下两部分。
	
	<div id="logo-bg">
        <span id="logo-bg-top"></span>
        <span id="logo-bg-bottom"></span>
    </div>

###先对这两个 `span` 设置一下公共属性：

	#logo-bg span{
		display:block;
		width:330px;
		margin:0;
		padding:0;
	}

###用CSS描述上面 `span` 的呈现方式

	#logo-bg-top{
		height:76px;
		background: -moz-radial-gradient(center bottom,ellipse cover, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.8) 60%,rgba(46,46,46,0.5) 100%);
		background: -webkit-radial-gradient(center bottom,ellipse cover, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.8) 60%,rgba(46,46,46,0.5) 100%);
		background: -o-radial-gradient(center bottom,ellipse cover, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.8) 60%,rgba(46,46,46,0.5) 100%);
		background: -ms-radial-gradient(center bottom,ellipse cover, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.8) 60%,rgba(46,46,46,0.5) 100%);
		background: radial-gradient(center bottom,ellipse cover, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.8) 60%,rgba(46,46,46,0.5) 100%);
	}

###用CSS描述下面 `span` 的呈现方式

	#logo-bg-bottom{
		height:12px;
		background: -moz-radial-gradient(center top,ellipse, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.3) 70%,rgba(46,46,46,0) 100%);
		background: -webkit-radial-gradient(center top,ellipse, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.3) 70%,rgba(46,46,46,0) 100%);
		background: -o-radial-gradient(center top,ellipse, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.3) 70%,rgba(46,46,46,0) 100%);
		background: -ms-radial-gradient(center top,ellipse, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.3) 70%,rgba(46,46,46,0) 100%);
		background: radial-gradient(center top,ellipse, rgba(83,83,83,0.8) 0%,rgba(46,46,46,0.3) 70%,rgba(46,46,46,0) 100%);
	}
##2.右上角的 ForkMe
放在 `footer` 中的 `ForkMe`

	<a href="https://github.com/malei0311/malei0311.github.com" target="_blank" id="forkme">Fork Me</a>

###CSS发挥作用：

	#forkme{
		display:block;
		position:fixed;
		top:0;
		right:0;
		width:124px;
		height:28px;
		background-color:#333;
		color:#fff;
		font:bold 14px/28px "Times New Roman",Times,serif;;
		text-align:center;
		-webkit-transition: .3s;
		-moz-transition: .3s;
		-ms-transition: .3s;
		-o-transition: .3s;
		transition: .3s;
		-moz-transform:translate(28px,20px) rotate(45deg);
		-webkit-transform:translate(28px,20px) rotate(45deg);
		-o-transform:translate(28px,20px) rotate(45deg);
		-ms-transform:translate(28px,20px) rotate(45deg);
		transform:translate(28px,20px) rotate(45deg);
		-moz-box-shadow:0 0 5px rgba(0,0,0,.5),inset 0 0 2px #fff;
		-webkit-box-shadow:0 0 5px rgba(0,0,0,.5),inset 0 0 2px #fff;
		box-shadow:0 0 5px rgba(0,0,0,.5),inset 0 0 2px #fff;
		text-shadow:0px 0px 1px rgba(255,255,255,0.9),2px 2px 5px rgba(0, 0, 0, 0.5);
	}

###MouseOver?

	#forkme:hover{
		background-color:#900;
		text-shadow:-1px -1px 2px rgba(0,0,0,.5);
		text-decoration:none;
	}

##3.Tag图标
只是一个`span`标签

	<span class="pure-css-tag">&nbsp;</span>

连上本体，和两个伪对象，共三部分：

###TAG主身：

	.pure-css-tag{
		float:left;
		width: 10px;
		height: 4px;
		border: 2px solid #4183C4;
		border-radius:2px;
		margin-top: 6px;
		margin-right:2px;
		transform:rotate(45deg);
		-moz-transform:rotate(45deg);
		-webkit-transform:rotate(45deg);
		-o-transform:rotate(45deg);
		-ms-transform:rotate(45deg);
	}
	
###TAG上面三角：

	.pure-css-tag::before{
		content:'';
		position:relative;
		top: -2px;
		left: -9px;
		float:left;
		width:0;
		height:0;
		border: 4px solid transparent;
		border-right-color:#4183C4;
	}

###TAG的穿孔，小白圆点
	
	.pure-css-tag::after{
		content:'';
		position:relative;
		top: -7px;
		left: -3px;
		float:left;
		width: 2px;
		height: 2px;
		background: #fff;
		border-radius: 2px;
		-moz-border-radius:2px;
		-webkit-border-radius:2px;
		-ms-border-radius:2px;
	}
##4.回到顶端图标
主要是由一个 `a` 标签和一个 `span` 标签呈现出来的， `a` 标签：正方形框； `span` 标签：向上箭头。

	<div class="go-top">
        <a href="#i-will-top" id="go-top" class="clearfix"><span class="go-top-icon"></span></a>
    </div>

### `a` 标签：

	div.go-top a{
		display:none;
		width:32px;
		height:32px;
		padding:5px;
		border-radius:5px;
		box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3),0px 0px 34px 2px rgba(0, 0, 0, 0.3) inset;
	}

### `span` 标签：

 箭头===>等腰直角三角形	

	.go-top-icon{
		margin-top:-16px;
		width:0;
		height:0;
		float:left;
		border-style:solid;
		border-color:transparent;
		border-bottom-color:rgba(0,0,0,0.3);
		border-width:16px;
	}

箭身===>伪对象呈现

	.go-top-icon::before{
		position:relative;
		content:'';
		top:16px;
		left:-8px;
		float:left;
		width:16px;
		height:14px;
		background:rgba(0,0,0,0.3);
		border-radius:0 0 2px 2px;
		-moz-border-radius:0 0 2px 2px;
		-webkit-border-radius:0 0 2px 2px;
		-ms-border-radius:0 0 2px 2px;
	}

##5.其他
以上四项为在构建博客时，写的CSS算是比较繁琐的，其他的相对简洁。
##结语
CSS3的确很强大