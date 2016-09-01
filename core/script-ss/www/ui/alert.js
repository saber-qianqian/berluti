	var Drive = require('core/www/windowDrive');
	function Alert(options){
		this.opts = options || {};
		this.drive = new Drive(this.opts);
		if(!this.opts.auto) this.sync();
		return this;
	}
	Alert.prototype.sync = function(){
		if(!this.opts.disOverlay)
			this.drive.createOverlay();
		this.drive.createWindow();
		var alertPanel = createAlert.call(this);
		this.drive.window.content.html(alertPanel);
		$('.'+this.drive.window.opts.windowId).on('click' , '.sureBtn' , $.proxy(function(){
			if(this.callBackOnSure && this.callBackOnSure() == false){
				return false;	
			}
			this.drive.destroyModel();
		} , this));
	}
	Alert.prototype.onSure  = function(callback){
		this.callBackOnSure = callback;
	} 
	// Helpers
	function createAlert(){
		var confirmHtml = '';
		if(!this.opts.noConfirmBtn){
			var confirmTxt = this.opts.confirmTxt || '确定';
			confirmHtml = '<p class="tab_sure"><a class="sure btn sureBtn">'+confirmTxt+'</a></p>';
		}
		if(this.opts.discover){
			return $('<div class="alert_tips">' + this.opts.content + confirmHtml +'</div>');
		}else{
			return $('<div class="maga_suc">' + this.opts.content + confirmHtml +'</div>');
		}
	}
	return Alert;
