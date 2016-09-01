var controlFns = {
	index: function(params){
		this.list(params)
	}
	, list: function() {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.homework'
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/practice/list.html', data);
		});
	}
	, create: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.homework'
			data._CSSLinks = ['app', 'page/chapter/create'];

			this.render('page/practice/create.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
