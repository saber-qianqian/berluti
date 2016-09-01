var controlFns = {
	index: function(params){
		switch(params){
			case 'welcome':
				this.welcome();
				break;
			case 'custom':
				this.custom();
				break;
			default:
				this.qsa();
				break;
		}
	}
	, welcome: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app'];

			this.render('page/expect.html', data);
		});
	}
	, custom: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/content/custom'];

			this.render('page/content/custom.html', data);
		});
	}
	, qsa: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/other/style'];

			this.render('page/other/style.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
