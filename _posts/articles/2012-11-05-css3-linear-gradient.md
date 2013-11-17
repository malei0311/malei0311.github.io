---
layout: articles
title: 关于 CSS3 的 linear-gradient
description: 关于 CSS3 的 linear-gradient ：最新的 firefox 16 已经符合最新的标准，chrome 22 还部分处于 2011年2月的那个标准，尤其是当用 “角度” 的时候，角度指向混乱：老标准 0deg是从左到右，新标准 0deg 是由下而上。
category: articles
keywords: css,linear-gradient
tags: [css]
---

## 发现

关于 CSS3 的 linear-gradient ：最新的 firefox 16 已经符合最新的标准，chrome 22 还部分处于 2011年2月的那个标准，尤其是当用 “角度” 的时候，现阶段各个浏览器厂商角度指向混乱：老标准 0deg是从左到右，新标准 0deg 是由下而上。

![gradient-diagram][3]

## ADD at 2013-07-31

如果不加前缀，现在都是新标准，应该在 chrome 23 时就已经是新标准了，但是当加上前缀 `-webkit-` 时， chrome 还是老标准。另外，如果第一个参数，不加 方向 `top` 之类，也不加角度，默认是由上倒下的。

另外，新标准的 角度： 顺时针 是正角度，逆时针 是负角度；老标准 反之。

##Reference

* [新标准][2]
* [老标准][1]

[1]: http://www.w3.org/TR/2011/WD-css3-images-20110217/#linear-gradient
[2]: http://www.w3.org/TR/css3-images/#linear-gradients
[3]: http://www.w3.org/TR/2012/WD-css3-images-20120112/gradient-diagram.png