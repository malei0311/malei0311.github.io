$(function(){
	$("#tabs-parseUnicode ul li a").bind('click',function(){
		$("#tabs-parseUnicode ul li a").each(function(index,domEle){
			$(domEle).parent().removeClass("tabs-selected");
		});
		$(this).parent().addClass("tabs-selected");
		var aHref=$(this).attr('href');
		$("#tabs-parseUnicode div.content-box").each(function(index,domEle){
			$(domEle).addClass("tabs-hide");
		});
		$("#tabs-parseUnicode "+aHref).removeClass("tabs-hide");
	});
	$('#parseUnicode-js').live('click', function() {
		var theString=$("#tabs_stringToUnicode div.left textarea").val();
		// alert(theString);
		var stringArray=new Array();
		var unicodeArray=new Array();
		var unicodeString="";
		if(theString !== ""){
			stringArray=theString.split("");
			for(var i=0;i<stringArray.length;i++){
				unicodeArray.push("\\u"+stringArray[i].charCodeAt(0).toString(16));
			}
			unicodeString=unicodeArray.join("");
			$("#tabs_stringToUnicode div.right textarea").text(unicodeString);
		}
	});
	$('#parseUnicode-css').live('click', function() {
		var theString=$("#tabs_stringToUnicode div.left textarea").val();
		// alert(theString);
		var stringArray=new Array();
		var unicodeArray=new Array();
		var unicodeString="";
		if(theString !== ""){
			stringArray=theString.split("");
			for(var i=0;i<stringArray.length;i++){
				unicodeArray.push("\\"+stringArray[i].charCodeAt(0).toString(16));
			}
			unicodeString=unicodeArray.join("");
			$("#tabs_stringToUnicode div.right textarea").text(unicodeString);
		}
	});
	$('#parseUnicode-jc').live('click', function() {
		var theUnicode=$("#tabs_unicodeToString div.left textarea").val();
		// alert(theUnicode);
		var stringArray=new Array();
		var unicodeArray=new Array();
		var unicodeString="";
		if(theUnicode !== ""){
			if(theUnicode.indexOf("\\u") != -1){
				unicodeArray=theUnicode.split("\\u");
			}else if(theUnicode.indexOf("\\") != -1){
				unicodeArray=theUnicode.split("\\");
			}
			// alert(unicodeArray);
			for(var i=1;i<unicodeArray.length;i++){
				// alert("0x"+unicodeArray[i]);
				stringArray.push(String.fromCharCode("0x"+unicodeArray[i]));
			}
			unicodeString=stringArray.join("");
			$("#tabs_unicodeToString div.right textarea").text(unicodeString);
		}
	});
})


