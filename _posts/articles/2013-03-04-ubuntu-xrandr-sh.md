---
layout: articles
title: xrandr 命令小用
description: XRandR是 X Rotate and Reflect Extension（改变大小与旋转扩充）的缩写，用来在命令行界面中对linux系统中的 X窗口系统的多屏幕做出一些设定的软件，能更改外接屏幕的大小、分辨率等。因为要切换屏幕，你懂的...
category: articles
keywords: ubuntu
tags: [ubuntu]
---
##外接设备一览

在终端输入 `xrandr` ：

	LVDS connected (normal left inverted right x axis y axis)
	   1366x768       60.0 +
	   1360x768       60.0  
	   1280x768       60.0  
	   1280x720       60.0  
	   1024x768       60.0  
	   1024x600       60.0  
	   800x600        60.0  
	   800x480        60.0  
	   640x480        60.0  
	DFP1 disconnected (normal left inverted right x axis y axis)
	CRT1 connected 1920x1080+0+0 (normal left inverted right x axis y axis) 510mm x 287mm
	   1920x1080      60.0*+
	   1680x1050      60.0  
	   1400x1050      60.0  
	   1600x900       60.0  
	   1280x1024      75.0     60.0  
	   1440x900       60.0  
	   1280x960       75.0     60.0  
	   1152x864       60.0     75.0  
	   1280x768       75.0     60.0  
	   1280x720       75.0     60.0  
	   1024x768       75.0     60.0  
	   1024x600       75.0     60.0  
	   800x600        75.0     60.3  
	   800x480        75.0     60.3  
	   640x480        75.0     59.9 

说明：
	
	LVDS 就是笔记本的显示器输出(Low Voltage Differential Signaling，是一种低压差分信号技术接口)
	DTP1 就是笔记本的HDMI端口(High Definition Multimedia Interface，中文名称是高清晰多媒体接口)
    CRT1 就是笔记本上的VGA端口(Video Graphics Array，即视频图形阵列) =。= CRT是一种使用阴极射线管(Cathode Ray Tube）的显示器

##xrandr 命令常用方式如下：

打开外接显示器(最高分辨率)，与笔记本液晶屏幕显示同样内容（克隆）:
	
	xrandr --output CRT1 --same-as LVDS --auto  

打开外接显示器(分辨率为1024x768)，与笔记本液晶屏幕显示同样内容（克隆）:

	xrandr --output CRT1 --same-as LVDS --mode 1024x768  

打开外接显示器(最高分辨率)，设置为右侧扩展屏幕:

	xrandr --output CRT1 --right-of LVDS --auto  

关闭外接显示器:

	xrandr --output CRT1 --off  

打开外接显示器，同时关闭笔记本液晶屏幕（只用外接显示器工作）:

	xrandr --output CRT1 --auto --output LVDS --off  

关闭外接显示器，同时打开笔记本液晶屏幕 (只用笔记本液晶屏)

	xrandr --output CRT1 --off --output LVDS --auto  

##小结

由于在图形界面配置总是报错，所以。。。；如果命令没达到你想要的效果重启一下就可以了，貌似这里有问题，待测试：

* 先连VGA线，再开机
* 先开机，再连VGA线

经测试，对于我这个悲催的 `A卡` 来说，`先连VGA线，再开机` 是个不错的选择.