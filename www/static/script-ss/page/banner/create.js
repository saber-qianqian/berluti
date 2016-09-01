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

		bsInput: bs.input,
		uploadImage: require('upload.vue')
	},
	data: function(){
		return{
			formdata: {
				cover: '',
				brief: '',
				course_id: urlParams.course_id || ''
			}
			, id: urlParams.id || ''
		}
	},
	methods: {
		saveCourse: function() {
			var mSelf = this

			var formdata = JSON.parse(JSON.stringify(this.formdata))
			var url = '/aj/api/courselist/create'

			if(this.id){
				formdata.id = this.id
				url = '/aj/api/courselist/update'
			}

			$.post(url, formdata, function(res) {
				if(res.status_code == 200){
					sweetAlert({ title: mSelf.id ? '保存成功' : '创建成功' }, function(){
						window.location.reload()
					})
				}
			}, 'json')
		}
		, getData: function(){
			var mSelf = this

			$.get('/aj/api/courselist/show', { id: mSelf.id }, function(res){
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
		if(this.id) this.getData()
	}
})
