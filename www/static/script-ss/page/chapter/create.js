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
		uploadAudio: require('uploadaudio.vue')
	},
	data: function(){
		return{
			formdata: {
				course_id: urlParams.course_id || ''
				, lesson_id: urlParams.lesson_id || ''
				, name: ''
				, brief: ''
			}
			, audio_courseware: ''
			, audio_new: ''
			, audio_name: ''
			, images: []
			, times: []
			, image_urls: []
			, images_courseware: []
			, images_entity: {}
			, old_images_courseware: []
			, audio_url: ''
			, id: urlParams.id || ''
		}
	},
	methods: {
		saveCreate: function(){
			var mSelf = this

			var formdata = JSON.parse(JSON.stringify(mSelf.formdata))
			var url = api.create

			if(mSelf.id){
				formdata.id = mSelf.id
				url = api.update
			}

			var images = []
			for(var i in mSelf.images){
				if(mSelf.old_images_courseware.indexOf(mSelf.images[i]) == -1){
					images.push(mSelf.images[i] + ':' + (mSelf.times[i] || 0))
				}
			}
			formdata.images = images.join(',')


			if(!mSelf.audio_courseware){
				formdata.audio = mSelf.audio_new
			}

			$.post(url, formdata, function(res) {
				if(res.status_code == 200){
					sweetAlert({ title: mSelf.id ? '保存成功' : '创建成功' }, function(){
						// window.location.reload()
					})
				}
			}, 'json')
		}
	},
	events: {
		'deleteTime': function(id){
			$.get('/aj/api/courseware/delete', {
				id: id
			}, function(res){
				console.log('课件删除成功')
			}, 'json')
		},
		changeTime: function(id, index){
			var mSelf = this
			if(mSelf.images_entity[id]){
				$.post('/aj/api/courseware/update', {
					id: id
					, attachment: mSelf.images_entity[id]
					, epoch: mSelf.times[index]
				}, function(res){
					console.log('课件更新成功')
				}, 'json')
			}
		}
	},
	watch: {
		audio_new: function(new_val, old_val){
			var mSelf = this

			if(mSelf.audio_courseware){
				$.post('/aj/api/courseware/update', {
					id: mSelf.audio_courseware,
					attachment: new_val,
					epoch: ''
				}, function(res){
					sweetAlert('课件更新成功')
				}, 'json')
			}
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
					$.each(resData.coursewares, function(i, courseware){
						if(courseware.entity_type == 2){
							mSelf.audio_courseware = courseware.id
							mSelf.audio_url = courseware.url
							mSelf.audio_name = courseware.name
						} else {
							mSelf.image_urls.push(courseware.url)
							mSelf.images.push(courseware.id)
							mSelf.old_images_courseware.push(courseware.id)
							mSelf.times.push(courseware.epoch)
							mSelf.images_entity[courseware.id] = courseware.entity
						}
					})
				}
			}, 'json')
		}
	}
})
