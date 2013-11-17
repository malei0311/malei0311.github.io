---
layout: articles
title: img 中alt和tittle的区别
description: img 中alt和tittle的区别
category: articles
keywords: css,html,img,alt,title
tags: [html]
---
##总述
简单的理解：
alt：  图片显示不出来了就显示alt的属性值
title：鼠标划过图片显示的提示
##alt属性
使用alt属性是为了给那些不能看到你文档中图像的浏览者提供文字说明。这包括那些使用本来就不支持图像显示或者图像显示被关闭的浏览器的用户，视觉障碍的用户和使用屏幕阅读器的用户。替换文字是用来替代图像而不是提供额外说明文字的。在写替换文字前仔细想想，保证那些文字确实为那些看不到图像的人提供了说明信息，并且在上下文中有意义。对于那些装饰性的图片可以使用空的值(alt=""，引号中间没有空格)，而不是使用不相关的替换文字比如“foo”或者“foo.gif”。不要忽略它，如果你忽略了，那么一些屏幕阅读器会直接阅读图像文件的文件名，那些文字浏览器，比如Lynx会显示图像文件的文件名，而那对于你的浏览者就没什么用了。包含文字的图像图片设置替换文字是最简单的，图像中包含的文字一般来说就可以作为alt属性值。

##title属性
title属性有一个很好的用途，即为链接添加描述性文字，特别是当连接本身并不是十分清楚的表达了链接的目的。这样就使得访问者知道那些链接将会带他们到什么地方，他们就不会加载一个可能完全不感兴趣的页面。对于img标签，title是对图片的说明和额外补充，如果需要在鼠标经过图片时出现文字提示应该用属性title。

##测试
一段简单的代码：
	
    <div>
      	<img src="" alt="test" title="i'm a title">
   	</div>

###chrome中的显示效果
![chrome](/images/articles/img-alt-vs-title/chrome.png "chrome中的显示效果")
###firefox中的显示效果
![firefox](/images/articles/img-alt-vs-title/firefox.png "firefox中的显示效果")
###ie9中的显示效果
![ie9](/images/articles/img-alt-vs-title/ie9.png "ie9中的显示效果")