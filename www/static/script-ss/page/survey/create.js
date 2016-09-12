require('core/open/sweet/alert')

var bs = require('core/open/strap/base').VueStrap
var urlParams = require('core/urlHandle')
var api = {
	'create': '/aj/api/survey/create'
	, 'update': '/aj/api/survey/update'
	, 'delete': '/aj/api/survey/delete'
	, 'show': '/aj/api/survey/show'
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
		surveyTextarea: require('survey/textarea.vue')
	},
	data: function(){
		return{
			formdata: {
				name: '',
				description: ''
			}
			, content: []
			, id: urlParams.id
		}
	},
	methods: {
		saveCourse: function() {
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
					mSelf.content = JSON.parse(resData.content)
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
	},
	ready: function(){
		if(this.id) this.getData()
	}
})
