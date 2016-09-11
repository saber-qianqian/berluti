<style lang="less">
	.component-courseware-preview-box{
		.ovh;.w(600px);.auto;.bgc(#f8f8f8);.f(26px);.l(46px);.fc(#777);min-height: 600px;

		li{ .cursor;border-bottom: 1px solid #aaa; }
		li:last-child{ border: none; }
		.title{ .pl(10px);.l(100px);.f(32px);.fc(#333);.fb;.bgc(#f8f8f8); }
		.content{ .bgc(#fff);.l(60px);.pl(50px); }
	}
</style>

<template>
	<div class="component-courseware-preview-box">
		<div class="item" v-for="item in detail.coursewares">
			<div class="title"><span>{{ getOrder($index+1) + ':' }}</span>{{ item.lesson_name }}</div>
			<ol class="content">
				<li v-for="courseware in item.courseware">{{ courseware.brief || '无资料描述'}}</li>
			</ol>
		</div>
	</div>
</template>

<script>
	return {
		props : ['courseid']
		, data : function(){
			return {
				detail: {}
			}
		}
		, watch: {
			'courseid': function(val){
				if(val){
					this.getCourseDetail(val)
				}
			}
		}
		, methods : {
			getCourseDetail: function(id){
				var mSelf = this
				var url = '/aj/api/courseware/preview'

				$.get(url, { 'course_id': id }, function(res){
					if(res.status_code == 200){
						mSelf.$set('detail', res.data)
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
		, ready: function(){
			if(this.courseid){
				this.getCourseDetail(this.courseid)
			}
		}
	}
</script>
