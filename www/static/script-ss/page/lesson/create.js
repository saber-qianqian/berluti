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
		chapterCreate: require('chapter/create.vue'),

		bsInput: bs.input
	},
	data: function(){
		return{
			formdata: {
				name: '',
				brief: '',
				course_id: urlParams.course_id || ''
			}
			, id: urlParams.id || ''

			, urlParamsid: !!urlParams.id

			, chapterList: []
			, course_id: urlParams.course_id || ''
		}
	},
	events: {
		'deleteChapter': function(index){
			this.chapterList.splice(index, 1)
		}
	},
	watch: {
		'formdata.course_id': function(val){
			if(val === '0'){
				this.formdata.course_id = ''

				this.course_id = this.formdata.course_id
				sweetAlert({ title: '所属课程编号错误', type: 'error' })
			}
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
						if(!mSelf.id){
							mSelf.course_id = res.data.course_id
							mSelf.id = res.data.id
						}

						sweetAlert({ title: mSelf.id ? '保存成功' : '创建成功' })
					}
				}, 'json')
			}
		}
		, getData: function(){
			var mSelf = this

			$.get('/aj/api/lesson/detail', { id: mSelf.id }, function(res){
				if(res.status_code == 200){
					var resData = res.data
					for(var key in mSelf.formdata){
						mSelf.formdata[key] = '' + resData[key]
					}
					$.each(res.data.chapters, function(i, chapter){
						mSelf.chapterList.push({
							chapter: chapter
							, status: 1
						})
					})

					mSelf.course_id = resData.course_id
				} else {
					mSelf.id = ''
				}
			}, 'json')
		}
		, addChpter: function(){
			var mSelf = this
			var go = true

			$.each(mSelf.chapterList, function(i, chapter){
				if(chapter.status == 0){
					sweetAlert({ title: '请先完善上一个小节的创建，点击【创建小节】按钮', type: 'warning' })
					go = false
				}
			})

			if(!go) return

			if(!mSelf.id || !mSelf.course_id){
				sweetAlert({ title: '您需要先创建一个章节', type: 'warning' })
			} else {
				mSelf.chapterList.push({
					status: 0
					, chapter: {
						lesson_id: mSelf.id
						, course_id: mSelf.course_id
					}
				})
			}
		}
	},
	ready: function(){
		if(this.id) this.getData()
	}
})
