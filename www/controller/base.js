var controlFns = {
	'index': function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data._CSSLinks = ['page/base'];

			this.render('page/base.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
