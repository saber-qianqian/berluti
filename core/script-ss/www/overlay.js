	var shim = require('core/www/iframeShim');
//	var isIe = $.browser.msie;
	function Overlay(options){
		options = options || {};
		this.id = options.id || 'overlay';
		this.className = options.className || 'transmaskLayer';
		this.transparent = options.transparent || false;
		this.isOverflow = options.isOverflow;
		this.isEffect = options.isEffect || false;
	}
	// 创建overlay
	Overlay.prototype.sync = function(){
		this.overlay = createOverlay();	
		this.overlay.attr('id' , this.id);
		this.overlay.get(0).className = this.transparent ? this.className : 'maskLayer';
		this.overlay.hide().appendTo(document.body);
		this.iframe = new shim(this.id);
		this.iframe.sync();
		if(!this.isOverflow){
			this.overflow();	
		}
		if(this.isEffect)
			this.overlay.fadeIn(500)
		else
			this.overlay.show();
	}
	// 销毁overlay
	Overlay.prototype.destroy = function(){
		if (this.overlay){
			if(this.isEffect){
				this.overlay.fadeOut(500 , $.proxy(function(){
					this.overlay.remove();
					delete this.overlay;
				} , this));	
			}else{
				this.overlay.remove();
				delete this.overlay;
			}
		}
		this.iframe && this.iframe.destroy();
		// arguments[0] 判断是否多种弹窗的最后一个
		if(!this.isOverflow && arguments[0]){
			$("body").css("overflow","auto");
//			if(isIe) $("html").css({"overflow":"auto" , "overflow-x":"hidden"});
		}
	}
	Overlay.prototype.overflow = function(){
		$(document.body).css('overflow' , 'hidden');
//		if(isIe){$("html").css("overflow","visible")};
		//this.overlay.width(this.overlay.width() + 20);
		this.overlay.width('100%');
	}
	// Helpers
	function createOverlay(){
		$document = $(document);
		var height = $document.height();
		var width = $document.width(); 
		return $('<div>' , {
			css : {
				width : width,
				height : height
			}	
		});	
	}
	return Overlay;
