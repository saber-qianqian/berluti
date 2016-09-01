	var Drive = require('core/www/windowDrive');
	var dialogObj = [];
	function Dialog(options){
		this.opts = options || {};
		this.drive = new Drive(this.opts);
		this.sync();
		return this;
	}
	Dialog.prototype.sync = function(){
		if(!this.opts.isDestory && dialogObj.length){

			for(var i = dialogObj.length ; i-- ;){
				dialogObj[i].drive.destroyModel(true);
			}
			dialogObj.length = 0;
		}
		dialogObj.push(this);
		this.drive.createOverlay();
		this.drive.createWindow();
		return this;
	}
	Dialog.prototype.destory = function(){
		this.drive.destroyModel();
	}
	return Dialog;
