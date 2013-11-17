---
layout: articles
title: Sublime Text 2 如何在 Ubuntu+iBus 下输入中文？
description: under Ubuntu+iBus, you can't enter Chinese into Sublime Text 2, how to solve it, let's go!
category: articles
keywords: sublime_text_2,ubuntu,iBus
tags: [editor, ST2, ubuntu]
---
##解决方案
先安装能在sublime text 2显示中文的字体，有一个非常好的开源字体，叫做“文泉驿字体”，安装如下：

	sudo apt-get install xfonts-wqy

官方网站：[http://wenq.org/index.cgi?%E9%A6%96%E9%A1%B5](http://wenq.org/index.cgi?%E9%A6%96%E9%A1%B5)

然后配置sublime text 2的 “Settings-User”，在里面加上：

	"font_face": "WenQuanYi Micro Hei Mono"

最后安装一个sublime text 2的插件 InputHelper，用于输入中文，安装如下：

	cd ~/.config/sublime-text-2/Packages
	git clone https://github.com/xgenvn/InputHelper.git

使用方法：

* 1.保证ibus/scim是在gtk程序下正常运行。
* 2.Ctrl+Shift+Z 调出输入框（虽然不习惯也不爽，但能支持中文输入已经不错啦_^)
* 3.在输入框窗口输入中文，然后按下Enter或者Ctrl+Enter键输入文字到sublime text 2
* 4.点击>右方向键或者End键把光标移动到最后，进行继续输入（回到1）

说明：

该插件只能在linux下使用，对于windows或者mac是不支持的。

##Reference
[知乎](http://www.zhihu.com/question/20163104)
