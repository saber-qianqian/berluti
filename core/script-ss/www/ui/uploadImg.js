var sendAjax = require('core/www/ui/sendAjaxPic')

/*
opts = {
	behind:url //上传api
	, input:放图片的容器:$obj //后续作为参数传入cbk
	, success:cbk(data,$obj) //成功后
	, onStart:cbk(data,$obj) //开始前
}
*/

var uploadImg = function(blob, opt, inp){
	var cbk = function(){
		var form = new FormData
		form.append('attach' , blob)
		sendAjax(form, opt, inp)
	}
	opt.onStart
		? opt.onStart(cbk, inp)
		: cbk()
}

return uploadImg;

