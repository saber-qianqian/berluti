require('core/open/sweet/alert')

var bs = require('core/open/strap/base').VueStrap
var urlParams = require('core/urlHandle')

urlParams = urlParams.getParams(location.href)

var vm = new Vue({
	el: '.main',
	components: {
		cmsHeader: require('core/www/header.vue'),
		cmsNav: require('core/www/nav.vue'),
		breadcrumb: require('core/www/breadcrumb.vue'),

		bsInput: bs.input
	},
	data: function(){
		return{
			formdata: {
				name: '',
				brief: '',
				course_id: ''
			}
			, id: ''
		}
	},
	methods: {
		saveCourse: function() {
			var mSelf = this

			if(this.formdata.name){
				var formdata = JSON.parse(JSON.stringify(this.formdata))
				var url = '/aj/api/lesson/create'

				if(this.id){
					formdata.id = this.id
					url = '/aj/api/lesson/update'
				}

				$.post(url, formdata, function(res) {
					if(res.status_code == 200){
						sweetAlert({ title: mSelf.id ? '保存成功' : '创建成功' }, function(){
							window.location.reload()
						})
					}
				}, 'json')
			}
		}
		, getData: function(){
			var mSelf = this

			$.get('/aj/api/lesson/show', { id: mSelf.id }, function(res){
				if(res.status_code == 200){
					var resData = res.data
					for(var key in mSelf.formdata){
						mSelf.formdata[key] = '' + resData[key]
					}
				} else {
					mSelf.id = ''
				}
			}, 'json')
		}
	},
	ready: function(){
		this.id = urlParams.id

		if(urlParams.course_id) this.formdata.course_id = urlParams.course_id
		if(this.id) this.getData()
	}
})
