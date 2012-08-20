---
layout: articles
title: PHP随机显示图片（目录不限深度）
description: 编写 ReadImage 类来具体实现，随机显示站点图片目录中的 picture ，注：目录不限深度
category: articles
tags: [php]
---
##总述
这是在 jekyll 引擎上的第一篇正式博文，也作为一篇测试文章(测试隔年文章的显示效果)，故意把时间调整到了 2011-12-31。此篇原文，在我搭建在GAE的[blog][1]上。那篇只是简单地贴出了代码，这篇稍微加工一下。好，现在先把类的“皮”，写出来。

	<?php
	/*
	 * @fileoverview handle-file 随机显示目录中的图片
	 *
	 * @author <a href="mailto:leiman0311@gmail.com">Lei Ma</a>
	 * @time  Jul 31, 2012
	 */
	
	/*
	 * @description {class} ReadImage
	 */
	class ReadImage{}
	?>

##ReadImage类的三部曲
###1.读取文件夹目录
此方法返回的是一个不规则的多维数组，实现起来很简单，PHP 手册上写的很清楚

	/*
	 *@description 读取文件夹目录(遍历所有目录)
	 *@param {String} dir 要读取的目录
	 */
	public function read_folder_directory($dir){ 
	    $listDir = array(); 
	    if($handler = opendir($dir)) { 
	        while (($sub = readdir($handler)) !== FALSE) { 
	            if ($sub != "." && $sub != "..") {
	                    if(is_file($dir."/".$sub)) {
	                        if(substr($sub,-3)=='gif' || substr($sub,-3)=='jpg' || substr($sub,-3)=='png')
	                        $listDir[] = $sub; 
	                    }
	                    //递归
	                    elseif(is_dir($dir."/".$sub)){ 
	                        $listDir[$sub] = $this->read_folder_directory($dir."/".$sub); 
	                    } 
	            } 
	        } 
	        closedir($handler); 
	    } 
	    return $listDir; 
	}  

###2. 遍历多维数组到一维数组中
此方法着实令我费了一些周折，需要实现的是：把上个方法返回的不规则数组，注入到一维数组中，细化到 `叶子` ，把 `叶子` 到 `根` 的路径排列好，写入一维数组中。难点是：`static` 关键字 和 参数控制。

	/*
	 *@description 遍历多维数组，把值注入到一维数组
	 *@param {array} arr 不规则多维数组
	 *@param {boolean} flag 标志位
	 *@param {string} subFolder 图片根目录下的子目录名
	 */ 
	public function arr_foreach ($arr,$flag=false,$subFolder=""){
	    static $newArr=array();
	    if(!is_array($arr)){
	        return $newArr;
	    }
	    if(!$flag){
	        foreach($arr as $key => $val){
	            if(is_array($val)){
	                $this->arr_foreach($val,true,$key);
	            }
	            else $newArr[]=$val;
	        }
	    }
	    else{
	        foreach($arr as $key => $val){
	            if(is_array($val)){
	               $this->arr_foreach($val,true,$subFolder."/".$key);
	            }
	            else  $newArr[]=$subFolder."/".$val;
	        }
	    }
	    
	    return $newArr;
	}

###3.读取数据
终于到了读取数据的方法了，这就比较简单了，随机取那个一维数组中的一项，写出相应格式图片的 `header` ，直接 `readfile()`。

	/*
	 * @description 读取数据
	 */
	function read_a_random_file(){
	    $files = $this->read_folder_directory ($_SERVER["DOCUMENT_ROOT"].'/images/');
	    $dumpFiles=array();
	    $dumpFiles=$this->arr_foreach ($files);
	    $random=rand(0,count($dumpFiles)-1);
	    if(substr($dumpFiles[$random],-3)=='gif') header("Content-type: image/gif");
	    if(substr($dumpFiles[$random],-3)=='jpg') header("Content-type: image/jpeg");
	    if(substr($dumpFiles[$random],-3)=="png") header("Content-type: image/png");
	    readfile($_SERVER["DOCUMENT_ROOT"].'/images/'.$dumpFiles[$random]);
	}

##调用
只需把以上三个方法，放入最开始的类 “皮” 中，就可以调用了。

	$readImage=new ReadImage;
	$readImage->read_a_random_file();

##结语
对`递归`稍微有点认识了

[1]: http://blog.malei.tk/    "malei0311的专栏"