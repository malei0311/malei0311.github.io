---
layout: articles
title: Some Interesting Terminal Command in Linux 
description: It's interesting, right?
category: articles
keywords: ubuntu
tags: [ubuntu]
---

## 总述

在 linux 的终端中，好多有意思的东西，那就尝试一下吧！

## Commands list

### Irssi

一个 IRC 客户端，[上篇文章](/articles/a-brief-introduce-to-irc/)有详细介绍

### Finch

pidgin 的终端版本:

````
┌─────┤好友列表├──────┐             
│+ 好友             ▒│                                                         
│+ 网络中心          ▒│                                                          
│+ 高中同学          ▒│                                                        
│+ 大学同学           ▒┌┤大学同学├┐                                              
│+ 聊天              ▒│在线：8    │                                       
│                   ▒│总计：36   │                                    
│                   ▒└──────────┘ 
│                   ▒│                                              
│                   ▒│                                            
│                   ▒│
│                   ▒│
│                   ▒│
│                    │                                                         
│┌──────────────────┐│                                 
││可用              ↓││
│└──────────────────┘│                                                       
│____________________│
└────────────────────┘
````

### Fortune

````
$ sudo apt-get install fortune
$ fortune
In Marseilles they make half the toilet soap we consume in America, but
the Marseillaise only have a vague theoretical idea of its use, which they
have obtained from books of travel.
                -- Mark Twain
````

### Figlet && Toilet

````
$ sudo apt-get install figlet
$ figlet WEBCRAFT
__        _______ ____   ____ ____      _    _____ _____ 
\ \      / / ____| __ ) / ___|  _ \    / \  |  ___|_   _|
 \ \ /\ / /|  _| |  _ \| |   | |_) |  / _ \ | |_    | |  
  \ V  V / | |___| |_) | |___|  _ <  / ___ \|  _|   | |  
   \_/\_/  |_____|____/ \____|_| \_\/_/   \_\_|     |_|  

$ cd /usr/share/figlet
$ figlet -f ascii12.tlf -w 100 WEBCRAFT

'mm      mm mmmmmmmm  mmmmmm       mmmm   mmmmmm       mm     mmmmmmmm  mmmmmmmm 
 ##      ## ##""""""  ##""""##   ##""""#  ##""""##    ####    ##""""""  """##""" 
 "#m ## m#" ##        ##    ##  ##"       ##    ##    ####    ##           ##    
  ## ## ##  #######   #######   ##        #######    ##  ##   #######      ##    
  ###""###  ##        ##    ##  ##m       ##  "##m   ######   ##           ##    
  ###  ###  ##mmmmmm  ##mmmm##   ##mmmm#  ##    ##  m##  ##m  ##           ##    
  """  """  """"""""  """""""      """"   ""    """ ""    ""  ""           ""' 
$ ls // 可以看见字体
$ toilet -f mono9.tlf -F metal WEBCRAFT

▄     ▄ ▄▄▄▄▄▄ ▄▄▄▄▄    ▄▄▄  ▄▄▄▄▄    ▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄▄
█  █  █ █      █    █ ▄▀   ▀ █   ▀█   ██   █        █   
▀ █▀█ █ █▄▄▄▄▄ █▄▄▄▄▀ █      █▄▄▄▄▀  █  █  █▄▄▄▄▄   █   
 ██ ██▀ █      █    █ █      █   ▀▄  █▄▄█  █        █   
 █   █  █▄▄▄▄▄ █▄▄▄▄▀  ▀▄▄▄▀ █    ▀ █    █ █        █   
                                                       
````

### Cowsay && Cowthink

* -d   死掉的母牛
* -b   瞎眼母牛？
* -g   财迷母牛
* -p   多疑的母牛
* -s   喝醉的母牛
* -t   疲劳母牛
* -w   吃惊的母牛
* -y   小母牛



````
$ sudo apt-get install cowsay
$ cd /usr/share/cowsay/cows && ls // you will see all files
// or
$ cowsay -l // you will see also
$ uptime | cowsay -f kiss
 _____________________________________
/  23:56:10 up 5 days, 1:23, 6 users, \
\ load average: 1.22, 1.16, 1.17      /
 -------------------------------------
     \
      \
             ,;;;;;;;,
            ;;;;;;;;;;;,
           ;;;;;'_____;'
           ;;;(/))))|((\
           _;;((((((|))))
          / |_\\\\\\\\\\\\
     .--~(  \ ~))))))))))))
    /     \  `\-(((((((((((\\
    |    | `\   ) |\       /|)
     |    |  `. _/  \_____/ |
      |    , `\~            /
       |    \  \           /
      | `.   `\|          /
      |   ~-   `\        /
       \____~._/~ -_,   (\
        |-----|\   \    ';;
       |      | :;;;'     \
      |  /    |            |
      |       |            |
````

### Cmatrix

````
$ sudo apt-get install cmatrix
$ cmatrix
// it's cool
````

### Jp2a

````
$ sudo apt-get install jp2a
$ jp2a --width=50 logoOfshijiazhuangTieDaoUniversity.jpg

"NWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWN
 WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW
 WMMMMMMMMMMMMMMMMMW0ko:;,;::',;cdOXMMMMMMMMMMMMMMW
 WMMMMMMMMMMMMMMXd;.;oc..'clc...,d:.'ckWMMMMMMMMMMW
 WMMMMMMMMMMMMO:o'..,o,:odkkOxdll:.....,lXMMMMMMMMW
 WMMMMMMMMMMK;..,d:ck0Odc;,,,;:lx00d;:o:..lWMMMMMMW
 WMMMMMMMMMd;:'..oXk;''',lxk0000Oxod00:.',:cXMMMMMW
 WMMMMMMMMo.;o,;XO,'',dXMMMMMMMMMMMMWXMk:cc;'KMMMMW
 WMMMMMMMO...,:Wo'''dWMXkkkkkkkkkkNMMMMM0....,WMMMW
 WMMMMMMM;....Xk'''kMMWdc''lo,';o''KMMMMMo....xMMMW
 WMMMMMMN....;Ml;;:MMMM0,'OWl'cWM,'0MMMMMK....cMMMW
 WMMMMMMN.';.;MMMMMMMMk';XW:'oMNc'oMXlll0K.,;.cMMMW
 WMMMMMMM,;o,.NMMMMMMo':NX;':xc':0MMl'''Xx.:,.dMMMW
 WMMMMMMMx.::.cMMMMMKxkWWdoodx0NMMWo'''xX',l,'NMMMW
 WMMMMMMMMc':;.cWWWMMMMMMMMMMMMMWk;'',OK,'l;.OMMMMW
 WMMMMMMMMWc'c;',kKkxOKNWWWNXOxc''',dKo.,c;'OMMMMMW
 WMMMMMMMMMMk',l;',d0Oo:''''''',cdOOc.,:c';XMMMMMMW
 WMMMMMMMMMMMWd';;c;'':oxkkkkkkxl;..;:c';OMMMMMMMMW
 WMMMMMMMMMMMMMWOc,;;;..;,,;';':::...,oKMMMMMMMMMMW
 WMMMMMMMMMMMMMMMMWKxl:,,'':';',;coOXMMMMMMMMMMMMMW
 WMMMMMMMMMMMMMMMMMMMMMMMWNXNNWMMMMMMMMMMMMMMMMMMMW
 WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW
 NWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWN"
````
### Bb

````
$ sudo apt-get install bb
$ bb // amazing!!!
````

## Over

Oops!!!
