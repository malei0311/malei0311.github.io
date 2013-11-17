---
layout: articles
title: Image 的用例
description: 未完，待续...
category: articles
keywords: image, html
tags: [html]
---

## 总述

貌似话说 image 的应用还挺多的，这里不自量力的试着总结一下，难免遗漏...isMap 和 useMap 这里不涉及

## 属性 height && width

为图像指定 height 和 width 属性是一个好习惯。如果设置了这些属性，就可以在页面加载时为图像预留空间。如果没有这些属性，浏览器就无法了解图像的尺寸，也就无法为图像保留合适的空间，因此当图像加载时，页面的布局就会发生变化。

无论有没有指定 width 和 height，在 css 的作用下（重绘），img 的大小都会乖乖听 css 的，另外，如果只制定 height 和 width 的其中之一，他会按照您的意思等比例的缩放（无论是 css 中，还是 靠 height or width 属性，它都会听话） 

## 获取 Image 的真实大小

前面说 image 能够缩放（虽然不推荐缩放），但是有时候我们并不知道 img 是否进行了缩放，并且我们很想知道他的真实大小。How to do ?

### 惯用的、并且支持屌丝浏览器的做法

用 Image 对象的方法，如下：

    var preloadImg = function(url,callback) {
      var img = new Image(); // HTML5 Constructor
      img.src = url;
      if(img.complete) {
        callback(img);
        return;
      }
      img.onload = function(){
        callback(img); // callback 你就可以任意操作了
      }
    }

### do you know naturalWidth and naturalHeight ?

    // 等所有资源都下载完
    window.onload = function(){
      var img = document.querySelector('#img-test');
      console.log(img.naturalHeight,img.naturalWidth); // 图片本身的大小
    }

## Image 在 timeout 中的应用

...

## Image ping ?

...

## img src xss ?

...



## Reference

* [test timeout mozilla](https://bug257454.bugzilla.mozilla.org/attachment.cgi?id=157438)
* [Smallest timeout value](http://jsperf.com/smallest-timeout  "or add /2")
* [WHATWG Timers](http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#timers)
* [HTMLImageElement-MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
* [js-ping](https://github.com/wangxiao/jsping/blob/master/jsping.js)
* [立即调用的函数表达式](http://www.cnblogs.com/TomXu/archive/2011/12/31/2289423.html "严重推荐 汤姆大叔 系列")
* [通过 img URL 实施 XSS 的解决方案](http://sofish.de/2138)