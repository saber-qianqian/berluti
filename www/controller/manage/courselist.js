var controlFns = {
	index: function(params){
		this.list(params)
	}
	, list: function() {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.courselist'
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/banner/list.html', data);
		});
	}
	, create: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.courselist'
			data._CSSLinks = ['app', 'page/chapter/create', 'page/lesson/create', 'page/courselist/create'];

			this.render('page/banner/create.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
