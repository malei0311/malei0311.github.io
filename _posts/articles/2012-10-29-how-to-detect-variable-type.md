---
layout: articles
title: JavaScript如何判断变量类型
description: JavaScript的主要数据类型、变量的传值与传址详解、内存的使用规则（堆和栈）详解、判断变量类型的实现。另外，对于Javascript的类型理解，有的地方还有些模糊，需要多看看权威的文章，加深理解。随着理解的加深，会不断修订。
category: articles
keywords: js,variable,type
tags: [js]
---
##数据类型

###简单数据类型

Boolean,Number,String,Undefined,Null

###复杂数据类型

Object

##变量的传值与传址

###按值传递

简单数据类型是按值进行传递的。当按值传递时，将在计算机内存分配一块空间并将原值复制到其中，这意味着变量的实际内容会传递给变量。然后即使改变原来的值，也不会影响复制到新变量中的值。

###按引用传递

复杂数据类型，可以包含大量和复杂的信息，所以属于此类型的变量并不包含实际的值，它包含的是对值得引用。这中引用类似于指向变量内容的别名（在一些程序语言中成为“指针”）。当变量需要知道他的值时，该引用会查询内容，然后返回答案，而无需将该值传递给变量。

当多个变量都指向这个复杂的数据类型时，实际上他们获得的只是对这个复杂数据类型的引用。当这个复杂数据类型被改变时，所有引用该复杂数据类型的变量都会获得一个新值。

	var theArray=["malei0311","teaScripts"];
	var newArray=theArray;
	alert(newArray[1]); //teaScripts
	theArray[1]="tom";
	alert(newArray[1]); //tom

##内存使用规则

堆和栈都是运行时内存中分配的一个数据区，因此也被称之为堆区和栈区，但两者存储的数据类型和处理速度不同。

堆 (heap) 用于为复杂数据类型分配空间，例如数组对象、Object对象。他是在运行时动态分配内存的，因此存取速度较慢。

栈 (stack) 主要存放一些基本类型的变量和对象的引用。其优势是存取速度比堆要快，并且栈内的数据可以共享。但缺点是存在栈中的数据大小与生存期必须是确定的，缺乏灵活性。

###栈

栈有一个很重要的特性，就是存在栈中的数据可以共享。例如：

	var a=1;
	var b=1;

JavaScript解释引擎先处理 `var a=1;` 首先会在栈中创建一个变量为 a 的引用，然后查找栈中是否有 1 这个值，如果没找到 1 ，就将 1 存放进来，然后将 a 指向 1 。接着处理 `var b=1;` 在创建完 b 的引用变量后，查找栈中是否有 1 这个值，因为在栈中已经存在了，便将 b 直接指向 1 。这样，就出现了 a 与 b 同时指向 1 的情况。

此时，如果再令 `a=2` 那么 JavaScript解释引擎会重新搜索栈中是否有 2 这个值，如果没有，就将 2 存放进来，并令 a 指向 2 ；如果已经有了，则直接将 a 指向这个地址。因此 a 值得改变不会影响到 b 的值。

###堆

通过 Array 来看一下堆的行为：

	var sport1="basketball";
	var sport2="football";
	var sport3="volleyball";
	var theArray=[sport1,sport2,sport3];
	var newArray=theArray;

当创建数组时，就会在堆内创建一个数组对象，并且在栈内创建一个对数组的引用。这几步操作对应的内存，如图：

![stack-heap](/images/articles/how-to-detect-variable-type/stack-heap.png)

变量 sport1,sport2,sport3 为基本数据类型，他们的值直接放在栈中；theArray,newArray 为复合数据类型，他们的引用变量存储在栈中，指向于存储于堆中的实际对象。

如果更改 newArray 或 theArray 的值，那么实际是更改堆中的实际对象，因此，对两个变量引用都会发生作用。

