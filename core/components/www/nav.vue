<style lang="less">
	.nav-box{
		.ovh;

		ul{ list-style: none;.pl(20px);.pt(9px); }
		a{ .l(32px);.f(14px);.fc(#999); }
		.item{ .mt(20px); }
		.title{ .pl(20px);.f(16px);.l(42px);.bgc(#b7e0f4); }
		.active{ .fc(#4d92e3); }
	}
</style>

<template>
	<div class="nav-box">
		<div class="item" v-for="(key, item) in navdata">
			<div class="title">{{ item.title }}</div>
			<ul>
				<li v-for="(sub_key, link) in item.list"><a :class="getActive(key, sub_key)" :href="link.url">{{ link.name }}</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
	return {
		props : ['navdata']
		, methods: {
			getActive: function(title, sub_title){
				var urls = location.pathname.split('/')
				return urls[1] == title && urls[2] == sub_title && 'active' || ''
			}
		}
	}
</script>
