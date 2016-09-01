	var Drive = require('core/www/windowDrive');
	function Confirm(options){
		this.opts = options || {};
		this.drive = new Drive(this.opts);
		if(!this.opts.auto) this.sync();
		return this;
	}
	Confirm.prototype.sync = function(){
		this.drive.createOverlay();
		this.drive.createWindow();
		var confirmPanel = createConfirm.call(this);
		this.drive.window.content.html(confirmPanel);
		$('.'+this.drive.window.opts.windowId).on('click' , '.sureBtn' , $.proxy(function(){
			if(this.callBackOnSure && this.callBackOnSure() == false){
				return false;	
			}
			this.drive.destroyModel();
		} , this)).on('click' , '.cancelBtn' , $.proxy(function(){
			this.callBackOnCancel && this.callBackOnCancel();
			this.drive.destroyModel();
		} , this));

		this.onCancel();
	}
	Confirm.prototype.onSure  = function(callback){
		this.callBackOnSure = callback;
	}
	Confirm.prototype.onCancel  = function(callback){
		this.callBackOnCancel = callback;
	}
	// Helpers
	function createConfirm(){
		var confirmTxt = this.opts.confirmTxt || '确定',
		cancelTxt = this.opts.cancelTxt || '取消'
		if(this.opts.discover){
			return $('<div class="alert_tips">' + this.opts.content + '<p class="tab_sure"><a class="sure btn sureBtn">'+confirmTxt+'</a><a class="btn sure cancel cancelBtn">'+cancelTxt+'</a></p></div>')
		}else{
			return $('<div class="maga_suc">' + this.opts.content + '<p class="tab_sure"><a class="sure btn sureBtn">'+confirmTxt+'</a><a class="btn sure cancel cancelBtn">'+cancelTxt+'</a></p></div>')
		}
	}
	return Confirm;
