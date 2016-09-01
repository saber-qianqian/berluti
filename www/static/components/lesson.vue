<style lang="less">
	.lesson-box{
		.ovh;
	}
</style>

<template>
	<div class="lesson-box">
		<bs-input
			label="第一节"
			:value.sync="lesson.name"
			help="填写已创建的课程唯一编号"
		></bs-input>
		<bs-input
			label="第一节简介"
			:value.sync="brief"
			type="textarea"
		></bs-input>
		<upload-image class="form-group" label="上传音频"></upload-image>
		<upload-image class="form-group" label="上传图片"></upload-image>
	</div>
</template>

<script>
	var bs = require('core/open/strap/base').VueStrap

	return {
		components : {
			bsInput: bs.input,
			uploadImage: require('upload.vue')
		}
		, props : ['lesson']
		, data : function(){
			return {}
		}
		, methods : {}
		, ready: function(){}
	}
</script>
