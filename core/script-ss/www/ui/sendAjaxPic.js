return function(fd, opt, inp, fileIndex , fileName){
	var xhr = new XMLHttpRequest()
	var sendTime = new Date()
		,_timer

	xhr.onreadystatechange = function(){
		if (xhr.readyState != 4) return;
		xhr.onreadystatechange =null;
		_timer && window.clearTimeout(_timer)

		if (xhr.status != 200){
			//return opt.error && opt.error({'description':'not 200'} , inp , xhr.status , fileIndex ,fileName)
			return opt.error && opt.error({'description':'系统错误'} , inp , xhr.status , fileIndex ,fileName)
		}
		var errRaised = false
		try {
			var ret = JSON.parse(xhr.response);
		} catch (err){
			errRaised = true
				return opt.error && opt.error({'description':err} , inp , ret , fileIndex ,fileName)
		}
		!errRaised && opt.success && opt.success(ret , inp , fileIndex ,fileName)

	}
	if (opt.progress){
		xhr.upload.addEventListener('progress', function(e){
			opt.progress(inp, e.loaded/e.total,fileIndex ,fileName)
		}, false)
	}
	xhr.open('POST', opt.behind)
	console.log(fd)
	xhr.send(fd)


	if (opt.timeout){
		_timer = window.setTimeout(function(){
			opt.error && opt.error({'description':'上传失败超时'} , inp)
			//opt.error && opt.error({'description':'timeout'} , inp)
			xhr && xhr.abort()
			_timer && window.clearTimeout(_timer)

		} , opt.timeout)

	}

}
