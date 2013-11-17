---
layout: articles
title: Solve stdout：No space left on device && Error：watch ENOSPC
description: ...
category: articles
keywords: ubuntu
tags: [ubuntu]
---

## 总述

今天遇到两个问题，列一下

## 安装东西时

### 现象

```
sudo apt-get install ***

gzip: stdout: No space left on device            
E: mkinitramfs failure cpio 141 gzip 1
```

no space? 好吧，看一下空间

```
df -h

文件系统                       容量   已用  可用   已用% 挂载点
/dev/mapper/ubuntu--vg-root  451G   44G  384G   11% /
none                         4.0K     0  4.0K    0% /sys/fs/cgroup
udev                         3.7G   12K  3.7G    1% /dev
tmpfs                        759M  948K  758M    1% /run
none                         5.0M     0  5.0M    0% /run/lock
none                         3.8G  2.8M  3.8G    1% /run/shm
none                         100M   24K  100M    1% /run/user
/dev/sda1                    228M  216M   12M   95% /boot
/home/malei/.Private         451G   44G  384G   11% /home/malei
```

### 解决

当更新 ubunbu 时，升级的内核会都存在 `/boot` 下，时间长了，升级的次数多了，满了。。。，列出你已经安装的 kernel：

```
aptitude search ~ilinux-image 

uname -a // 可见你的当前的内核

sudo apt-get autoremove linux-image-3.8.0-19-generic
```

remove one by one,don't remove packages such as `linux-image-generic` and just the previous one of the kernel you are using

## Meteor

### 现象

```
meteor

.meteor/tools/3cba50c44a/tools/run.js:425
    throw e;
          ^
Error: watch ENOSPC
```

### 解决

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
You have run out of watches: The system has a limit to how many files can be watched by a user.This command increases the maximum amount of watches a user can have.

## Reference

* [问题1](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)
* [问题2](http://askubuntu.com/questions/223248/boot-low-on-disk-space)