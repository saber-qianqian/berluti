require('core/open/sweet/alert')
require('core/open/md5/min')

var vm = new Vue({
	el: '.main',
	data: {
		password: '',
		username: ''
	},
	methods: {
		login: function() {
			if (this.password && this.username) {
				$.post('/aj/api/login/', {
					password: md5(this.password),
					username: this.username
				}, function(res) {
					if(res.status_code == 200){
						sweetAlert({ title: '登录成功' }, function(){
							window.location.href = '/manage/content/welcome/main'
						})
					} else {
						sweetAlert('登录失败', res.message, 'error')
					}
				}, 'json')
			}
		}
	}
})
