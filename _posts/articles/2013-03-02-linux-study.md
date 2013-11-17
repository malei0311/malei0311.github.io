---
layout: articles
title: 菜鸟学习linux
description: 完全切换到 linux(ubuntu) 了，不得不多学一点命令了...，包括 kvm vs vbox、查看进程或端口、对一个文件夹下的目录和文件分别赋权限等
category: articles
keywords: ubuntu
tags: [ubuntu]
---
##总述

昨天重装系统:64位ubuntu（为了便于开发，支持8G内存），在同事帮忙配置开发环境的时候，看着他们一路命令敲下来，真是酷啊，于是一冲动，卸载了原来的 win7 + ubuntu(32bit) 双系统，开始了纯正的 linux 之旅. 先坦白一下历经坎坷的 `dell` 小本的血泪史:

* 2011年元旦，它拔山涉水，从石家庄的中山路来到了北二环
* 由纯正的 win7 血统 => win7旗舰版(伪)
* => vmware 虚拟机上装着各种系统的杂乱
* => win7 + ubuntu的双系统
* (小插曲)大四上半学期快结束的时候:2011-12-09:跟我来到了帝都
* => 完全开源的世界 linux(ubuntu) =。= EOF;
* // 内存：2G => 2G * 2 => 4G * 2

听说《鸟哥的linux私房菜》不错，可以在闲的无聊的时候看一看...

##KVM vs VirtualBox

###Deferences

vbox 是由 qemu 改写而成，包含大量 qemu 代码。

* 可以使用于"不支持"虚拟化技术的cpu。
* 值得说的一点：vbox 在图形方面比较好，能进行2D 3D加速。
* 但cpu控制不理想（估计是因为图形支持的缘故）。
* 操作上有独立的图形界面，易于上手。

kvm(Kernel-based Virtual Machine) 是linux内核包含的东西，使用qemu作为上层管理（命令行）。

* 要求 cpu 必须支持虚拟化。
* 性能：作为服务器很好，可是图形能力十分的差。即使放电影，图像也是像刷油漆一样，一层一层的。
* cpu使用率控制很好。
* 控制上比较简洁，功能比较丰富：比如使用 “无敌功能” 所有更改指向内存，你的镜像永远保持干净。 “母镜像”功能让你拥有n个独立快照点。还有很多参数。另外，kvm作为内核级的虚拟机，刚开始发展关注的公司比较多——但是还没有达到商业应用的水平。

总体而言：在支持 虚拟化 的情况下，vbox 和 kvm 的性能差不多，主要是面向对象不同：kvm使用于服务器，vbox使用于桌面应用。

如果要看性能对比：[Ubuntu 11.10 Xen、KVM 和 VirtualBox 比拼][1]

这里详细学一下 KVM，官网有详细的教程 [传送门][2]

###Fix BUG

by the way,当安装 VirtualBox 增强功能时，报这个错误：

	Failed to open the CD/DVD image /home/malei/.VirtualBox/VBoxGuestAdditions_4.1.18.iso.
	The medium '/home/malei/.VirtualBox/VBoxGuestAdditions_4.1.18.iso' can't be used as the requested device type

我们可以这样解决：

	sudo apt-get install virtualbox-guest-additions

##常用命令一览

他们很简单，但是初学者，你懂的

###某端口被占用

	sudo netstat -antup | grep <要查询的端口>

####example:

查找 `3306` 端口被谁占用了:

	sudo netstat -antup | grep 3306

结果:

	tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN      4090/mysqld 

`4090` 就是他的端口

	kill 4090

杀掉他就行了

如果不放心，在杀之前

	ps -ef | grep mysqld

果然，是那个进程号，杀对了

###对一个文件夹下的目录和文件分别赋权限

#### shell 脚本

写一个脚本(给他可执行的权限)，命名为 chmod.sh  放在目的路径下

	for a in $(find .)
	do
		if [ -d "$a" ]
			then
				chmod 755 $a
			else
				chmod 644 $a
		fi
	done

然后(貌似遇到文件或目录中有空格的 =。= 不行)

	./chmod.sh

完事

####避免麻烦，直接在 terminal 中敲命令

	find . -type d -exec chmod 755 {} \;
	find . -type f -exec chmod 644 {} \;

搞定

##源

	deb http://mirrors.163.com/ubuntu/ quantal main restricted  
	deb-src http://mirrors.163.com/ubuntu/ quantal main restricted  
	deb http://mirrors.163.com/ubuntu/ quantal-updates main restricted  
	deb-src http://mirrors.163.com/ubuntu/ quantal-updates main restricted  
	deb http://mirrors.163.com/ubuntu/ quantal universe  
	deb-src http://mirrors.163.com/ubuntu/ quantal universe  
	deb http://mirrors.163.com/ubuntu/ quantal-updates universe  
	deb-src http://mirrors.163.com/ubuntu/ quantal-updates universe  
	deb http://mirrors.163.com/ubuntu/ quantal multiverse  
	deb-src http://mirrors.163.com/ubuntu/ quantal multiverse  
	deb http://mirrors.163.com/ubuntu/ quantal-updates multiverse  
	deb-src http://mirrors.163.com/ubuntu/ quantal-updates multiverse  
	deb http://mirrors.163.com/ubuntu/ quantal-backports main restricted universe multiverse  
	deb-src http://mirrors.163.com/ubuntu/ quantal-backports main restricted universe multiverse  
	deb http://mirrors.163.com/ubuntu/ quantal-security main restricted  
	deb-src http://mirrors.163.com/ubuntu/ quantal-security main restricted  
	deb http://mirrors.163.com/ubuntu/ quantal-security universe  
	deb-src http://mirrors.163.com/ubuntu/ quantal-security universe  
	deb http://mirrors.163.com/ubuntu/ quantal-security multiverse  
	deb-src http://mirrors.163.com/ubuntu/ quantal-security multiverse  
	deb http://extras.ubuntu.com/ubuntu quantal main  
	deb-src http://extras.ubuntu.com/ubuntu quantal main

##结语

[1]: http://os.51cto.com/art/201203/324172.htm "Ubuntu 11.10 Xen、KVM 和 VirtualBox 比拼"
[2]: http://wiki.ubuntu.org.cn/Kvm%E6%95%99%E7%A8%8B "Kvm 教程"