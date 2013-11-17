---
layout: articles
title: css regular pentagon
description: 用数学的方法，实现『精准』的 正五边形，Let's go.
category: articles
keywords: css
tags: [css]
---

## 总述

css-tricks.com 实现了不少的 css 形状，[click me](http://css-tricks.com/examples/ShapesOfCSS/?=derp)，但是很难说他们都是 正多边形，也许他们只是看着很正，但是经不住计算推敲。这里以 五边形 为例，进行详细的编码。

## CSS Tricks 上的五边形的栗子

### 预览

![css-tricks-pentagon](/images/articles/css-regular-pentagon/css-tricks-pentagon.png)

### 代码

```
#pentagon {
    position: relative;
    width: 54px;
    border-width: 50px 18px 0;
    border-style: solid;
    border-color: red transparent;
}
#pentagon:before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    top: -85px;
    left: -18px;
    border-width: 0 45px 35px;
    border-style: solid;
    border-color: transparent transparent red;
}
```

### 角度推敲

#### 标注刻度一览

![css-tricks-pentagon-1](/images/articles/css-regular-pentagon/css-tricks-pentagon-1.png)

#### 计算角度

正五边形的每个角都是 `108` 度，那让我们来计算一下上面栗子的角度，首先，回忆一下弧度与角度的公式：

```
radian = degree / 360 * 2PI = degree * PI / 180
degree = radian * 180 / PI
```

好，现在让我们来测一下上面图片的的右下角的度数：它应该是 108 (90  + 18)，我们只需要知道那个小角的角度就 ok 了。

```
Math.atan(18/50)*180/Math.PI // 19.798876354524932
```

可见，不是期望的 `18` 度，其它角（方法同上）

当然，这种写法也可以给出精准的正五边形，但是必须满足，初始矩形(代码中的 width:54px 和 border-top:50px 组成的矩形)，假设宽为 a(这里 54)，高为 b(这里 50)，则有:

```
Math.cos(18 * Math.PI / 180) == b / a // 当然本例是不满足的

// 即： 初始化时，只给 width，后面一律计算即可
```

### 不足

虽然这种写法可以用一个元素写完，但是 border-width 不能用 百分比，所以写出来也是死的，inspector 里调试大小的时候，还要手动计算比例，不方便

下面，来一个闲的但疼的栗子，基于 CSS 的 transform

## 基于 CSS3 transform 的一个栗子

之所以选五边形，是因为这个用 CSS 的 transform 实现略复杂...

### 先上步骤预览图

当然你也可以移步这里看实例: [click me](/codepen/css-pentagon/)

![transform-pentagon-1](/images/articles/css-regular-pentagon/transform-pentagon-1.png)

![transform-pentagon-2](/images/articles/css-regular-pentagon/transform-pentagon-2.png)

![transform-pentagon-3](/images/articles/css-regular-pentagon/transform-pentagon-3.png)

![transform-pentagon-4](/images/articles/css-regular-pentagon/transform-pentagon-4.png)

具体的计算方法，代码可见 [click me](https://gist.github.com/malei0311/6752519)

栗子使用 SCSS && compass，如果不想用 compass，可以移步 [click me](http://japborst.net/blog/sass-sines-and-cosines.html) 自定义三角函数，话说个人项目中爱使用 SASS && 2空格，当然，在团队开发中，会依照团队习惯，遵循团队标准。

### 步骤图中的边框问题

因为边框使用的是 border，所以他会撑大父元素（也就是那个灰色的虚框），解决方法是 `box-sizing: border-box // (>=IE8)` ，但是这样会发现，随着嵌套叠加，里面的元素会越来越小，对步骤效果展示产生几像素的偏差，不爽。

接下来，想到的是 使用 `box-shadow:  0 0 0 npx {yourcolor} // (>=IE9)` ，但是，`box-shadow` 貌似不能生成虚线吧。

再然后，想到  ` outline ` ，这货还是可以的，我们可以光明正大的换掉 `border && box-sizing` 了。不过使用 `outline` ， 当进行 `transform` 时，显得稍微的不平滑。

上面的截图，还是 `border` 的虚线框，实例中已换 `outline`。下面给出变化比较明显的图：

![transform-pentagon-outline](/images/articles/css-regular-pentagon/transform-pentagon-outline.png)

稍微 perfect 点了..

### 本例中 transform 关键点

#### 时刻保持正多边形

![skew](/images/articles/css-regular-pentagon/skew.png)

使用了变换 `skewX(18deg)`，它变成了平行四边形，但是，不是菱形。这里(上图)：

```
x: 变换之后的宽度，其实他没变，还是原来的配方，还是原来的味道。
y: 变换之后的高度，这货变了，被拉伸了，原来 y == x 现在 y > x
θ: 扭曲的角度，这里 18
```

ps 上图中红线的长度一样，都是 x，我们要得到菱形，要在纵向上进行缩放。缩放到百分之多少？

```
树直的灰线 / 树直的红线
focus 到右侧的小三角形中，也就是 cos(θ)

这里的代码：scaleY(cos(18deg))
```
子元素会继承父元素的 transform，所以在对子元素进行变换时，为了便于控制子元素，我们需要先把资源素做逆变换，下面是 SCSS && compass 代码:

```
// 下面分别对应步骤预览图中的 图2 和 图4
@include transform( rotate(-36deg) skewX(18deg) scaleY(cos(18deg))); // 父元素
@include transform(scaleY(1/cos(18deg)) skewX(-18deg) rotate(36deg) rotate(18deg) skewY(54deg) scaleX(cos(54deg))); // 子元素，其中前三个是专门针对父元素做的逆变换

```

#### 三个平移的计算

在步骤预览图中：

* 图4 黄框 -> 图5 黄框
* 图7 橙框 -> 图8 橙框
* 图9 橙五边形 -> 图10 橙五边形

![pentagon-info](/images/articles/css-regular-pentagon/pentagon-info.png)

##### 图4 黄框 -> 图5 黄框

也就是上图 绿点到黄点的距离:

```
k * sin(36deg)
// 百分比
k * sin(36deg) / l
// 把 a 代入得：
sin(36deg)/(2*sin(18deg)+1)*100%
```

##### 图7 橙框 -> 图8 橙框

也就是上图 黄点到橙点的距离:

```
50% - sin(36deg)/(2*sin(18deg)+1)*100%  // 图4 黄框 -> 图5 黄框 得到的结果
```

##### 图9 橙五边形 -> 图10 橙五边形

也就是上图 蓝点到绿点的距离:

蓝点很特殊，在正多边形中，中心、重心、垂心、内心、外心，交于一点，蓝点就是这样一个点：

```
// 蓝点到绿点的距离
a / (2 * tan(36deg))
// 百分比
a / (2 * tan(36deg)) / l
// 把 a 代入得：
sin(18deg)/(tan(36deg)*(2*sin(18deg)+1))*100%
```

### 最终代码

#### HTML

```
    <div class="demo-pentagon"> <!-- pentagon 五边形 -->
      <div class="demo-pentagon-inner"></div>
    </div>
```

#### SCSS && compass 版

```
.demo-pentagon {
  position: relative;
  height: 8em;
  width: 8em;
  overflow: hidden;
  $translateY_zero: sin(18deg)/(tan(36deg)*(2*sin(18deg)+1))*100%;
  @include transform(translateY(#{$translateY_zero}) rotate(-36deg) skewX(18deg) scaleY(cos(18deg)));

  .demo-pentagon-inner {
    $translateY_one: sin(36deg)/(2*sin(18deg)+1)*100%;
    $translateY_two: 50% - $translateY_one;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    @include transform(scaleY(1/cos(18deg)) skewX(-18deg) rotate(36deg) translateY(-#{$translateY_one}) rotate(18deg) skewY(54deg) scaleX(cos(54deg)));
  
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background-color: green;
      @include transform(scaleX(1/cos(54deg)) skewY(-54deg) rotate(-18deg) translateY(-#{$translateY_two}));
    }
  }
}
```

#### CSS 版

就是上面代码，编译出来的:

```
/* line 107, ../sass/screen.scss */
.demo-pentagon {
  position: relative;
  height: 8em;
  width: 8em;
  overflow: hidden;
  -webkit-transform: translateY(26.28656%) rotate(-36deg) skewX(18deg) scaleY(0.95106);
  -moz-transform: translateY(26.28656%) rotate(-36deg) skewX(18deg) scaleY(0.95106);
  -ms-transform: translateY(26.28656%) rotate(-36deg) skewX(18deg) scaleY(0.95106);
  -o-transform: translateY(26.28656%) rotate(-36deg) skewX(18deg) scaleY(0.95106);
  transform: translateY(26.28656%) rotate(-36deg) skewX(18deg) scaleY(0.95106);
}
/* line 115, ../sass/screen.scss */
.demo-pentagon .demo-pentagon-inner {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  -webkit-transform: scaleY(1.05146) skewX(-18deg) rotate(36deg) translateY(-36.32713%) rotate(18deg) skewY(54deg) scaleX(0.58779);
  -moz-transform: scaleY(1.05146) skewX(-18deg) rotate(36deg) translateY(-36.32713%) rotate(18deg) skewY(54deg) scaleX(0.58779);
  -ms-transform: scaleY(1.05146) skewX(-18deg) rotate(36deg) translateY(-36.32713%) rotate(18deg) skewY(54deg) scaleX(0.58779);
  -o-transform: scaleY(1.05146) skewX(-18deg) rotate(36deg) translateY(-36.32713%) rotate(18deg) skewY(54deg) scaleX(0.58779);
  transform: scaleY(1.05146) skewX(-18deg) rotate(36deg) translateY(-36.32713%) rotate(18deg) skewY(54deg) scaleX(0.58779);
}
/* line 125, ../sass/screen.scss */
.demo-pentagon .demo-pentagon-inner::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: green;
  -webkit-transform: scaleX(1.7013) skewY(-54deg) rotate(-18deg) translateY(-13.67287%);
  -moz-transform: scaleX(1.7013) skewY(-54deg) rotate(-18deg) translateY(-13.67287%);
  -ms-transform: scaleX(1.7013) skewY(-54deg) rotate(-18deg) translateY(-13.67287%);
  -o-transform: scaleX(1.7013) skewY(-54deg) rotate(-18deg) translateY(-13.67287%);
  transform: scaleX(1.7013) skewY(-54deg) rotate(-18deg) translateY(-13.67287%);
}
```

都是百分比和角度，所以可以很方便的只更改 `width && height` 就可以改变正五边形的大小。

### 不足

虽然这种写法解决了第一个栗子中缩放不方便的问题，但是多加了一个元素


## 一些 CSS 做图工具

* [css shap generator 2D](http://www.samuelrossille.com/css-shape/#3247e3000000ffffff089000y16z-10z-14z20z0_17z0z-14z12z11z1_17z1z-13z9z9z2_16z3z-10z5z3_16z4z-9z3z1_16z-11z-14z11z1_16z-10z-13z9z2_16z-8z-10z5z3_16z-7z-9z3z1_0z-10z-3z20z14z0_10z-16z4z7z0_16z-18z10z4z0_0z-16z10z32z4z0_16z-21z-1z11z2_16z14z10z4z0_11z9z4z7z0_16z10z-1z11z2)
* [tridiv 3D](http://tridiv.com/)

如果你的 chrome 显示不了 tridiv 里的效果，例如：我在 ubuntu 里不可以，请移步 `chrome://flags/` 启用：

![chrome-gpu](/images/articles/css-regular-pentagon/chrome-gpu.png)

## 结语

CSS 做这些东西可以说是剑走偏锋，但是足以说明 CSS 的强大，茶余饭后，稍微想个东西，实现一下，也是挺带感的。

