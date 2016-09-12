var controlFns = {
	index: function(params){
		this.list()
	}
	, list: function() {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'content.page'
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/page/list.html', data);
		});
	}
	, create: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pagerooter = 'content.page'
			data._CSSLinks = ['app', 'page/chapter/create'];

			this.render('page/page/create.html', data);
		});
	}
	, preview: function(id) {
		id = id || this.readData('id', this.req.__get, 0);

		var php = {
			pageshow: '/api/page/show?id=' + id
		};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			this.render('page/page/preview.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
