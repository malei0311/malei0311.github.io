---
layout: articles
title: background-origin and background-clip
description: background-origin and background-clip
category: articles
keywords: css3
tags: [css]
---

## 简介

### [background-origin][1]

设置或检索对象的背景图像计算background-position时的参考原点(位置)

    默认值：padding-box
    padding-box：从padding区域（含padding）开始显示背景图像。
    border-box：从border区域（含border）开始显示背景图像。
    content-box：从content区域开始显示背景图像。

### [background-clip][2]

指定对象的背景图像向外裁剪的区域。
    
    默认值：border-box
    padding-box：从padding区域（不含padding）开始向外裁剪背景。
    border-box：从border区域（不含border）开始向外裁剪背景。
    content-box：从content区域开始向外裁剪背景。
    text：从前景内容的形状（比如文字）作为裁剪区域向外裁剪，如此即可实现使用背景作为填充色之类的遮罩效果。

## CODE

请使用 chrome，点击右上角的 edit on codepen 可更改测试

### background-origin

如果有 `background-attachment` 是 fixed ，那么 `background-origin`  不生效，并且这里是相对于 html（root）偏移，测试这一项，把本行的 `fixed` 的注释去掉，还有把 `#demo` 和 `body` 的 `margin` 置成 `0` ，效果明显。详细原因参见：http://www.w3.org/TR/CSS21/visudet.html#containing-block-details

<pre class="codepen" data-height="300" data-type="result" data-href="GBxzl" data-user="malei0311" data-safe="true"><code></code><a href="http://codepen.io/malei0311/pen/GBxzl">Check out this Pen!</a></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

  

### background-clip

<pre class="codepen" data-height="300" data-type="result" data-href="tibDo" data-user="malei0311" data-safe="true"><code></code><a href="http://codepen.io/malei0311/pen/tibDo">Check out this Pen!</a></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

  

## 结语

如果你不想让背景从边界泄漏，以下代码还是很有用的：

    background-clip: padding-box;

详细请参见：[Fixing the background 'bleed'][3]


[1]: http://www.w3.org/TR/css3-background/#background-origin
[2]: http://www.w3.org/TR/css3-background/#background-clip
[3]: http://tumble.sneak.co.nz/post/928998513/fixing-the-background-bleed