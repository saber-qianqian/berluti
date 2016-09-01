var controlFns = {
	banner: function(params) {
		var php = {
			'home_banner_m': '/banner/home_banner_m'
		}

		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(controlFns)