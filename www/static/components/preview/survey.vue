<style lang="less">
	.preview-survey-box{
		.ovh;.w(600px);.auto;.bgc(#fff);.f(24px);.l(32px);.fc(#666);padding: 0 20px 20px;

		.page_name{ .f(30px);.fc(#333);.c;.l(80px); }
		.description{ .mb(50px); }

		.item{
			.mb(30px);

			.name{ .fc(#333); }
		}
	}
</style>

<template>
	<div class="preview-survey-box">
		<div class="page_name">{{ detail.name }}</div>
		<div class="description">{{ detail.description }}</div>

		<div class="item" v-for="item in content" track-by="$index">
			<div class="name">Q{{ ($index+1) + ':' + item.name }}</div>
			<survey-item :type="item.type" :data="item.answer"></survey-item>
		</div>
	</div>
</template>

<script>
	return {
		components: {
			surveyItem: require('preview/survey_item.vue')
		}
		, props: ['detail', 'content']
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
				var url = '/aj/api/survey/show'

				$.get(url, { id: id }, function(res){
					if(res.status_code == 200){
						mSelf.$set('detail', res.data)
						mSelf.$set('content', JSON.parse(res.data.content))
					}
				}, 'json')
			}
		}
	}
</script>
