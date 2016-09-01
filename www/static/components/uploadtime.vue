<style lang="less">
	.upload-time-box{
		.ovh;

		input{ .h(100%); }
		.img_upload_btn{ .left;.w(200px);.h(137px);.f(24px);.c; }
		.preview{
			.ml(130px);.mt(20px);.ovh;

			.item{ .left;.w(300px);.mr(10px); }
			.image{ .w(268px);.h(268px);background: #333 no-repeat center;background-size: contain; }

		}
	}
</style>

<template>
	<div class="upload-time-box">
		<label v-if="label" class="control-label">{{label}}</label>
		<div class="img_upload_btn panel panel-default">
			<div class="panel-body"><span class="glyphicon glyphicon-cloud-upload"></span> {{ value ? '重新上传' : '上传文件' }}</div>
		</div>
		<div class="preview">
			<div class="item panel panel-primary" v-for="item in urls">
				<div class="panel-body">
					<div class="image btn btn-default" :style="{ 'background-image': 'url(' + item + ')' }"></div>
				</div>
				<div class="time panel-footer">
					<div class="input-group">
						<span class="input-group-addon">设置图片出现时间：</span>
						<input type="number" class="form-control" v-model="time">
						<span class="input-group-addon">s</span>
					</div>
				</div>
			</div>
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
			, urls: {
				type: Array
				, default: function(){
					return ['http://gn0.dev/images/2016-09-01/64c3eac19274f431750c72a0cc4476b7088deef0779d78a2e6460a1529dd1955.png']
				}
			}
			, time: ''
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
						if(!mSelf.multi){
							mSelf.urls = []
							mSelf.urls.push(res.data.url)
							mSelf.value = res.data.id
						}
					}
				}
			})
		}
	}
</script>