JavaScript堆不需要程序代码来显示的释放，因为堆是由自动的垃圾回收来负责的，每种浏览器中的JavaScript解释引擎有不同的自动回收方式，但一个基本的原则是，如果栈中不存在对堆中某个对象堆的引用，那么就会认为该对象已经不再需要，在垃圾回收时，就会清除该对象占用的空间。

因此，在不需要时，应该将对对象的引用释放掉，以利于垃圾回收，这样可以提高程序的性能。释放引用最常见的方法：`newArray=null;`

##进入正题

###测试环境

* Chrome 22
* Firefox 15
* IE 7,8,9

###JavaScript类型总览

![types](/images/articles/how-to-detect-variable-type/types.png)

###简单测试 typeof

接着[面试题][1]中的写，简单的测试 typeof

	var Tea = (function(){
	    function getElementsByClassName(className,tag,parent){}
	    function findSymmetryNumber(start,end){}
	    function getVarType(v){
	        return typeof(v);
	    }
	    return {
	        getElementsByClassName : getElementsByClassName,
	        findSymmetryNumber : findSymmetryNumber,
	        getVarType : getVarType
	    };
	})();

通过在控制台中进行测试，以下是测试结果截图：

Chrome:

![chrome-typeof](/images/articles/how-to-detect-variable-type/typeof-chrome.png)

Firefox:

![firefox-typeof](/images/articles/how-to-detect-variable-type/typeof-firefox.png)

IE:

![ie-typeof](/images/articles/how-to-detect-variable-type/typeof-ie.png)

我们可以看到在 JavaScript 的简单的数据类型中，只有 null 返回的的是 object ，其他的都是相当准确的。

我们知道 "JavaScript一切皆是对象"， 对于除了 Math(静态类) 的内建类，当我们用 new 关键字给变量赋值时， 例如：`var oString=new String("test");` => `typeof oString` 返回 object。类似的还有：

	var oBoolean=new Boolean(true);
	var oNumber=new Number(1234);
	var oArray1=new Array();
	var oArray2=[];
	var re1=new RegExp("\\w*","g");
	var re2=/\w*/g;

返回的都是 "object"，仅用 typeof ，我们无法知道，到底是什么。当然 typeof Math 返回的也是 "object"。但是，直接 `typeof 非静态内建类` 返回的却是 "function"。

###加入精确判断

方法一：

	function getVarType(v){
	    if(typeof v === 'object'){
	        if(v === null){return 'null';}
	        return Object.prototype.toString.call(v).match(/object\s(\w+)/)[1].toLowerCase();
	    }
	    return typeof(v);
	}

方法二：

	function getVarType(v){
	    if(typeof v === 'object'){
	        if(v === null){return 'null';}
	        if(v.constructor) 
	            //直接取出想要的，但是必须多取出一个空格，IE中 "function" 前面并不是空格，
	            //所以这就决定了取出的是自己想要的值，然后截取字符串
	            //return (v.constructor.toString()).match(/(?: )[\w\$]+/)[0].substr(1).toLowerCase(); 
	            //通过获取子表达式，取出自己想要的，因为IE在 "function" 前加了空字符，所以  "^\s*" 
	            //return v.constructor.toString().match(/^\s*function\s([\w\$]+)/)[1].toLowerCase(); // [注]
	            //match的正则表达式返回第一个匹配，所以 [注] 的 "^\s*" 可以去掉
	            return v.constructor.toString().match(/function\s([\w\$]+)/)[1].toLowerCase();
	        return "object";
	    }
	    return typeof(v);
	}

其实，IE在 "function" 前面加的是 "\n" 换行符。

如果说判断某个变量 s 是否为 Array 类型时，可以

	if(s instanceof Array){
	    //your code
	}

##Reference

* 《JavaScript权威指南》——张亚飞
* [再谈JavaScript的数据类型问题][2] ——aimingoo

[1]: /articles/baidu-examination/ "百度面试"
[2]: http://blog.csdn.net/aimingoo/article/details/6634977 "再谈JavaScript的数据类型问题"