<style lang="less">
	.component-preview-courselist-box{
		.ovh;
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
