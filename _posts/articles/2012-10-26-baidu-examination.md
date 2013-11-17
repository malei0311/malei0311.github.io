---
layout: articles
title: XX-web前端开发工程师-笔试+面试-经历
description: 由于自己很喜欢前端开发工作，于是就利用自己的课余时间，学习和练习了许多demo，并看了一些相关的书籍；如果自己未来的工作是web前端开发，是一件多么令人兴奋的事情。抱着这样一种心态，向一些大公司投了简历，想求得一份web前端开发的工作。这篇笔记，主要记录在XX的笔试和面试经历。
category: articles
keywords: 面试
tags: [面试, js, css]
---
##总述

幸运的是笔试通过了，悲剧的是在面试的第一轮就被淘汰了。其实面试被淘汰，在意料之中，因为面试官问的一些问题，有的细节竟然一点也不知道。“知其然，而不知其所以然”，致使被淘汰，这使我认识到自己差的还很远，还有很多需要学，加油！！

##web前端工程师职位要求

* 精通JavaScript、Ajax等Web开发技术
* 精通HTML/XHTML、CSS等网页制作技术，熟悉页面架构和布局
* 熟悉W3C标准，对表现与数据分离、Web语义化等有深刻理解
* 对互联网产品和Web技术有强烈兴趣，有优秀的学习能力和强烈的进取心
* 具有良好的沟通能力和团队合作精神、优秀的分析问题和解决问题的能力
* 计算机相关专业本科或以上学历

具有以下能力者优先考虑：

* 具有Flash、Mobile WEB/WAP、HTML5/CSS3开发经验
* 精通一种模板语言（Smarty、Velocity、Django等）
* 熟悉Linux平台，掌握一种后端开发语言（PHP/Java/C/C++等）
* 具有一定的软件工程意识，对数据结构和算法设计有充分理解

##笔试

###笔试通知

由于笔试在清华大学进行，所以顺便游览了一下清华校园，找到了一个不错的住宿环境——[未名国际青年旅社][1]。以下是笔试的详细信息:

* 简历编号：123856
* 应聘职位：Web前端研发工程师(北京)
* 笔试时间：10月13日（周六）9:00-11:00
* 笔试地点：清华大学三教2302
* 座位号：114

我的第一次笔试经历啊...貌似参加考试的有270人

###笔试试题

####1. 请写出至少三个CSS3中新添加的样式属性的名字；

border-radius,box-shadow,text-shadow,transform,transition,opacity,text-overflow,box-reflect,border-image等等

####2.请运用javaScript找出所有ClassName包含text的标签 `<li>`，并将它们的背景颜色设置为黄色；

以下代码，并不是做题当时的代码，考试时，没有考虑到：

* ".all" 问题
* className 中 '-' 的问题

