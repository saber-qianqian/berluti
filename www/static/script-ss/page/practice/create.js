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
		aside: bs.aside,
		previewCourse: require('preview/practice.vue')
	},
	data: function(){
		return{
			formdata: {
				name: '',
				content: '',
				description: '',
				course_id: urlParams.course_id || ''
			}
			, id: urlParams.id || ''

			, preview_show: false
		}
	},
	methods: {
		saveCourse: function() {
			var mSelf = this


			var formdata = JSON.parse(JSON.stringify(this.formdata))
			var url = '/aj/api/practice/create'

			if(this.id){
				formdata.id = this.id
				url = '/aj/api/practice/update'
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

			$.get('/aj/api/practice/show', { id: mSelf.id }, function(res){
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
		, previewPage: function(){
			this.preview_show = true
			this.$broadcast('loaddata')
		}
	},
	ready: function(){
		if(this.id) this.getData()
	}
})
