---
layout: articles
title: insertAfter()?
description: 关于几种自定义的insertAfter()
category: articles
keywords: js,insertAfter
tags: [js]
---
##直接写

	var referenceNode=document.getElementById('foo');
	var node=document.createElement('div');
	var nodeText=document.createTextNode('hello world!');
	node.appendChild(nodeText);
	referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);

##函数1

	function insertAfter(node, referenceNode){
	    var parent = referenceNode.parentNode;
	    if(parent.lastChild == referenceNode){
	        parent.appendChild(node);
	    }
	    else{
	        parent.insertBefore(node,referenceNode.nextSibling);
	    }            
	}

##函数2

	function insertAfter(node, referenceNode){
	    var parent = referenceNode.parentNode,v;
	    (v=referenceNode.nextSibling)?parent.insertBefore(node,v):parent.appendChild(node);
	}

##函数3

	function insertAfter(node,referenceNode){
	    referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);
	}