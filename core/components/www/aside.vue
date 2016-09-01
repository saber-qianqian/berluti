<style lang="less">
	.aside-box{
		.ovh;
	}
</style>

<template>
	<cms-header></cms-header>
	<cms-nav></cms-nav>
	<breadcrumb></breadcrumb>
</template>

<script>
	return {
		components : {
			cmsHeader: require('core/www/header.vue')
			, cmsNav: require('core/www/nav.vue')
			, breadcrumb: require('core/www/breadcrumb.vue')
		}
		, props : []
		, data : function(){
			return {}
		}
		, methods : {}
		, ready: function(){
			console.log(this)
		}
	}
</script>
