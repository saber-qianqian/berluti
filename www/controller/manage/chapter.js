var controlFns = {
	index: function(params){
		this.list()
	}
	, list: function() {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.chapter'
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/chapter/list.html', data);
		});
	}
	, create: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'course.chapter'
			data._CSSLinks = ['app', 'page/chapter/create'];

			this.render('page/chapter/create.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
