---
layout: articles
title: ubuntu 禁用 thinkpad e430 触摸板
description: 笔记本有触摸板，使用笔记本上的键盘会很不爽，还是用指点杆 + 键盘比较爽
category: articles
keywords: thinkpad,e430,ubuntu
tags: [ubuntu, thinkpad]
---

##请打开终端

	ctrl + alt + t

##输入

	xinput

output:

	⎡ Virtual core pointer                    	id=2	[master pointer  (3)]
	⎜   ↳ Virtual core XTEST pointer              	id=4	[slave  pointer  (2)]
	⎜   ↳ ThinkPad USB Travel Mouse               	id=10	[slave  pointer  (2)]
	⎜   //注意下面一行的id在后面的命令中要用
	⎜   ↳ SynPS/2 Synaptics TouchPad              	id=13	[slave  pointer  (2)]
	⎜   ↳ TPPS/2 IBM TrackPoint                   	id=15	[slave  pointer  (2)]
	⎣ Virtual core keyboard                   	id=3	[master keyboard (2)]
	    ↳ Virtual core XTEST keyboard             	id=5	[slave  keyboard (3)]
	    ↳ Power Button                            	id=6	[slave  keyboard (3)]
	    ↳ Video Bus                               	id=7	[slave  keyboard (3)]
	    ↳ Video Bus                               	id=8	[slave  keyboard (3)]
	    ↳ Power Button                            	id=9	[slave  keyboard (3)]
	    ↳ Integrated Camera                       	id=11	[slave  keyboard (3)]
	    ↳ AT Translated Set 2 keyboard            	id=12	[slave  keyboard (3)]
	    ↳ ThinkPad Extra Buttons                  	id=14	[slave  keyboard (3)]

##接下来

	xinput list-props 13 | grep Enabled

output:

		Device Enabled (137):	1   //说明是开启状态

##最后

	xinput set-prop 13 137 0

O了，检查一下：

	xinput list-props 13 | grep Enabled

output:

		Device Enabled (137):	0
