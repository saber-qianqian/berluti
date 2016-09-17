require('core/open/sweet/alert')

var bs = require('core/open/strap/base').VueStrap
var urlParams = require('core/urlHandle')
var api = {
	'create': '/aj/api/survey/create'
	, 'update': '/aj/api/survey/update'
	, 'delete': '/aj/api/survey/delete'
	, 'show': '/aj/api/survey/show'
	, 'public': '/aj/api/survey/publish'
}

urlParams = urlParams.getParams(location.href)

var vm = new Vue({
	el: '.main',
	components: {
		cmsHeader: require('core/www/header.vue'),
		cmsNav: require('core/www/nav.vue'),
		breadcrumb: require('core/www/breadcrumb.vue'),

		bsInput: bs.input,
		dropdown: bs.dropdown,

		choice: require('survey/choice.vue'),
		multiChoice: require('survey/choice_m.vue'),
		star: require('survey/star.vue'),
		drag: require('survey/drag.vue'),
		surveyInput: require('survey/input.vue'),
		surveyTextarea: require('survey/textarea.vue'),

		aside: bs.aside,
		previewSurvey: require('preview/survey.vue')
	},
	data: function(){
		return{
			formdata: {
				name: '',
				description: ''
			}
			, content: []
			, id: urlParams.id

			, preview_show: false
			, publish_url: ''
		}
	},
	methods: {
		saveCourse: function(showAlert) {
			var mSelf = this

			if(!this.formdata.name) return sweetAlert({ title: '标题不能为空', type: 'warning' })
			if(!this.formdata.description) return sweetAlert({ title: '描述不能为空', type: 'warning' })

			for(var i in mSelf.content){
				if(/\"\"|null/.test(JSON.stringify(mSelf.content[i]))) return sweetAlert({ title: 'Q' + (+i+1) +' 内容不全，请补充完整', type: 'warning'})
			}

			var formdata = JSON.parse(JSON.stringify(this.formdata))
			formdata.content = JSON.stringify(mSelf.content)
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
					mSelf.content = JSON.parse(resData.content)

					mSelf.publish_url = resData.publish_url || ''
				} else {
					mSelf.id = ''
				}
			}, 'json')
		}
		, addItem: function(type){
			this.content.push({
				type: type
				, name: ''
				, answer: []
			})
		}
		, deleteItem: function(index){
			var mSelf = this

			sweetAlert({
				title: "确认删除问题么？",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "删除",
				cancelButtonText: "取消",
				closeOnConfirm: true,
				closeOnCancel: true
			}, function(isConfirm) {
				if (isConfirm) {
					mSelf.content.splice(index, 1)
				}
			})
		}

		, publicPage: function(){
			var mSelf = this

			this.saveCourse(false)
			$.post(api.public, {id: mSelf.id, publish_content: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>调查问卷</title><style>body{ margin: 0;padding: 0;outline: 0;position: absolute;top: 0;left: 0;bottom: 0;right: 0; }iframe{ width: 100%;height: 100%;border: none;padding: 0; }</style></head><body><iframe src="/manage/survey/preview/' + mSelf.id + '" frameborder="0"></iframe></body></html>'}, function(res){
				if(res.status_code == 200){
					mSelf.publish_url = res.message
					sweetAlert('发布成功')
				}
			}, 'json')
		}
		, openUrl: function(){
			if(this.publish_url.indexOf('http') > -1){
				window.open(this.publish_url)
			} else {
				window.open('http://' + this.publish_url)
			}
		}
		, previewSurvey: function(){
			this.preview_show = true
		}
	},
	ready: function(){
		if(this.id) this.getData()
	}
})
