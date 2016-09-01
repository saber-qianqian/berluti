var brBeforeReg = /<br([^>]*)>/ig
	,brAfterReg = /\%\%br\%\%/ig
	,brBeforeStr = '<br>'
	,brAfterStr = '%%br%%'
exports.filterSendHtml = function(str){
	return str.replace(brBeforeReg,brAfterStr)
			.replace(/<\/?[^>]*>/ig,'')
			.replace(brAfterReg,brBeforeStr)
}
exports.filterHtmlToText = function(str){
	var str = str.replace(/<br([^>]*)>/ig,'\n')
	return $('<p />').html(str).text()
}
exports.filterRecieveHtml = function(str){
	return str.replace(brBeforeReg,brAfterStr)
			.replace(/<\/?[^>]*>/ig,'')
			.replace(brAfterReg,brBeforeStr)
}
