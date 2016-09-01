<style lang="less">
	.header-box{
		padding: 20px 40px;.ovh;.bgc(#efefef);

		.avatar{ .w(40px);.h(40px);.left;background: center no-repeat;background-size: cover;.mr(20px); }
	}
</style>

<template>
	<div class="header-box">
		<div class="avatar" style="background-image: url('http://img.zcool.cn/community/01f6a757ad56a20000012e7e502623.jpg')"></div>
		<div class="say_hi">{{ '身份' }}： {{ '用户名' }} 你好，欢迎回来！</div>
		<a href="/manage/user/login/">退出</a>
	</div>
</template>

<script>
	return {
		components : {}
		, props : []
		, data : function(){
			return {}
		}
		, methods : {}
		, ready: function(){}
	}
</script>
