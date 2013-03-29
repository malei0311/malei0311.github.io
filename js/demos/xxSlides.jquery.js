;(function($){

	"use strict"; 

	var XXSlides = function(ele,opts){
		this.options = opts;
		this.$target = ele;
	}

	XXSlides.prototype = {
		createDOM : function(){

			console.log(this.options.data);
			this.slidesNum = this.options.data.length;
			var slides = '<ul class="xx-slides">',describe = '<div class="dec-con">';//现在直接用 + 号相对 array.push 较快

			$.each(this.options.data,function(xx,oo){
				slides += '<li class="items slides-' + (xx+1) + '" data-order="' + (xx+1) + '"><div class="slides-content"><img src="' + oo.mainImg + '"><div class="slides-side"><a href="#" class="slides-trigger slides-trigger-' + (xx+1) + '" data-order="' + (xx+1) + '"><img src="' + oo.sideImg + '"></a></div></div></li>';
				describe += '<div class="slides-hide target-slides-' + (xx+1) + '"><p>' + oo.headline + '</p></div>';
			});

			slides += '</ul>';
			describe += '</div>';
			this.$target.html(slides+describe);
			$('li.slides-1').addClass('inactive');
			$('.dec-con div:first').show();
			return this;
		},
		getSizeOfImg : function(o){
			var img = new Image();
			img.src = o;
			img.complete = function(){
				return {
					'width':img.width,
					'height':img.height
				};
			}
		},
		detectImg : function(){
			var mainImg = $('.xx-slides .slides-1 img')[0]
			   ,sideImg = $('.xx-slides .slides-1 img')[1];
			if(!this.options.height){
				this.options.height = this.getSizeOfImg(this.options.data[0].sideImg).height + 'px';
			}
			if(!this.options.mainImgWidth){
				this.options.mainImgWidth = this.getSizeOfImg(this.options.data[0].mainImg).width + 'px';
			}
			if(!this.options.sideImgWidth){
				this.options.sideImgWidth = this.getSizeOfImg(this.options.data[0].sideImg).width + 'px';
			}
			console.log(this.options);
			return this;
		},
		renderCSS : function(){
			console.log(this.options.data.length);
			$('ul.xx-slides').css({
				height:this.options.height + 'px',
				width:parseInt(this.options.mainImgWidth) + this.options.sideImgWidth * (this.slidesNum - 1) + 'px'
			});
			$('.slides-side').css({
				hieght:this.options.height + 'px',
				width:this.options.sideImgWidth + 'px'
			});

			$('.dec-con').css({
				width:parseInt(this.options.mainImgWidth) + this.options.sideImgWidth * (this.slidesNum - 1) + 'px'
			})
			var that = this;
			$.each(this.options.data,function(xx,oo){
				if( xx == 0){
					$('.slides-1').css({
						left:0
					})
				}else{
					$('.slides-' + (xx+1)).css({
						left:parseInt(that.options.mainImgWidth) + (xx-1)*that.options.sideImgWidth +  'px'
					})
				}
				
			});
			return this;
		},
		handleEvents : function(){
			this.inactiveLi = '1';
			var that = this;
			$('#xx-slides').bind(this.options.eventType,function(e){
				var $target = $(e.target)
				,time = that.options.time;

				if($target.closest('.slides-trigger').length){
					var prev = that.inactiveLi;
					$('li.inactive .slides-side').fadeIn(time,'swing');
					$('.slides-' + that.inactiveLi).removeClass('inactive');
					$target.closest('li.items').addClass('inactive');
					that.inactiveLi = $target.closest('.slides-trigger').data('order');
					var now = that.inactiveLi;
					console.log(prev,now);
					$('.slides-'+that.inactiveLi).find('.slides-side').fadeOut(time,'swing');
					if(prev > now){
						$('li.items:gt('+(now-1)+')').each(function(){
							var num = $(this).data('order');
							$(this).animate({
								left:parseInt(that.options.mainImgWidth) + (num-2)*that.options.sideImgWidth +  'px'
							},time,'swing');
						})
					}
					if(prev < now){
						$('li.items:lt('+(now)+')').each(function(){
							var num = $(this).data('order');
							$(this).animate({left:(num-1)*that.options.sideImgWidth},time,'swing');
						})
					}
					$('.dec-con div').hide();
					$('.dec-con div.target-slides-'+now).fadeIn(time,'swing');
				}
				e.preventDefault();
			})
		},
		init : function(){
			if(this.options.height && this.options.mainImgWidth && this.options.sideImgWidth){
				this.createDOM().renderCSS().handleEvents();
			}else{
				this.createDOM();
			}
		}
	}

	$.fn.xxSlides = function(options){
		debug(this);
		return this.each(function(){

			var $this = $(this)
			,opts = $.extend({},$.fn.xxSlides.defaults,options);

			$.getJSON(opts.source,function(json){
				console.log("getJSON de di yi ge console: " + json);
			 	var go = new XXSlides($this,json.xxSlides);
				go.init();
			})
		})

	}

	$.fn.xxSlides.defaults = {
		source:"../slides.json"
	}

	function debug($obj){
		if(window.console && window.console.log){
			window.console.log('tell me the count:'+$obj.size());
		}
	}
})(jQuery);