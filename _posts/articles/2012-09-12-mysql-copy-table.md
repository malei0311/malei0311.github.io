---
layout: articles
title: mysql拷贝表
description: 由于新表和原表的字段不同，所以先要找出两个表的相同字段，然后拷贝相同字段
category: articles
keywords: mysql,php,copyTable
tags: [php, mysql]
---
##总述
现在每个表都是按用户的意愿生成的，每个表的字段大体上相同，但是会有一两个不同的字段，该怎么做？
##几种拷贝表的方式
###拷贝表结构到新表中

	CREATE TABLE new LIKE origin;

###拷贝数据到新表中
注意：这个语句其实只是把select语句的结果建一个表。所以 new 这个表不会有主键，索引。

	CREATE TABLE new AS   
	(   
		SELECT *   
		FROM origin   
	); 

###真正的复制一个表

	CREATE TABLE new LIKE origin;   
	INSERT INTO new SELECT * FROM origin;

###操作不同的数据库

	CREATE TABLE new LIKE shop.origin;   

###新建的表的字段改名

	CREATE TABLE new AS   
	(   
		SELECT id, username AS uname, password AS pass FROM origin   
	);

##实现
因为表中的字段大部分相同，所以需要找出相同的字段
###获取表中的字段

		    //获取表字段信息
        public function getColumnName($tableName){
           	$sql=<<<EOF
           	select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where table_name="$tableName";
	EOF;
           	$queryResult=$this->pdo->query($sql);
           	$resultArray=array();
           	$rows=$queryResult->fetchAll(PDO::FETCH_ASSOC);
           	foreach ($rows as $row) {
           	    $resultArray[]=$row['COLUMN_NAME'];
           	}
           	return $resultArray;
       	}

###找出相同的字段，然后拷贝

		    /**
         * [copyDataToNewTable 拷贝上一个月表中的数据]
         * @param  [string] $oldTableName [上一个月原表]
         * @param  [string] $newTableName [新表]
         * @return [boolean]              [返回值]
         */
        public function copyDataToNewTable($oldTableName,$newTableName){
            $whatIWant=array();
            $columnName_oldTable=$this->getColumnName($oldTableName);
            $columnName_newTable=$this->getColumnName($newTableName);
            foreach ($columnName_oldTable as $key1 => $value1) {
                foreach ($columnName_newTable as $key2 => $value2) {
                    if($columnName_oldTable[$key1]==$columnName_newTable[$key2]){
                        $whatIWant[]= $columnName_oldTable[$key1];
                    }
                }
            }
            $whatIWant_result=join(",",$whatIWant);
            $sql=<<<EOF
            insert  into `$newTableName`($whatIWant_result) select $whatIWant_result from `$oldTableName`;
	EOF;
            $queryResult=$this->pdo->exec($sql);
            if($queryResult)
            {
                return true;
            }
            else{
                return false;
            } 
        }