当然考试时，也是这种思想，参考了阮一峰的 [Javascript模块化编程（一）：模块的写法][2] 后，有改进。 代码详情：

	var Tea = (function(){
	    function getElementsByClassName(className,tag,parent){
	        //".all" 是 DHTML 中的用法，当 tag 等于 "*" 时，
	        //如果浏览器支持 ".all" 就用，否则，用标准DOM方法
	        var allTags=(tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
	        var matchingElements= new Array();
	        //因为 '-' 是正则表达式中的元字符，而 className 中 '-' 是合法的，
	        //所以，当把 className 写入正则表达式之前，要先转义 '-'
	        className=className.replace(/\-/g,"\\-");
	        var regex=new RegExp("(^|\\b)"+className+"(\\b|$)");
	        var element;
	        for(var i=0;i<allTags.length;i++){
	            element=allTags[i];
	            if(regex.test(element.className)){
	                matchingElements.push(element);
	            }
	        }
	        return matchingElements;
	    }
	    return {
	        getElementsByClassName : getElementsByClassName
	    };
	})();
	window.onload=function(){
	    var matchingElements=Tea.getElementsByClassName('text','li',document);
	    for(var i=0;i<matchingElements.length;i++){
	        matchingElements[i].style.backgroundColor="yellow";
	    }
	}

为什么起名叫 "Tea" ，因为本人酷爱 Dota ，有一次和同学们注册小号开黑，本想注册一种新兴的编程语言 "CoffeeScript"，很不幸，已经被抢注，经过不断尝试，注册 "teaScripts" 成功了。由于他本来就是 "script"，于是命名为 "Tea"。

####3.用HTML/CSS实现下面的图片内容：

![bishi-3](/images/articles/baidu-examination/bishi-3.jpg "bishi-3")

我做的[demo][3]，关于元素的 `display:inline-block` 的4像素间隔问题，解决方案(设 "father" 为父标签，"son" 为子标签)：纯CSS实现 在父元素中设置 `font-size:0` ,用来兼容chrome，而使用 `letter-space:-npx` 来兼容safari:

	father {
	  letter-spacing: -4px;/*根据不同字体字号或许需要做一定的调整*/
	  word-spacing: -4px;
	  font-size: 0;
	}
	father son {
	  font-size: 16px;
	  letter-spacing: normal;
	  word-spacing: normal;
	  display:inline-block;
	  *display: inline;
	  zoom:1;
	}

解决方案参考自 [设计蜂巢][4]，讲的很详细。

####4.浏览器的缓存和本地存储相关内容有哪些？这些在什么环境下都各自能起到什么作用？

cookie,webstorage => [BAIDU-UFO][5]讲的相当详细

####5.我们把一个数字倒着读和原数字相同的数字称之为对称数，（例如1,121,88,8998），不考虑性能，请找出1—10000之间的对称数，要求用最简练javaScript实现；

	/**
	 * [findSymmetryNumber 找出一定区段内的对称数]
	 * @param  {[Number]} start [起始数]
	 * @param  {[Number]} end   [结束值]
	 * @return {[Array]}       [返回的结果]
	 */
	function findSymmetryNumber(start,end){
	    var resultArray=[];
	    for(var j=start;j<end;j++){
	        var str1=j+'';
	        var str2=str1.split('').reverse().join('');
	        if(str1 === str2){
	            resultArray.push(str1);
	        }
	    }
	    return resultArray;
	}

然后调用函数输出即可

####6.当你打开浏览在地址栏中输“http://www.xxxxx.com/”后在XX的搜索框中输入“HTML5”，然后点击XXXX按钮，在所有的信息在一一被列举出来的过程中，计算机和网络都发生了什么变化？你有什建议？

####7.请描述你参加过的一个项目：

* a)你在项目中的角色？你是如何研发，设计你的角色所做的东西的？
* c)你觉得你在项目的过程中，哪些需要得以注重？
* d)你觉得你还需要能做些什么，去更好的完成你的项目？

##面试

###面试通知

先是短信通知，再是电话确认，以下详细信息：

同学好，XX面试通知：10月21日13:50到达XX大厦（13号线西二旗站向西500米）C座前台签到。携带身份证、学生证、签字笔、三份简历。

###面试回忆

####1.自我介绍

略

####2.做过什么项目

说了自己做的关于 PHP 的项目，不过面试官要求说与前端有关的项目，在 `GAE` 上做过一款博客皮肤，在 `GitHub` 上用 `jekyll` 做了一个博客，也就是本博客，其中做了一款 `JQuery` 插件，方便自己调用，生成 tag cloud。

####3.3D-tags的jquery插件，tags的分布算法

详情，请参考，我以前写的 [JQuery插件之tags的3D旋转球制作][6]

####4.CSS两栏布局（尽可能多方法）

这道题，答的还行，并且得到了面试官的认可。发现了一篇文章，讲的CSS两栏布局，还不错，挺全面 => [如何以CSS作出两栏版面布局][7]

####5.清除浮动的几种方法

清除浮动主要有三种方法：

方法一( 不推荐，因为加了一个多余的标签 )：

	.clearfix{clear:both;} /* 其中 .clearfix 为浮动元素的下一个兄弟元素 */

方法二：

	/* 放在浮动元素的父元素上 */
	.clearfix::after {
	    content:" ";
	    display:block;
	    visibility:hidden;
	    clear:both;
	    font-size:0;
	    height:0;
	}
	.clearfix{zoom:1; /* for IE6 IE7 */}

方法三：

	/* 放在浮动元素的父元素上 */
	.clearfix{
	    display:block;
	    zoom:1;
	    overflow:hidden;
	}

当然，这三种方法我都说出来了，只是当时第三种方法当时还没用过，主要用的第二种。这时面试官问了一个让自己觉得“自己弱爆了的问题”，问：为什么加 `zoom:1;`?

我知道它是为了兼容IE，但是面试官又追问：为什么加了 `zoom:1;` 就能兼容 IE？

