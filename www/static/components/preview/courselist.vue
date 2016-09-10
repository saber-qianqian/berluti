<style lang="less">
	.component-preview-courselist-box{
		.ovh;.mt(20px);

		img{ .w(100%);.mb(5px); }
		.title{ .f(24px);.fb;.fc(#666); }
		.desc{
			.f(16px);.fc(#999);

			span{ .pl(20px); }
		}

	}
</style>

<template>
	<div class="component-preview-courselist-box">
		<div class="item">
			<div class="poster"><img :src="course.cover_uirl"></div>
			<div class="title">{{ course.brief }}</div>
			<div class="desc">导师{{ course.lecturer }} <span>名额{{ course.students_limit }}</span></div>
		</div>
	</div>
</template>

<script>
	return {
		props : ['course']
		, data : function(){
			return {}
		}
		, methods : {}
		, ready: function(){}
	}
</script>
