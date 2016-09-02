require('core/open/vue/resource')
require('core/open/moment/moment-with-locales')
require('core/open/sweet/alert')

var bs = require('core/open/strap/base').VueStrap
var urlParams = require('core/urlHandle')
var api = {
	'create': '/aj/api/chapter/create'
	, 'update': '/aj/api/chapter/update'
	, 'delete': '/aj/api/chapter/delete'
	, 'show': '/aj/api/chapter/show'
}

urlParams = urlParams.getParams(location.href)

var vm = new Vue({
	el: '.main',
	components: {
		cmsHeader: require('core/www/header.vue'),
		cmsNav: require('core/www/nav.vue'),
		breadcrumb: require('core/www/breadcrumb.vue'),

		bsInput: bs.input,
		uploadTime: require('uploadtime.vue'),
		uploadVideo: require('uploadvideo.vue')
	},
	data: function(){
		return{
			formdata: {
				course_id: urlParams.course_id || ''
				, lesson_id: urlParams.lesson_id || ''
				, name: ''
				, brief: ''
				, images: ''
				, audio: ''
			}
			, id: urlParams.id || ''
		}
	},
	methods: {
		saveCreate: function(){
			var mSelf = this

			var formdata = JSON.parse(JSON.stringify(mSelf.formdata))
			var url = api.create

			if(mSelf.id){
				formdata.lesson_id = mSelf.lesson_id
				formdata.id = mSelf.id
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
	},
	ready: function(){
		var mSelf = this

		if(mSelf.id){
			$.get(api.show, { id: mSelf.id }, function(res){
				if(res.status_code == 200){
					var resData = res.data
					for(var key in mSelf.formdata){
						mSelf.formdata[key] = resData[key] && '' + resData[key] || ''
					}
				}
			}, 'json')
		}
	}
})
