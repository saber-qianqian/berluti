	var position = require('core/www/position');
	var overlay = require('core/www/overlay');
	var window = require('core/www/window');
	fml.vars.saveItem = 0;
	function Drive(options){
		this.opts = options || {};
		this.overlay = new overlay(this.opts);
		this.window = new window(this.opts);
		$(document.activeElement).blur();
		return this;
	}
	Drive.prototype.createOverlay = function(){
		this.overlay.sync();	
	}
	Drive.prototype.createWindow = function(){
		fml.vars.saveItem++;
		this.opts.onStart && this.opts.onStart();
		this.window.sync();
		this.opts.onChange && this.opts.onChange();
		this.window.onClose($.proxy(function(){
			this.destroyModel();
		} , this));

		if(!this.opts.notKeyClose){
			$('body').one("keydown.uiAlert" , $.proxy(function(event){
				if(event.keyCode == 27){
					this.destroyModel();
				}
				return false;
			} , this));
			var events = $._data(document.getElementsByTagName('body')[0],'events')
			if(events && events.keydown){
				var lastItem = events.keydown.pop()
				events.keydown.splice(0,0,lastItem)
			}
		}
	}
	Drive.prototype.destroyModel = function(notFireClose){
		fml.vars.saveItem--;
		!notFireClose && this.opts.onClose && this.opts.onClose();
		if(fml.vars.saveItem <= 0) fml.vars.saveItem = 0;
		this.overlay.destroy(fml.vars.saveItem == 0);
		this.window.destroy();
		$('body').unbind("keydown.uiAlert")
	}
	return Drive;
