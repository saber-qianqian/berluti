require('core/open/vue/resource')
require('core/open/moment/moment-with-locales')
require('core/open/sweet/alert')

var bs = require('core/open/strap/base').VueStrap

var vm = new Vue({
	el: '.main',
	components: {
		cmsHeader: require('core/www/header.vue'),
		cmsNav: require('core/www/nav.vue'),
		breadcrumb: require('core/www/breadcrumb.vue'),

		bsInput: bs.input
	},
	data: {
		homework_desc: '',
		homework_name: '',
		course_id: ''
	},
	methods: {
		maska: function(value) {
			return value > 0
		}
		, maskat: function(value) {
			return value > 0 && value % 10 === 0
		}
	}
})
