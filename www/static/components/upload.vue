<style lang="less">
	.upload-box{
		.ovh;

		input{ .h(100%); }
		.img_upload_btn{ .left;.w(200px);.h(137px);.f(24px);.c; }
		.image_preview{ background: #666 center no-repeat;background-size: contain;.h(100%); }
	}
</style>

<template>
	<div class="upload-box">
		<label v-if="label" class="control-label">{{label}}</label>
		<div class="img_upload_btn panel panel-default" v-el:img-upload-btn>
			<div class="panel-body" v-if="!url"><span class="glyphicon glyphicon-cloud-upload"></span> {{ value.length && !multi ? '重新上传' : '上传文件' }}</div>
			<div class="image_preview panel-body" v-else  :style="{ 'background-image': 'url(' + url + ')' }"></div>
		</div>
	</div>
</template>

<script>
	var uploadBtn = require('core/www/ui/uploadBtn')
	return {
		props: {
			label: {
				type: String,
				default: null
			}
			, value: ''
			, url: {
				type: String,
				default: ''
			}
			, multi: {
				type: Boolean,
				default: false
			}
		}
		, ready: function(){
			var mSelf = this

			uploadBtn.bind($(this.$els.imgUploadBtn), {
				'behind': '/api/upload/images'
				, 'inputName': 'images'
				, 'success': function(res){
					if(res.status_code == 200){
						mSelf.value = res.data.id
						mSelf.url = res.data.url
					}
				}
			})
		}
	}
</script>
