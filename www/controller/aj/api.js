var controlFns = {
	login: function(params) {
		this.ajaxTo('/api/login')
	}
	, course: function(params) {
		var php = {
			'create': '/api/course/create'
			, 'update': '/api/course/update'
			, 'delete': '/api/course/delete'
			, 'show': '/api/course/show'
		}

		this.ajaxTo(php[params])
	}
	, lesson: function(params) {
		var php = {
			'create': '/api/lesson/create'
			, 'update': '/api/lesson/update'
			, 'delete': '/api/lesson/delete'
			, 'show': '/api/lesson/show'
		}

		this.ajaxTo(php[params])
	}
	, chapter: function(params) {
		var php = {
			'create': '/api/chapter/create'
			, 'update': '/api/chapter/update'
			, 'delete': '/api/chapter/delete'
			, 'show': '/api/chapter/show'
		}

		this.ajaxTo(php[params])
	}
	, practice: function(params) {
		var php = {
			'create': '/api/practice/create'
			, 'update': '/api/practice/update'
			, 'delete': '/api/practice/delete'
			, 'show': '/api/practice/show'
		}

		this.ajaxTo(php[params])
	}
	, courselist: function(params) {
		var php = {
			'create': '/api/courselist/create'
			, 'update': '/api/courselist/update'
			, 'delete': '/api/courselist/delete'
			, 'show': '/api/courselist/show'
		}

		this.ajaxTo(php[params])
	}
	, log: function(params){
		var php = {
			'show': '/api/log/show'
			, 'delete': '/api/log/delete'
		}

		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(controlFns)
