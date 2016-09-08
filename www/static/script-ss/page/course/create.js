require('core/open/vue/resource')
require('core/open/moment/moment-with-locales')
require('core/open/sweet/alert')

var urlParams = require('core/urlHandle')
urlParams = urlParams.getParams(location.href)

var bs = require('core/open/strap/base').VueStrap

var vm = new Vue({
	el: '.main',
	components: {
		cmsHeader: require('core/www/header.vue'),
		cmsNav: require('core/www/nav.vue'),
		breadcrumb: require('core/www/breadcrumb.vue'),

		bsInput: bs.input,
		datepicker: require('datepicker.vue'),
		uploadImage: require('upload.vue')
	},
	data: function(){
		return {
			formdata: {
				name: '',
				lecturer: '',
				lecturer_wechat: '',
				category: '',
				cover: '',
				helper: '',
				helper_wechat: '',
				price: '',
				students_limit: '10',
				class_size: '10',
				course_start: '',
				course_end: '',
				registration_start: '',
				registration_end: '',
				brief: '',
				objective: '',
				lecturer_brief: '',
				questions_limit: '5'
			}
			, id: ''
			, cover_uirl: ''
		}
	},
	watch: {
		'formdata.course_start': function(new_val){
			this.dateCorrectEarly('course_start', 'course_end', true)
		},
		'formdata.course_end': function(new_val){
			this.dateCorrectEarly('course_start', 'course_end', false)
		},
		'formdata.registration_start': function(new_val){
			this.dateCorrectEarly('registration_start', 'registration_end', true)
		},
		'formdata.registration_end': function(new_val){
			this.dateCorrectEarly('registration_start', 'registration_end', false)
		}
	},
	methods: {
		maska: function(value) {
			return value > 0
		}
		, maskat: function(value) {
			return value > 0 && value % 10 === 0
		}
		, dateCorrectEarly: function(pre, next, type){
			var formdata = this.formdata
			formdata[pre] = formdata[pre] && formdata[pre].replace(/.{2}$/, '00')
			formdata[next] = formdata[next] && formdata[next].replace(/.{2}$/, '00')

			if(!+new Date(formdata[pre]) || !+new Date(formdata[next])) return ;

			if(!(new Date(formdata[pre]) < new Date(formdata[next]))){
				if(type){
					sweetAlert({ title: '开始时间应该小于结束时间', type: 'warning' }, function(){
						formdata[pre] = formdata[next]
					})
				} else {
					sweetAlert({ title: '结束时间应该大于开始时间', type: 'warning' }, function(){
						formdata[next] = formdata[pre]
					})
				}
			}
		}
		, saveCourse: function() {
			var mSelf = this

			if(this.formdata.name){
				var formdata = JSON.parse(JSON.stringify(this.formdata))
				var url = '/aj/api/course/create'

				if(this.id){
					formdata.id = this.id
					url = '/aj/api/course/update'
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
	}
	, created: function(){
		var mSelf = this

		if(urlParams.id){
			mSelf.id = urlParams.id

			$.get('/aj/api/course/show', {
				id: urlParams.id
				, withcover: 1
			}, function(res){
				if(res.status_code == 200){
					var resData = res.data
					for(var key in mSelf.formdata){
						mSelf.formdata[key] = '' + resData[key]
					}
					mSelf.cover_uirl = resData.cover_uirl
				}
			}, 'json')
		}
	}
})
