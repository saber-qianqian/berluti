<style lang="less">
	.breadcrumb-box{
		.ovh;.f(14px);.fc(#666);.l(50px);border-bottom: 1px solid #e0d6ba;
	}
</style>

<template>
	<div class="breadcrumb-box">{{ title }}</span><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span><span>{{ item.name }}</span></div>
</template>

<script>
	return {
		props : ['navdata', 'rooter']
		, created: function(){

			var rooters = this.rooter.split('.')
			var page = this.navdata[rooters[0]]

			this.title = page.title
			this.item = page.list[rooters[1]]
		}
	}
</script>
