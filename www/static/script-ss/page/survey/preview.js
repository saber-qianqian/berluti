var vm = new Vue({
	el: 'body',
	components: {
		previewSurvey: require('preview/survey.vue')
	},
	ready: function(){
		this.$broadcast('previewShow', fml.vars.id)
	}
})
