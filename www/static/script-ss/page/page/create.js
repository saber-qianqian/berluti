require('core/open/sweet/alert')

var bs = require('core/open/strap/base').VueStrap
var urlParams = require('core/urlHandle')
var api = {
	'create': '/aj/api/page/create'
	, 'update': '/aj/api/page/update'
	, 'delete': '/aj/api/page/delete'
	, 'show': '/aj/api/page/show'
}

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
				category: '',
				content: ''
			}
			, id: urlParams.id || ''
		}
	},
	methods: {
		saveCourse: function() {
			var mSelf = this

			var formdata = JSON.parse(JSON.stringify(this.formdata))
			var url = api.create

			if(this.id){
				formdata.id = this.id
				url = api.update
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

			$.get(api.show, { id: mSelf.id }, function(res){
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
			window.open('/manage/page/preview/main?id=' + this.id)
		}
	},
	ready: function(){
		if(this.id) this.getData()
	}
})
