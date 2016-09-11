<style lang="less">
	.preview-chapter-box{
		.ovh;.w(600px);.auto;.bgc(#fff);.f(26px);.l(46px);.fc(#777);

		.slider{
			.h(400px);.w(100%);background: no-repeat center;background-size: contain;transition: all .3 ease;
		}
		.brief{ .bgc(#fff);padding: 40px 20px; }
	}
</style>

<template>
	<div class="preview-chapter-box">
		<div class="brief">{{ detail.brief }}</div>

		<div class="slider" :style="{ 'background-image': show_backgroud_image ? 'url(' + show_backgroud_image + ')' : '' }"></div>

		<div class="audio_box">
			<upload-audio v-if="audio_url" class="form-group" :name="audio_name" :url="audio_url" :showbiref="false" :disabled="true"></upload-audio>
		</div>
	</div>
</template>

<script>
	return {
		components: {
			uploadAudio: require('uploadaudio.vue')
		}
		, data: function(){
			return {
				detail: {}
				, audio_url: ''
				, show_backgroud_image: ''
				, images: []
			}
		}
		, events: {
			'previewShow': function(id){
				this.getDetail(id)
			}
		}
		, methods : {
			sliderImage: function(){
				var mSelf = this

				mSelf.show_backgroud_image = mSelf.images[0].url
				$.each(mSelf.images, function(i, item){
					(function(image){
						setTimeout(function(){
							mSelf.show_backgroud_image = image.url
						}, image.epoch * 1000)
					})(item)
				})
			},
			getDetail: function(id){
				var mSelf = this
				var url = '/aj/api/chapter/show'

				$.get(url, { id: id }, function(res){
					if(res.status_code == 200){
						mSelf.$set('detail', res.data)

						$.each(res.data.coursewares, function(i, item){
							if(item.entity_type == 2){
								mSelf.audio_url = item.url
								mSelf.audio_name = item.name
							} else {
								mSelf.images.push({
									url: item.url
									, epoch: item.epoch
								})
								mSelf.sliderImage()
							}
						})
					}
				}, 'json')
			},
			getOrder: function(index){
				var han = ['', "一", "二", "三", "四", "五", "六", "七", "八", "九"]
				var outOrder = ''
				var tmp = index / 10

				if(tmp >= 1){
					outOrder += (parseInt(tmp) > 1 ? han[parseInt(tmp)] : '') + '十'
				}
				if(index % 10){
					outOrder += han[index % 10]
				}

				return '第' + outOrder + '章'
			}
		}
	}
</script>
