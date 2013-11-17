---
layout: articles
title: 郁闷的一天 大战 git review
description: 准确的说是 升级 ubuntu 13.04 后，昨天 凌晨 git review bug，在各路大神的帮助下，搞定了，thanks list： xcl,yjx,xcy
category: articles
keywords: ubuntu
tags: [ubuntu]
---

## 总述

伴着昨天的问题入睡啊，张开眼，随之而来的就是郁闷的一天。。。how  to get rid of it, let's go...

## 问题描述

### 情况一 UnicodeEncodeError

    Traceback (most recent call last):
      File "/usr/bin/git-review", line 1170, in <module>
        print(e)
    UnicodeEncodeError: 'ascii' codec can't encode characters in position 180-183: ordinal not in range(128)

just google it, you can get some resolution:

#### No.1 在文件的前几行加上，这里加在 /usr/bin/git-review 中


    import sys
    reload(sys)
    sys.setdefaultencoding('utf-8')


#### No.2 号称可以重启后，也是 utf8 编码，可是在我这不 work。python的 /usr/local/lib/python2.7/site-packages 文件夹下新建一个 sitecustomize.py，内容为：


    # encoding=utf8  
    import sys  
      
    reload(sys)  
    sys.setdefaultencoding('utf8')


另外，ubuntu13.04 存在两个版本的 python:

* python 2.7.*;
* python 3.3.*

默认是 python2.7，默认编码 ascii； python3 默认编码 utf8

    $ cd /usr/bin && ll python* // you will see details
    // test default encoding
    $ python
    >>> import sys
    >>> sys.getdefaultencoding() // 'ascii'

    $ python3
    >>> import sys
    >>> sys.getdefaultencoding() // 'utf-8'

### 情况二 

when I : `$ git review` or `$ git review -s` , it feedback me:

    Problems encountered installing commit-msg hook
    The following command failed with exit code 1
        "scp -P None :hooks/commit-msg .git/hooks/commit-msg"
    -----------------------
    cp: 无法获取":hooks/commit-msg" 的文件状态(stat): 没有那个文件或目录

when I :  `ssh -p 29418 username@review.*****.com` (username is your username of gerrit), it feedback me: 

      ****    Welcome to Gerrit Code Review    ****

      Hi Ma Lei, you have successfully connected over SSH.

      Unfortunately, interactive shells are disabled.
      To clone a hosted Git repository, use:

      git clone ssh://malei0311@review.*****.com:29418/REPOSITORY_NAME.git

    Connection to review.*****.com closed.


so.....,how to do ?

according to the feedback message:

    cp: 无法获取":hooks/commit-msg" 的文件状态(stat): 没有那个文件或目录

let's just create the file `commit-msg`. 

    $ ll .git/hooks/
    // you will see commit-msg.sample
    $ cd .git/hooks && cp commit-msg.sample commit-msg && cd -
    $ git review // wow, success!

##结语

郁闷的一天，纠缠于 `git-review`，唉，悲剧。。。