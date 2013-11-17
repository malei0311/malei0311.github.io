---
layout: articles
title: Install Oracle Java JDK 7 in Ubuntu 13.04
description: Ubuntu use openjdk, but some software(eg:webstrom) need java-jdk, so let's install it.
category: articles
keywords: ubuntu
tags: [ubuntu]
---

## OpenJDK

OpenJDK是甲骨文公司公司为Java平台构建的Java开发环境的开源版本，完全自由，开放源码。Sun公司在2006年的JavaOne大会上称将对Java开放源代码，于2009年4月15日正式发布OpenJDK。2009年7月，Ubuntu 9.04中的二进制版本OpenJDK在Java SE 6 JCK中通过了所有的兼容性测试。

## Download

You can download it [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

## Extract the file

````
sudo mkdir -p /usr/lib/jvm
sudo tar -xf jdk-7u25-linux-x64.tar.gz -C /usr/lib/jvm/
````

## Install

````
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.7.0_25/bin/java" 1
sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.7.0_25/bin/javac" 1
sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/lib/jvm/jdk1.7.0_25/bin/javaws" 1
````

## Check

````
java -version
````

* If it shows you the correct version which you just downloaded and installed, it seems to have installed completely.
* If it shows you an old or another version of java which is not what you want , do like this: 

````
sudo update-alternatives --config java
sudo update-alternatives --config javac 
sudo update-alternatives --config javaws
````

just choose the right directory

## Finally enable firefox plugin

````
mkdir ~/.mozilla/plugins
ln -s /usr/lib/jvm/jdk1.7.0_25/jre/lib/amd64/libnpjp2.sp ~/.mozilla/plugins
````

verify it: [click me](http://java.com/en/download/installed.jsp)

![verified-java-version](/images/articles/install-jdk7-in-ubuntu/verified-java-version.png)