require('core/open/sweet/alert')

var vm = new Vue({
	el: '.main',
	components: {
		cmsHeader: require('core/www/header.vue'),
		cmsNav: require('core/www/nav.vue'),
		breadcrumb: require('core/www/breadcrumb.vue'),

		previewCourselist: require('preview/courselist.vue'),
		courselistCreate: require('courselist/create.vue')
	},
	data: function(){
		return{
			courselist: []
		}
	},
	methods: {
		getData: function(){
			var mSelf = this

			$.get('/aj/api/courselist/preview', {}, function(res){
				$.each(res.data, function(i, course){
					course.status = 1
					mSelf.courselist.push(course)
				})
			}, 'json')
		}
		, addCourse: function(){
			var mSelf = this

			var go = true

			$.each(mSelf.courselist, function(i, chapter){
				if(chapter.status == 0){
					sweetAlert({ title: '请先保存还未创建成功的最新课程', type: 'warning' })
					go = false
				}
			})

			if(!go) return

			mSelf.courselist.push({
				status: 0
				, id: ''
				, cover: ''
				, brief: ''
				, course_id: ''
			})
		}
	},
	events: {
		'deleteCourse': function(course){
			this.courselist.$remove(course)
		}
	},
	ready: function(){
		this.getData()
	}
})
