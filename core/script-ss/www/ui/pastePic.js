var dataURItoBlob = require('core/www/dataURItoBlob')
var uploadImg = require('core/www/ui/uploadImg')

exports.bind = function(opt) {
	var $input = $(opt.input)

	$input[0].onpaste = paste_img

	function paste_img(e) {
		if (e.clipboardData && e.clipboardData.items ) {
		// google-chrome 
		//	alert('support clipboardData.items(chrome ...)');
			ele = e.clipboardData.items
			for (var i = 0; i < ele.length; ++i) {
				if ( ele[i].kind == 'file' && ele[i].type.indexOf('image/') !== -1 ) {
					var blob = ele[i].getAsFile();
					window.URL = window.URL || window.webkitURL;
					var blobUrl = window.URL.createObjectURL(blob);

					var $img = $('<img/>', { 'src' : blobUrl })

					uploadImg(ele[i].getAsFile(), opt, $img)
				}

			}
		} else {
		//	alert('non-chrome');
			window.setTimeout(function(){
				var imgs = $input.children('img') 
				for (var i = 0,j = imgs.length ; i<j ; i++){
					var $img = $(imgs[i])
					var blob = dataURItoBlob($img.attr('src'))
					console.log(blob)

					uploadImg(blob, opt, $img)
				}
			}, 0 )
		}
	}
}

