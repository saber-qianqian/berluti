require('core/open/vue/resource')
require('core/open/moment/moment-with-locales')
require('core/open/sweet/alert')

var bs = require('core/open/strap/base').VueStrap
var urlParams = require('core/urlHandle')
var api = {
	'update': '/aj/api/courseware/update',
	'delete': '/aj/api/courseware/delete',
	'show': '/aj/api/courseware/show'
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
	data: function() {
		return {
			course_id: '',
			entity: '',
			attachment: '',
			epoch: '',
			id: urlParams.id || '',
			entity_type: 1
		}
	},
	methods: {
		saveCreate: function() {
			var mSelf = this

			var formdata = {
				id: mSelf.id,
				attachment: mSelf.attachment,
				epoch: mSelf.epoch
			}
			var url = api.update

			$.post(url, formdata, function(res) {
				if (res.status_code == 200) {
					sweetAlert({
						title: '保存成功'
					}, function() {
						window.location.reload()
					})
				}
			}, 'json')
		}
	},
	ready: function() {
		var mSelf = this

		if (mSelf.id) {
			$.get(api.show, {
				id: mSelf.id
			}, function(res) {
				if (res.status_code == 200) {
					var resData = res.data
					mSelf.attachment = resData.entity.id
					mSelf.entity = resData.entity
					mSelf.course_id = '' + resData.course_id
					mSelf.entity_type = resData.entity_type
					mSelf.epoch = resData.epoch || 0
					mSelf.entity.url = mSelf.entity.url
				}
			}, 'json')
		}
	}
})
