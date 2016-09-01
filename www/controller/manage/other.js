var controlFns = {
	index: function(params){
		switch(params){
			case 'template':
				this.template();
				break;
			case 'style':
				this.style();
				break;
			default:
				this.material();
				break;
		}
	}
	, template: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/other/style'];

			this.render('page/other/style.html', data);
		});
	}
	, style: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/other/style'];

			this.render('page/other/style.html', data);
		});
	}
	, material: function(id) {
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
