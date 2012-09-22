$(function(){
	$("img[alt]").load(function() {
		$(this).wrap(function(){
		return '<span class="image-wrap" style="position:relative; display:inline-block;background:url(' + $(this).attr('src') + ') no-repeat center center; width: ' + $(this).width() + 'px; height: ' + $(this).height() + 'px;" />';
		});
		$(this).css("opacity","0");
	});
});