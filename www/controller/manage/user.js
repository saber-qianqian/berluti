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
}

exports.__create = controller.__create(controlFns);
