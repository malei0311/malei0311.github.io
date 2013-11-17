---
layout: articles
title: ubuntu配置github+git+jekyll环境
description: 今天突发兴致，想在 ubuntu 上 玩玩 git + jekyll 的搭建，主要还是想用单纯的命令行学学 git，于是乎，着手干，是也。
category: articles
keywords: git,jekyll,ubuntu,linux
tags: [git, ubuntu]
---
##总述

在 windows 中，如果我们只是在本地完成编码，然后在 github 上看效果，那么我们只需安装 [github for windows](http://windows.github.com/) 就可以了。如果要在本地编码调试还要看效果，那么推荐安装 RailsInstaller，里面包含了 Ruby、Rails、Bundler、Git、Sqlite、TinyTDS、SQL Server support 和 DevKit。我在 wnidows 用的是 github for windows + RailsInstaller 的方式，既有很好的本地与 github 交互的 metro 风格的客户端，又有在本地调试预览的环境。由于禁不住  metro 风格的诱惑，总是在用 metro 风格的客户端，git 命令到没怎么学，为了加强一下命令学习，遂玩一下 ubuntu 版的 git + github +jekyll。

##安装 ruby 环境

[下载并安装 ruby](http://www.ruby-lang.org/zh_cn/downloads/)

如果按照官网上的方法

	$ sudo apt-get install ruby irb rdoc

稍微对配置做一下修改，把淘宝的镜像加到gem的镜像列表里

    $ gem sources --remove http://rubygems.org/
    $ gem sources -a http://ruby.taobao.org/

然后用gem sources -l看看现在源列表

    *** CURRENT SOURCES ***

    http://ruby.taobao.org

在终端输入 `ruby -v` 或 `irb` 或 `gem -v` 或 `which gem`，你会发现， ruby 已经安装好了。但是，当 `sudo gem install jekyll` 时，会报错 

	ERROR:  Error installing jekyll:
	ERROR:  Failed to build gem native extension.
	....

解决方案：

	$ sudo apt-get install ruby-dev

solve the problem perfectly!

如果你想用 RDiscount 取代 Maruku 作为你的Markdown标记语言转换引擎，只需确认安装：

    $ gem install rdiscount

并通过以下命令行参数执行Jekyll：

    $ jekyll --rdiscount

或者也可以在你站点下的 _config.yml 文件中加入以下配置，以便以后每次执行时不必再指定命令行参数：

    markdown: rdiscount

##配置和使用github

###1、安装 git

	$ sudo apt-get install git

###2、检查SSH keys的设置

首先我们需要检查你电脑上现有的ssh key：

    $ cd ~/.ssh

如果显示“No such file or directory”，跳到第四步，否则继续。

###3、备份和移除原来的ssh key设置：

因为已经存在key文件，所以需要备份旧的数据并删除：

    $ ls
    config id_rsa id_rsa.pub known_hosts
    $ mkdir key_backup
    $ cp id_rsa* key_backup
    $ rm id_rsa*

###4、生成新的SSH Key：

输入下面的代码，就可以生成新的key文件，我们只需要默认设置就好，所以当需要输入文件名的时候，回车就好。

    $ ssh-keygen -t rsa -C "邮件地址@youremail.com"
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):<回车就好>

然后系统会要你输入加密串（Passphrase）：

    Enter passphrase (empty for no passphrase):<输入加密串>
    Enter same passphrase again:<再次输入加密串>

最后看到这样的界面，就成功设置ssh key了： 

![ubuntu-git](/images/articles/ubuntu-github-git-jekyll/ubuntu-git.png)

###5、添加SSH Key到GitHub：

在本机设置SSH Key之后，需要添加到GitHub上，以完成SSH链接的设置。

	$ cat ~/.ssh/id_rsa.pub

然后，复制其中的内容到 Account settings -> SSH Keys，自己起一个能标识的名字，add 就可以了。

###6、修改信息

    $ git config --global user.name "malei0311"
    $ git config --global user.email "leiman0311@gmail.com"

##Clone自己的库

* git clone git@github.com:malei0311/myBlog.git
* git add .表示添加当前目录下的所有文件
* git commit -am "message" 表示提交所有更改，这是提交到本地，”message” 换成自己的注释信息
* git push 把在本地的更改提交到远程服务器