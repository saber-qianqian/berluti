<style lang="less">
	.preview-practice-box{
		.pr;.ovh;.w(600px);.auto;.bgc(#fff);.f(20px);.l(36px);.fc(#777);

		.item{ margin: 0 30px;padding: 40px 0 30px;border-bottom: 1px solid #f1f1f1; }
		.title{ .f(30px);.fc(#333);.fb;.l(1);.pb(30px); }
		.tips{ .f(18px);.fc(#67a2e7); }
		.mask{ .pa;top: 0;left: 0;.w(100%);.h(100%);.bgc(rgba(0,0,0,.5)); }
		.fixed_tips{
			.pf;top: 40%;right: 200px;box-sizing: border-box;padding: 30px;.w(400px);.bgc(#fff);.f(20px);.fc(#777);.l(32px);.border-r(5px);

			p{ .pb(20px); }
			.close_btn{ .l(60px);.f(24px);.c;.bgc(#00c39b);.fc(#fff);.border-r(6px); }
		}
	}
</style>

<template>
	<div class="preview-practice-box" :style="{ 'min-height': winh }">
		<div class="item" v-for="item in detail">
			<div class="title">{{ item.name }}</div>
			<p class="content">{{ item.content }}</p>
			<div class="tips" @click="showTips(item.description)">查看作业须知</div>
		</div>
		<div class="mask" v-if="fixed_tips" @click="closeTips"></div>
		<div class="fixed_tips" v-if="fixed_tips">
			<p>{{ fixed_tips }}</p>
			<div class="close_btn" @click="closeTips">我知道了</div>
		</div>
	</div>
</template>

<script>
	return {
		props : ['courseid', 'previewdata']
		, data: function(){
			return {
				detail: {}
				, fixed_tips: ''
				, winh: ''
			}
		}
		, watch: {
			'courseid': function(val){
				if(val){
					this.resetBoxHeight()

					this.getCourseDetail(val)
				}
			}
		}
		, events: {
			loaddata: function(){
				this.resetBoxHeight()

				this.detail = []
				this.detail.push(this.previewdata)
			}
		}
		, methods : {
			resetBoxHeight: function(){
				this.winh = ($('.aside').height() - 52) + 'px'
			}
			, getCourseDetail: function(course_id){
				var mSelf = this
				var url = '/aj/api/practice/show'

				$.get(url, { course_id: course_id }, function(res){
					if(res.data.length){
						mSelf.$set('detail', res.data)
					}
				}, 'json')
			}
			, showTips: function(tips){
				this.fixed_tips = tips || '没有作业须知'
			}
			, closeTips: function(){
				this.fixed_tips = null
			}
		}
	}
</script>
