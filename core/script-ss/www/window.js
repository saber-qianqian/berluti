	var position = require('core/www/position');
	var scroll = require('core/www/windowScroll');
	function Window(options){
		var defaults = {
			width : 520,
			height : 'auto',
			windowId : 'dialogLayer',
			titleId : 'dialogTitle',
			contentId : 'dialogContent',
			title : '提示',
			content : '',
			isEffect : false,
			hasTitle : true,
			hasClose : true,
			ifrUrl : '',
			ifrId : ''
		}
		this.opts = $.extend({}, defaults, options);
	}
	// 创建窗口
	Window.prototype.sync = function(){
		if(this.opts.notFrame){
			this.window = createInfo.call(this);
			
		}else{
			this.window = createWindow.call(this);
			if(this.opts.hasTitle){
				if(this.opts.hasClose){
					this.title = createTitle.call(this);
				}else{
					this.title = createNoClose.call(this);
				}
				this.title.appendTo(this.window);
			}
			this.content = createContent.call(this);
			this.content.appendTo(this.window);
		}
		if (this.opts.ifrUrl) {
			var tit_height = 37;
			var ifm_height = (this.opts.height > tit_height) ? "height = '"+(this.opts.height - tit_height)+"'" : "";
			$("<iframe id='"+this.opts.ifrId+"' src='"+this.opts.ifrUrl+"' frameborder='0' "+ifm_height+" width='100%'></iframe>").appendTo(this.content);
		};
		$('<div class="clear_f"></div>').appendTo(this.content);
		this.window.hide().appendTo(document.body);
		this.toCenter();
		if(this.opts.isEffect)
			this.window.fadeIn(500);
		else
			this.window.show();
	}
	Window.prototype.destroy = function(){
		if(this.window){
			if(this.opts.isEffect){
				this.window.fadeOut(500 , $.proxy(function(){
					this.window.remove();
					delete this.window;
				} , this));
			}else{
				this.window.remove();
				delete this.window;
			}
		}
	}
	Window.prototype.toCenter = function(){
		if(this.window.css('position') == 'fixed'){
			position.winCenter(this.window , window);		
		}else{
			if(this.opts.isOverflow){
				position.docCenter(this.window , window);	
				$(window).bind("scroll", $.proxy(function(){
					position.docCenter(this.window , window);	
				} , this));
			}else{
				position.winCenter(this.window , window);		
			}
		}
	}
	Window.prototype.onClose = function(callback){
		$("." + this.opts.titleId).on('click' , '#closeDialog' , function(){
			callback();
		});	
	}
	// Helpers
	function createWindow(){
		return $('<div>' , {
			id : this.opts.windowId,
			'class' : this.opts.windowId,
			css : {
				width : this.opts.width,
				height : this.opts.height
			}
		});	
	}
	function createInfo(){
		return $('<div>' , {
			id : this.opts.windowId,
			'class' : this.opts.windowId,
			css : {
				'background':'none'
			}
		}).append(this.opts.content);	
	}
	function createTitle(){
		return $('<div>' , {
			'id' : this.opts.titleId,
			'class' : this.opts.titleId
		}).append('<span class="close_z" id="closeDialog"></span><span id="dialogTitleText">'+ this.opts.title +'</span>');	
	}
	function createNoClose(){
		return $('<div>' , {
			'id' : this.opts.titleId,
			'class' : this.opts.titleId
		}).append('</span><span id="dialogTitleText">'+ this.opts.title +'</span>');
	}
	function createNoTitle(){
		return $('<div>' , {
			'id' : this.opts.titleId,
			'class' : this.opts.titleId
		}).append('<span class="close_z" id="closeDialog"></span>');	
	}
	function createContent(){
		return $('<div>' , {
			'id' : this.opts.contentId,
			'class' : this.opts.contentId
		}).append(this.opts.content);	
	}
	return Window;
