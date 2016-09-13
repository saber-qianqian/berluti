<style lang="less">
	.preview-course-box{
		.ovh;.w(600px);.auto;.bgc(#f8f8f8);.f(26px);.l(46px);.fc(#777);

		&>div{ .bgc(#fff);padding: 40px 30px 30px; }
		.poster{
			padding: 0;

			img{ .block;.w(100%); }
		}
		.header{
			.bgc(#fff);.mb(10px);

			.name{ .f(36px);.fb;.fc(#1e1e1e); }
			.price{ .fc(#f66);.f(30px);.l(90px); }
			.desc{ .f(20px);border-top: 1px dashed #999;.l(20px);.pt(20px); }
			.desc span{ border-left: 1px solid #999;.i_block;.pl(20px);.ml(20px); }
		}
		.box{

			p{ border-bottom: 1px solid #e2e2e2;padding: 30px 0 40px;.mb(40px); }
			.title{ .f(30px);.fc(#1e1e1e);.l(1); }
		}
		.chapter{
			border-bottom: 1px solid #e2e2e2;padding: 30px 0 40px;.mb(40px);

			.lesson{
				.f(24px);.l(70px);

				span{ .f(28px);.fc(#1e1e1e);.pl(25px); }
			}
		}
		.lecturer{

			p{ border: none;.pb(0);.mb(0); }
			.name{ .fc(#1e1e1e);.mt(30px); }
			.helper{ .f(20px);.l(32px); }
		}
	}
</style>

<template>
	<div class="preview-course-box">
		<div class="poster"><img :src="detail.cover_url"></div>
		<div class="header">
			<div class="name">{{ detail.name }}</div>
			<div class="price">￥{{ detail.price }}</div>
			<div class="desc">总名额{{ detail.students_limit }}人 <span>开课时间：{{ ('' + detail.course_start).slice(0, 10) }}</span></div>
		</div>

		<div class="detail">
			<div class="brief box">
				<div class="title">课程简介</div>
				<p>{{ detail.brief }}</p>
			</div>

			<div class="objective box">
				<div class="title">课程目标</div>
				<p>{{ detail.objective }}</p>
			</div>

			<div class="chapter box">
				<div class="title">课程目录</div>
				<div class="item" v-for="lesson in detail.directory">
					<div class="lesson">{{ getOrder($index + 1) }}<span>{{ lesson.name }}</span></div>
					<ul>
						<li v-for="chapter in lesson.chapters">{{ chapter.name }}</li>
					</ul>
				</div>
			</div>

			<div class="lecturer box">
				<div class="title">讲师介绍</div>
				<div class="name">{{ detail.lecturer }}</div>
				<div class="helper">{{ detail.helper }}</div>
				<p class="brief">{{ detail.lecturer_brief }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	require('core/open/sweet/alert')

	return {
		props : ['courseid']
		, data: function(){
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
				var url = '/aj/api/course/preview'

				$.get(url, { id: id }, function(res){
					if(res.status_code == 200){
						mSelf.$set('detail', res.data)
					} else {
						sweetAlert({ title: '获取详情失败', type: 'error' })
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
