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
			, publish_url: ''
		}
	},
	methods: {
		saveCourse: function(showAlert) {
			var mSelf = this

			if(!mSelf.formdata.name) return sweetAlert({ title: '标题不能为空', type: 'warning' })
			if(!mSelf.formdata.category) return sweetAlert({ title: '简介不能为空', type: 'warning' })
			if(!mSelf.formdata.content) return sweetAlert({ title: '发布内容不能为空', type: 'warning' })

			var formdata = JSON.parse(JSON.stringify(this.formdata))
			var url = api.create

			if(this.id){
				formdata.id = this.id
				url = api.update
			}

			$.post(url, formdata, function(res) {
				if(res.status_code == 200){
					showAlert && sweetAlert({ title: mSelf.id ? '保存成功' : '创建成功' }, function(){
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

					mSelf.publish_url = resData.publish_url || ''
				} else {
					mSelf.id = ''
				}
			}, 'json')
		}
		, publishPage: function(){
			var mSelf = this

			mSelf.saveCourse(false)

			$.get('/aj/api/page/publish', { id: mSelf.id }, function(res){
				if(res.status_code == 200){
					mSelf.publish_url = res.message

					sweetAlert('发布成功')
				}
			}, 'json')
		}
		, previewPage: function(){
			this.saveCourse(false)

			window.open('/manage/page/preview/main?id=' + this.id)
		}
		, openUrl: function(){
			if(this.publish_url.indexOf('http') > -1){
				window.open(this.publish_url)
			} else {
				window.open('http://' + this.publish_url)
			}
		}
	},
	ready: function(){
		if(this.id) this.getData()
	}
})