这下，我彻底凌乱了，不知道，是一点都不知道，我居然从来没想过这个问题，只是想当然的这么用就对了。这让我明白了 “知其然，一定要知其所以然” ，我会在这方面加油。当然，面试官还是告诉我了：激活了 hasLayout。不过对我来说，还是相当模糊的，毕竟做 IE 兼容比较少，且没经历过 ie 6,7 的时代。如果想了解，请看来自 “愚人码头” 的 [hasLayout详解][8]。

####6.null和undefined相等吗？

这道题，还是理直气壮地：null == undefined true ; null === undefined false.

紧接着问 "==" 与 "===" 的区别？

"==" 是逻辑等于，而 "===" 是全等。逻辑等于在比较时会进行类型转换，而全等不会。

####7.统计一个字符串中每个字母的个数

当时想用两个 for 循环做，但最终卡壳了。

	/**
	 * [getEachLetterNum 获取一个字符串中每个字母的个数]
	 * @param  {[string or String]} str ["" or new String()]
	 * @return {[Array]}     [复合数组]
	 */
	function getEachLetterNum(str){
	    var tempStr=str.toString().split('');
	    var returnArray=[];
	    var re1=/[A-Za-z]/;
	    var i=0;
	    while(re1.test(tempStr.join(''))){  
	        if(re1.test(tempStr[i])){
	            var o=tempStr.join(''); var re2=new RegExp(tempStr[i],"g");
	            returnArray[tempStr[i]]=o.match(re2).length;
	            tempStr=o.replace(re2,'').split('');
	        }
	        else{
	            i++;
	        }
	    }
	    return returnArray;
	}

谁还有好的方法可以留言交流。

####8.说说IE兼容问题

关于这道题，没太深入研究过兼容问题，我认为未来是乐观的，没太必要为兼容问题耗费太多精力。就本博客来说，并不支持 ie6,7,8 并已经做好相关程序，如果您用以上浏览器，会跳转到一个页面，提示您升级浏览器，或者换高级浏览器。所以，这道题，只回答出了 IECC(conditional comment) 和 几个属性级的 hack，关于更多的 ie bug 的 hack ，没太用过，说出来自己都觉得怪怪的。

####9.今天周几？

1.单纯的switch

	var oDate=new Date();
	var day=oDate.getDay();
	switch(day){
	    case 0: document.write("今天是周日");break;
	    case 1: document.write("今天是周一");break;
	    case 2: document.write("今天是周二");break;
	    case 3: document.write("今天是周三");break;
	    case 4: document.write("今天是周四");break;
	    case 5: document.write("今天是周五");break;
	    default: document.write("今天是周六");break;
	}

2.数组方法

	var oDate=new Date();
	var day=oDate.getDay();
	var dayArray=[];
	dayArray[0]="周日";
	dayArray[1]="周一";
	dayArray[2]="周二";
	dayArray[3]="周三";
	dayArray[4]="周四";
	dayArray[5]="周五";
	dayArray[6]="周六";
	document.write("今天是"+dayArray[day]);

####10.JavaScript基本类型，如何判断某一变量是什么类型？

关于这道题，我当时只知道用 typeof 判断，而且 typeof 判断的并不准确。究其原因，主要是自己做的东西太少了，遇到的东西太少了，还有就是太过依赖于类库(jquery)。 所以，写了一篇专门针对的[笔记][9]。

[1]: /articles/youth-hotel/ "未名国际青年旅社"
[2]: http://www.ruanyifeng.com/blog/2012/10/javascript_module.html "Javascript模块化编程（一）：模块的写法"
[3]: /demos/bishi-baidu/ "my demo"
[4]: http://www.hujuntao.com/archives/inline-block-elements-the-4px-blank-gap-solution.html "设计蜂巢"
[5]: http://www.baiduux.com/blog/2010/06/21/web-storage%E5%85%A8%E8%A7%A3%E6%9E%90/ "BAIDU-UFO"
[6]: /articles/3D-jquery/ "JQuery插件之tags的3D旋转球制作"
[7]: http://www.hua126.com/article/edu/Web/info-1694.html "如何以CSS作出两栏版面布局"
[8]: http://www.css88.com/archives/1288 "hasLayout详解"
[9]: /articles/how-to-detect-variable-type "JavaScript如何判断变量类型"