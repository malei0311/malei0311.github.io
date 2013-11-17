---
layout: articles
title: CSS 预处理器  LESS vs SASS
description: 这段时间，混合使用这两种预处理器，总结出来的一点小。。
category: articles
keywords: css3, less, sass
tags: [css]
---

## 总述

### SASS 的前世今生

Sass是是一种基于ruby编写的CSS预处理器，诞生于2007年，是最早也是最成熟的一款CSS预处理器语言，它可以使用变量、嵌套、混入、继承，运算，函数等功能，使得CSS的开发，变得简单清晰可维护，同时也大大节省了设计者的时间，提高了效率。Sass最后还是会编译出合法的CSS让浏览器使用，也就是说它本身的语法并不太容易让浏览器识别，因为它不是标准的CSS格式，在它的语法内部可以使用动态变量等，所以它更像一种极简单的动态语言。

其实现在的Sass已经有了两套语法规则：一个依旧是用缩进作为分隔符来区分代码块的；另一套规则和CSS一样采用了大括号（｛｝）作为分隔符。后一种语法规则又名SCSS，在Sass3之后的版本都支持这种语法规则。

sass虽然是最早的，但是一开始还是不太好用，而且使用缩进作为分隔符，不符合css使用大括号的习惯，所以less以后起之秀的身份轻松赢得了人心，后来sass借鉴于less的一些思想，改进了自己的设计，并有了scss，然后经过几个版本的更新，特别版本3.2.0做了些革命性的更新，以使它从其他几个编译处理器中脱颖而出。

由上面可见，有时太激进了，用户是不领情的，“步子走大了，容易...”，你懂的。不过现在类 sass 的写法还挺受欢迎的：HAML，Slim，CoffeeScript，jade，styleus等...

### ㄟ(￣▽￣ㄟ)

下面主要是自己在这段时间的使用中遇到的...

## 比较

### calc

less 中使用 calc 有 bug，例如：

    calc(100% - 8px);

他会无情的给你解析成 92%，而在 sass 中没有问题。上一个比较 撮 的 demo：[click me](http://codepen.io/malei0311/full/thAim)

点击左下脚的 `edit` ，把 calc() 法 中写在行内的 style calc，写入 less 中，靠，他变成 92%了

### 循环

虽然都能实现循环，但是 sass 使用起来更方便，例如 sass 中循环  for ，很简单，也方便。

#### sass demo: 
  
* demo 地址: [click me](/codepen/css-fibonacci/)
* demo 源码: [click me](https://gist.github.com/malei0311/6099394)
* 在线调试: [click me](http://codepen.io/malei0311/pen/IsfLm)

![css-fibonacci](/images/articles/less-vs-sass/css-fibonacci.png)

````
@for $i from 1 through $num {
  $temp: $i / 2 + 0px;

  .circle-#{$i} {  
    width: $temp;
    
    transform: rotate($i*137.5deg);
    &:after{
      animation-duration: 10s;
      animation-delay: 0.01s * $i;
    }
  }
}
````

#### less demo:

* demo 地址: [click me](/codepen/css-animation/)
* demo 源码: [click me](https://gist.github.com/malei0311/6093738)
* 在线调试:  [click me](http://codepen.io/malei0311/pen/eqyid)

![css-animation-series-multi](/images/articles/less-vs-sass/css-animation-series-multi.png)

````
.loopingClass (@index,@father) when (@index =< @particles) {
  //这里需要一个恶心的 mixin + 关键字 when 实现一个条件判断，有木有 =。= !
  .father(@father) when (@father = demo1){
    .@{father} i:nth-child(@{index}) {
 
      @angle: @index / @particles * 360;      
      width: (@index * 14) + 0px;
      height: (@index * 14) + 0px;
      margin-top: -(@index * 14) / 2 + 0px;
      margin-left: -(@index * 14) / 2 + 0px;
      z-index: @particles - @index;
      transform:rotate( @angle + 0deg );
      
      transform-origin: 50% 50%;
      animation-delay: @index * (2s / @particles);
     }
  }
  
  .father(@father);
  .loopingClass(@index + 1, @father);
}
````

### 条件判断

sass => if, less => when，下面两段代码，是 `上面循环` 一节中 `less demo` 的不同实现

sass: 

````
@mixin paintChild($father) {
  @for $i from 1 through $particles {
    .#{$father} i:nth-child(#{$i}) {
      @if $father == demo1 {
        $angle: $i / $particles * 360;
  
        width: ($i * 14) + px;
        height: ($i * 14) + px;
        margin-top: - ($i * 14) / 2 + px;
        margin-left: - ($i * 14) / 2 + px;
        z-index: $particles - $i;
        transform:rotate( #{$angle}deg );

        transform-origin: 50% 50%;
        animation-delay: $i * (2s / $particles);  
      } @else if $father == demo2 {
        ... // your code
      }
    }
  }
}

@include paintChild(demo1);
@include paintChild(demo2);
````

less: 

````
.loopingClass (@index,@father) when (@index =< @particles) {
  //这里需要一个恶心的 mixin + 关键字 when 实现一个条件判断，有木有 =。= !
  .father(@father) when (@father = demo1){
    .@{father} i:nth-child(@{index}) {
 
      @angle: @index / @particles * 360;      
      width: (@index * 14) + 0px;
      height: (@index * 14) + 0px;
      margin-top: -(@index * 14) / 2 + 0px;
      margin-left: -(@index * 14) / 2 + 0px;
      z-index: @particles - @index;
      transform:rotate( @angle + 0deg );
      
      transform-origin: 50% 50%;
      animation-delay: @index * (2s / @particles);
     }
  }
  .father(@father) when (@father = demo2){
    ... // your code
  }
  .father(@father);
  .loopingClass(@index + 1, @father);
}

.loopingClass (1, demo1);
.loopingClass (1, demo2);
````

less会重复写 `.father(@father) when (...` 有木有，另外，注意他们的单位计算方式，负号与后面有没有空格，与单位相加时怎么处理。


## 结语

萝卜白菜，各有所爱，不过还是觉的 sass 在某些方面比较方便，另外 chrome 中还可以直接调试。其次，也要看项目历史原因、团队偏好，为了易维护性以及项目的一致性，怎么选，你懂的。

## Reference

* [sass-vs-less](http://css-tricks.com/sass-vs-less/)
* [SASS官方文档](http://sass-lang.com/docs/yardoc/_index.html)