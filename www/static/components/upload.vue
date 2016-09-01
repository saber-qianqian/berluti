<style lang="less">
	.upload-box{
		.ovh;

		input{ .h(100%); }
		.img_upload_btn{ .left;.w(200px);.h(100px);.c;.l(100px);background: #666 center no-repeat;background-size: cover; }
	}
</style>

<template>
	<div class="upload-box">
		<label v-if="label" class="control-label">{{label}}</label>
		<div class="img_upload_btn" :style="{ 'background-image': 'url(' + url + ')' }"></div>
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
				default: 'http://gn0.dev/images/2016-08-30/93175b0769207644df04b892ed6af6f1437d875b28e788755561e571037efa53.jpeg'
			}
			, multi: {
				type: Boolean,
				default: false
			}
		}
		, ready: function(){
			var mSelf = this

			uploadBtn.bind('.img_upload_btn', {
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
