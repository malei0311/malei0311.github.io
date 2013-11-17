---
layout: articles
title: Node.js的调试
description: Node.js的调试，作为备忘
category: articles
keywords: nodejs, debug
tags: [nodejs]
---
##Node.js调试 - 命令界面
###Node.js调试命令一览

	命令                                       功能
	run ------------------------------------- 执行脚本,在第一行暂停
	restart --------------------------------- 重新执行脚本
	cont, c --------------------------------- 继续执行,直到遇到下一个断点
	next, n --------------------------------- 单步执行
	step, s --------------------------------- 单步执行并进入函数
	out, o ---------------------------------- 从函数中步出
	setBreakpoint(), sb() ------------------- 在当前行设置断点
	setBreakpoint(‘f()’), sb(...) ----------- 在函数f的第一行设置断点
	setBreakpoint(‘script.js’, 20), sb(...) - 在 script.js 的第20行设置断点
	clearBreakpoint, cb(...) ---------------- 清除所有断点
	backtrace, bt --------------------------- 显示当前的调用栈
	list(5) --------------------------------- 显示当前执行到的前后5行代码
	watch(expr)  ---------------------------- 把表达式 expr 加入监视列表
	unwatch(expr) --------------------------- 把表达式 expr 从监视列表移除
	watchers -------------------------------- 显示监视列表中所有的表达式和值
	repl ------------------------------------ 在当前上下文打开即时求值环境
	kill ------------------------------------ 终止当前执行的脚本
	scripts --------------------------------- 显示当前已加载的所有脚本
	version --------------------------------- 显示 V8 的版本

###新建js文件，并调试之
	
	$ > node-debug.js
	$ vi node-debug.js

随便写一点...

	var debugFoo = 'Node.js'
	,debugBar = '~'
	,debugFun = function(xxoo){
	    console.log('I love you ' + xxoo + debugBar);
	}

	debugFun(debugFoo);

启动调试

	$ node debug node-debug.js

###结果

接下来就是胡乱的玩一下，玩熟了就可以应用到实际的调试过程中了

	< debugger listening on port 5858
	connecting... ok
	break in node-debug.js:1
	  1 var debugFoo = 'Node.js'
	  2 ,debugBar = '~'
	  3 ,debugFun = function(xxoo){
	debug> sb(3)
	  1 var debugFoo = 'Node.js'
	  2 ,debugBar = '~'
	* 3 ,debugFun = function(xxoo){
	  4     console.log('I love you ' + xxoo + debugBar);
	  5 }
	  6 
	debug> c
	break in node-debug.js:7
	  5 }
	  6 
	  7 debugFun(debugFoo);
	  8 
	  9 });
	debug> s
	break in node-debug.js:4
	  2 ,debugBar = '~'
	* 3 ,debugFun = function(xxoo){
	  4     console.log('I love you ' + xxoo + debugBar);
	  5 }
	  6 
	debug> repl
	Press Ctrl + C to leave debug repl
	> xxoo
	'Node.js'
	> de
	decodeURI           decodeURIComponent  

	debugBar            

	> debugBar
	'~'
	debug> c
	< I love you Node.js~
	program terminated

##Node.js调试 - 图形界面

想更爽，玩的成本更低的调试 -。- 

###使用node-inspector

node-inspector 是一个完全基于 Node.js 的开源在线调试工具,提供了强大的调试功能和友好的用户界面,它的使用方法十分简便。

	$ npm install -g node-inspector //(时间略长)

安装完成之后

	$ node --debug-brk=5858 node-debug.js
	//(=5858可以不写，因为默认就是他，当然也可以写成别的)

在另一个终端中

	$ node-inspector

###浏览器中访问

有提示的，很爽

	"http://0.0.0.0:8080/debug?port=5858"

这样，就可以用熟悉的环境和方法，调试了

###截图

![nodejs-debug-chrome](/images/articles/nodejs-debug/nodejs-debug-chrome.png "在chrome中调试Node.js")

##结语

还是图形界面爽啊!