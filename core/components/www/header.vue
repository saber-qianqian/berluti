<style lang="less">
	.header-box{
		padding: 20px 40px;.ovh;.bgc(#efefef);

		.avatar{ .w(40px);.h(40px);.left;background: center no-repeat;background-size: cover;.mr(20px); }
	}
</style>

<template>
	<div class="header-box">
		<div class="avatar" :style="{ 'background-image': 'url(' + userinfo.avatar.image_poster + ')' }"></div>
		<div class="say_hi">{{ '身份' }}：{{ userinfo.nick_name }} 你好，欢迎回来！</div>
		<a href="/manage/user/login/">退出</a>
	</div>
</template>

<script>
	return {
		props : ['userinfo']
		, data : function(){
			return {}
		}
		, methods : {}
		, ready: function(){}
	}
</script>
