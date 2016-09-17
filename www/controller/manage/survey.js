var controlFns = {
	index: function(params){
		this.list()
	}
	, list: function() {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'content.qsa'
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/survey/list.html', data);
		});
	}
	, create: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'content.qsa'
			data._CSSLinks = ['app', 'page/chapter/create', 'page/survey/create'];

			this.render('page/survey/create.html', data);
		});
	}
	, preview: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.preview_id = id
			data.pagerooter = 'content.qsa'
			data._CSSLinks = ['app', 'page/chapter/create', 'page/survey/create'];

			this.render('page/survey/preview.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
