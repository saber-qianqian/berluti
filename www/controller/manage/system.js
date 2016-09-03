var controlFns = {
	index: function(params){
		switch(params){
			case 'user':
				this.user();
				break;
			default:
				this.common();
				break;
		}
	}
	, user: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/system/user'];

			this.render('page/expect.html', data);
		});
	}
	, common: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app'];

			this.render('page/expect.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
