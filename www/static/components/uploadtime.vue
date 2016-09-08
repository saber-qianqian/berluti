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
		.panel-header{ .ovh; }
		.close{ .right;padding: 5px; }
	}
</style>

<template>
	<div class="upload-time-box">
		<label v-if="label" class="control-label">{{label}}</label>
		<div class="img_upload_btn panel panel-default" v-el:el-upload-btn>
			<div class="panel-body"><span class="glyphicon glyphicon-cloud-upload"></span> {{ value.length && !multi ? '重新上传' : '上传文件' }}</div>
		</div>
		<div class="preview">
			<div class="item panel panel-primary" v-for="(index, url) in urls" track-by="$index">
				<div class="panel-header"><span class="close glyphicon glyphicon-remove" @click="removeItem(value[index], index)"></span></div>
				<div class="panel-body">
					<div class="image btn btn-default" :style="{ 'background-image': 'url(' + url + ')' }"></div>
				</div>
				<div class="time panel-footer">
					<div class="input-group">
						<span class="input-group-addon">设置图片出现时间：</span>
						<input type="number" class="form-control" v-model="time[index]" @change="changeTime(value[index], index)">
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
			, value: {
				type: Array,
				default: function(){
					return []
				}
			}
			, urls: {
				type: Array,
				default: function(){
					return []
				}
			}
			, time: {
				type: Array,
				default: function(){
					return []
				}
			}
			, multi: {
				type: Boolean,
				default: false
			}
		}
		, methods: {
			removeItem: function(id, index){
				var mSelf = this

				this.$dispatch('deleteTime', id)
				this.urls.splice(index, 1)
				this.time.splice(index, 1)
				this.images.splice(index, 1)
			}
			, changeTime: function(courseware_id, index){
				this.$dispatch('changeTime', courseware_id, index)
			}
		}
		, ready: function(){
			var mSelf = this

			uploadBtn.bind($(mSelf.$els.elUploadBtn), {
				'behind': '/api/upload/images'
				, 'inputName': 'images'
				, 'success': function(res){
					if(res.status_code == 200){
						mSelf.urls.push(res.data.url)
						mSelf.value.push(res.data.id)
						mSelf.time.push(0)
					}
				}
			})
		}
	}
</script>
