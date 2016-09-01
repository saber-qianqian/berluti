var controlFns = {
	index: function(params){
		switch(params){
			case 'exlink':
				this.exlink();
				break;
			default:
				this.log();
				break;
		}
	}
	, exlink: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app'];

			this.render('page/expect.html', data);
		});
	}
	, log: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/website/log.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
