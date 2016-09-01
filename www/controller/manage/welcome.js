var controlFns = {
	'index': function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['page/welcome'];

			data.pagerooter = 'settings_system.common'

			this.render('page/welcome.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
