---
layout: articles
title: shell 之重定向
description: 还是从 goagent 的那条nohup 入手
category: articles
keywords: ubuntu
tags: [ubuntu]
---

## 总述

在前面的文章学习 [screen](/articles/screen-sh/) 时，已经用过 `nohup` 。不过，像那么用，每次他都会写入默认的 nohup.out 文件中，并且每次都是叠加的，这么就造成一个可见的丑陋的文件无休止的增大，( ︶︿︶)_╭∩╮，那么就让他隐藏吧....

## 开始

````
nohup python /home/malei/programs/goagent/local/proxy.py > .nohup.out 2>&1 &
````

这样就好了，看不见那个令人不愉快的文件，且每次都是重写的，不会变得相当大了，︵(@￣︶￣@)︵。这种写法是 重定向标准输出和错误到同一个文件，详情，如下 ⟱

## 重定向标准输出和错误到同一个文件

### 旧版 shell

可能有这种情况，我们希望捕捉一个命令的所有输出到一个文件。为了完成这个，我们 必须同时重定向标准输出和标准错误。有两种方法来完成任务。第一个，传统的方法， 在旧版本 shell 中也有效：

````
ls -l /bin/usr > ls-output.txt 2>&1
````

使用这种方法，我们完成两个重定向。首先重定向标准输出到文件 ls-output.txt，然后 重定向文件描述符2（标准错误）到文件描述符1（标准输出）使用表示法 `2>&1`。

注意重定向的顺序安排非常重要。标准错误的重定向必须总是出现在标准输出 重定向之后，要不然它不起作用。上面的例子，

````
>ls-output.txt 2>&1
````

重定向标准错误到文件 ls-output.txt，但是如果命令顺序改为：

````
2>&1 >ls-output.txt
````

则标准错误定向到屏幕。

### 新版 shell

现在的 bash 版本提供了第二种方法，更精简合理的方法来执行这种联合的重定向。

````
ls -l /bin/usr &> ls-output.txt 
````

在这个例子里面，我们使用单单一个表示法 &> 来重定向标准输出和错误到文件 ls-output.txt。

## 结语

入门级别的学习，Θ_Θ。比起 《鸟哥的 Linux 私房菜》，推荐下面这个简短轻快的读物，见 Reference。

## Reference

* [The Linux Command Line](http://billie66.github.io/TLCL/book/zh/chap07.html)