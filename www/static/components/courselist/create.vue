<style lang="less">
	.component-courselist-create-box{
		.ovh;
	}
</style>

<template>
	<div class="component-courselist-create-box">
		<bs-input
			label="所属课程"
			:value.sync="formdata.course_id"
			help="填写已创建的课程唯一编号"
		></bs-input>
		<upload-image label="上传封面" class="form-group" :value.sync="formdata.cover" :url="course.cover_uirl"></upload-image>
		<bs-input
			label="最新课程简介"
			:value.sync="formdata.brief"
			type="textarea"
		></bs-input>

		<div class="tool_box">
			<div v-if="id" class="btn btn-primary" @click="saveCourse">保存最新课程</div>
			<div v-else class="btn btn-primary" @click="saveCourse">创建最新课程</div>
		</div>
	</div>
</template>

<script>
	var bs = require('core/open/strap/base').VueStrap
	return {
		components : {
			bsInput: bs.input,
			uploadImage: require('upload.vue')
		}
		, props : ['course']
		, data : function(){
			return {
				formdata: {
					cover: '',
					brief: '',
					course_id: ''
				}
				, id: ''
			}
		}
		, methods : {
			saveCourse: function() {
				var mSelf = this

				var formdata = JSON.parse(JSON.stringify(this.formdata))
				var url = '/aj/api/courselist/create'

				if(this.id){
					formdata.id = this.id
					url = '/aj/api/courselist/update'
				}

				$.post(url, formdata, function(res) {
					if(res.status_code == 200){
						sweetAlert({ title: mSelf.id ? '保存成功' : '创建成功' }, function(){
							window.location.reload()
						})
					}
				}, 'json')
			}
		}
		, created: function(){
			this.id = this.course.id

			for(var key in this.formdata){
				if(this.course[key]) this.formdata[key] = '' + this.course[key]
			}
		}
	}
</script>
