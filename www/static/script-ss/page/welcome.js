var vm = new Vue({
	el: '.main'
	, components: {
		cmsHeader: require('core/www/header.vue')
		, cmsNav: require('core/www/nav.vue')
		, breadcrumb: require('core/www/breadcrumb.vue')
		, cmsExpect: require('core/www/expect.vue')
	}
	, data: function(){
		return{}
	}
})
