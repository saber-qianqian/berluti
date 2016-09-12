var sendAjax = require('core/www/ui/sendAjaxPic')

function wrapInp(inp , opt){
	opt = opt || {}
	var multiple = opt.multiple
		accept = opt.accept
		,inputName = opt.inputName || 'attach'
	inp = $(inp)
	var wrapPnl
	if (inp.is('.ntBdaolpu')){
		wrapPnl = inp
	}else{
	
		if(opt.autoHeight){
			var w = 'auto'
				,h= 'auto'
		} else {
			var w = opt.width || inp.outerWidth()
				,h = opt.height || inp.outerHeight()
		}
		wrapPnl = inp.wrap('<div class="'+ (opt.input_class || '') +' ntBdaolpu"></div>').parent()
				.css({'overflow':'hidden','position':'relative','width':w,'height':h})
	}

	var fileInp = $('<input type=file style="font-size:32px; margin-left:-350px;" name="'+ inputName +'" '+(multiple?'multiple':'')+(accept?' accept='+accept:'')+' />')
				.css({'position': 'absolute','left':0,'top': 0,'cursor':'pointer','opacity' : 0})
				.appendTo(wrapPnl)
	return wrapPnl
}

	/*
	opt = {
		success
		error
		inputName
		multiple
		plusData
		timeout
	}
	*/

function bind(inp , opt){
	var wrapper = wrapInp(inp ,opt).on('change' , 'input[type=file]' ,sendFile )

	function sendFile(o){
		if(opt.FilesAdded){
			var path = o.target.value
				,pos1 = path.lastIndexOf('/')
				,pos2 = path.lastIndexOf('\\')
				,filename = Math.max(pos1, pos2) < 0 ? path : path.substring(pos1+1)
				,FilesAdded = opt.FilesAdded
				,files = [{'name': filename}]
			FilesAdded(files);
		}

		var sendTime = new Date()
		function _clear(){
			if (_timer) window.clearTimeout(_timer)
			ifr.remove()
			form.remove()
			}
		var ifrId = new Date().getTime()
		var ifr = $('<iframe id="'+ifrId+'" name="'+ifrId+'"></iframe>')
				.hide()
				.appendTo('body')
		var _timer
		if (opt.timeout) {
			_timer = window.setTimeout(function(){
				opt.error && opt.error({'description':'超时上传失败'} , inp)
				//opt.error && opt.error({'description':'timeout'} , inp)
				_clear()
				} , opt.timeout)
		}
		var _callbackName = 'callback_' + (new Date().getTime()),
			crossDomainData = '';
		if(opt.crossDomain){
			if(opt.success){
				var ret;
				window[_callbackName] = function(ret){
					try {
						ret = $.parseJSON(ret)
						opt.success(ret , inp)
					}catch(err){
						opt.error && opt.error({'description':err} , inp , ret)
					}
				};
				crossDomainData = "__callback="+_callbackName+"&backuri="+opt.backuri+"&backname=data"
				if(opt.behind.indexOf('?')>0){
					crossDomainData = '&' + crossDomainData
				}else{
					crossDomainData = '?' + crossDomainData
				}
			}
		}else{
			ifr.bind('load',function(){
				var con = this.contentWindow.document.body
				var ret = con && (con.innerText|| con.textContent || con.innerHTML)
				var errRaised = false
				try {
					ret = $.parseJSON(ret)
				}catch(err){
					errRaised = true
					opt.error && opt.error({'description':err} , inp , ret)
				}
				_clear()
				!errRaised && opt.success && opt.success(ret , inp)
			})
		}

		var plusData = ''
		if (opt.plusData){
			for (var name in opt.plusData){
				plusData += '<input name="'+name+'" value="'+ opt.plusData[name] +'" />'
			}
		}
		var form = $('<form action="'+ opt.behind+crossDomainData +'" target="'+ifrId+'" method="post" enctype="multipart/form-data">'+plusData+'</form>')
					.css({'position':'relative'}).append(this).appendTo('body')
					.hide()
					.submit()

		wrapInp(wrapper , opt)
	}
}

/*factory method if support h5*/
function bindH5(inp , opt){
	opt.fileNum = 1
	var wrapper = wrapInp(inp ,opt).on('change' , 'input[type=file]' ,sendFile )

	function getForm(){
		var form = new FormData
		if (opt.plusData){
			for (var name in opt.plusData){
				form.append(name, opt.plusData[name])
				}
			}
		return form
	}

	function sendFile(){
		var inputName = this.getAttribute('name')
		var files = this.files
		if (!files.length) return
		if (opt.maxFileNum && files.length > opt.maxFileNum){
			return opt.error && opt.error({'description':'每次最多上传'+ opt.maxFileNum + '张图片，请重新选择'} , inp )
			//return opt.error && opt.error({'description':'file numbers > '+ opt.maxFileNum} , inp )
			}

		if(opt.FilesAdded){
			var FilesAdded = opt.FilesAdded;
			FilesAdded(files);
		}

		var fileNum = opt.fileNum || files.length
		for (var i =0 ; i<files.length;){
			var fd = getForm()
				,fileIndex = []
				,fileName = []
			for(var j = 0 ;j< fileNum;j++){
				fd.append(inputName,files[i])
				fileIndex.push(i)
				fileName.push(files[i].name)
				i++
			}
			fd.append('fileIndex',fileIndex)
			fd.append('fileName',fileName)
			fd.append('fileCount',files.length)


			sendAjax(fd, opt, inp, fileIndex , fileName)
		}
		this.value = ''
	}
}

var supportH5 = (window.FormData !== undefined  && window.XMLHttpRequest !== undefined);

exports.bind = function(inp , opt){
	if(opt.crossDomain){
		//如果是需要跨域的话，不能使用ajax的方式
		supportH5 = false;
	}

	$(inp).each(function(){
		supportH5 ?
			bindH5(this , opt)
			: bind(this , opt)
	})
}

