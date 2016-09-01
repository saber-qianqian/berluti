var controlFns = {
	index: function(params){
		this.list()
	}
	, list: function() {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.courseware'
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/courseware/list.html', data);
		});
	}
	, create: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.courseware'
			data._CSSLinks = ['app', 'page/chapter/create'];

			this.render('page/courseware/create.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
