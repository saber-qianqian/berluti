var controlFns = {
	'login': function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data._CSSLinks = ['page/user/login'];

			this.render('page/user/login.html', data);
		});
	}
	, 'logout': function() {
		var php = {
			out: '/api/logout'
		};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			return this.redirectTo('/manage/user/login/')
		});
	}
}

exports.__create = controller.__create(controlFns);
