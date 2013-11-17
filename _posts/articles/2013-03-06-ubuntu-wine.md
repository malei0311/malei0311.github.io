---
layout: articles
title: wine 你懂的
description: Wine （“Wine Is Not an Emulator” 的首字母缩写）是一个能够在多种 POSIX-compliant 操作系统（诸如 Linux，Mac OSX 及 BSD 等）上运行 Windows 应用的兼容层。 Wine 不是像虚拟机或者模拟器一样模仿内部的 Windows 逻辑，而是將 Windows API 调用翻译成为动态的 POSIX 调用，免除了性能和其他一些行为的内存占用，让你能够干净地集合 Windows 应用到你的桌面
category: articles
keywords: ubuntu
tags: [ubuntu]
---
##bug:=。=:solve

you know, my ubuntu => 12.10 64bit

![wine logo][4] Wine Cheers!

###bug详情：

p11-kit: couldn't load module: /usr/lib/i386-linux-gnu/pkcs11/gnome-keyring-pkcs11.so: /usr/lib/i386-linux-gnu/pkcs11/gnome-keyring-pkcs11.so: 无法打开共享对象文件: 没有那个文件或目录

###解决方案：

1) 安装 getlibs:

	wget https://launchpadlibrarian.net/53907140/getlibs_2.06-0ubuntu1~ppa2_all.deb
	sudo dpkg -i getlibs_2.06-0ubuntu1~ppa2_all.deb

2)安装 32bit 库:

	sudo getlibs -p gnome-keyring:i386

如果遇到此错误:

	Failed to download file http://mirrors.kernel.org/ubuntu/pool/main/g/gnome-keyring/gnome-keyring_3.4.1-4ubuntu1~precise1_i386.deb

请在这下载:

	wget https://launchpad.net/~gnome3-team/+archive/gnome3/+files/gnome-keyring_3.4.1-4ubuntu1~precise1_i386.deb
	
然后:

	getlibs -i "path-of-the-file"/gnome-keyring_3.4.1-4ubuntu1~precise1_i386.deb

如果所给链接损坏，请在这搜：https://launchpad.net

3) 生成符号链接:

	sudo mkdir -p /usr/lib/i386-linux-gnu/pkcs11/ 
	sudo ln -s /usr/lib32/i386-linux-gnu/pkcs11/gnome-keyring-pkcs11.so /usr/lib/i386-linux-gnu/pkcs11/gnome-keyring-pkcs11.so

O啦!

###当遇到这个bug时

	fixme:winediag:AUDDRV_GetAudioEndpoint Winepulse is not officially supported by the wine project
	fixme:winediag:AUDDRV_GetAudioEndpoint For sound related feedback and support, please visit http://ubuntuforums.org/showthread.php?t=1960599

bug中给了链接，照着链接中的做，可解

## 几个常用命令

	winecfg
	winefile
	wine uninstaller
	wine xxoo.exe

##结论

wine 不如 virtualbox 安装的 xp 好用

## Reference

* [Wine Documentation][1]
* [Wine can't find gnome-keyring-pkcs11.so][2]
* [Winepulse][3]

[1]: https://help.ubuntu.com/community/Wine "Wine Documentation"
[2]: http://askubuntu.com/questions/127848/wine-cant-find-gnome-keyring-pkcs11-so "Wine can't find gnome-keyring-pkcs11.so"
[3]: http://ubuntuforums.org/showthread.php?t=1960599 "winepulse"
[4]: /images/articles/ubuntu-wine/wine.png "wine logo"