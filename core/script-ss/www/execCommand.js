var defaultConfig = {
	document : document
}
function bind($btn, opts){

	opts = $.extend({}, defaultConfig, opts)

	$btn.on('click', function(e) {
		var role = $(this).data('role') 
		switch(role) {
			case 'h1':
			case 'h2':
			case 'p':
				opts.document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
				break;
			default:
				opts.document.execCommand($(this).data('role'), false, null);
				break;
		}

		opts.success && opts.success(role)
	})
}

exports.bind = bind
