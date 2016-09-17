<style lang="less">
	.component-chapter-create-box{
		.ovh;
	}
</style>

<template>
	<div class="component-chapter-create-box">
		<div class="table_name">{{ getChapterIndex(chapterindex+1) }}</div>
		<div class="form_box">
			<bs-input
				label="小节名"
				:value.sync="formdata.name"
			></bs-input>
			<bs-input
				label="小节简介"
				:value.sync="formdata.brief"
				type="textarea"
			></bs-input>
			<upload-time class="form-group" :multi="true" :value.sync="images" :time.sync="times" :brief.sync="time_briefs" :urls="image_urls" label="上传图片" :disabled="true"></upload-time>
			<upload-audio class="form-group" :brief.sync="audio_brief" :value.sync="audio_new" :name="audio_name" :url="audio_url" label="上传音频" :disabled="!!audio_url"></upload-audio>
		</div>
		<div class="line_tool_box">
			<div v-if="id" class="btn btn-info" @click="previewChapter"><span class="glyphicon glyphicon-zoom-in"></span> 预览小节</div>

			<div v-if="id" class="btn btn-primary" @click="saveCreate">保存小节</div>
			<div v-else class="btn btn-primary" @click="saveCreate">保存小节</div>

			<div v-if="id" class="btn btn-warning" @click="deleteItem">删除小节</div>
			<div v-if="id" class="btn btn-primary" @click="openCourseWare">管理已添加的附件</div>
		</div>

		<aside :show.sync="preview_show" placement="right" :header="getChapterIndex(chapterindex+1) + ':' + formdata.name" :width="800">
			<preview-chapter :chapterid="id"></preview-chapter>
		</aside>
	</div>
</template>

<script>
	var bs = require('core/open/strap/base').VueStrap
	var api = {
		'create': '/aj/api/chapter/create'
		, 'update': '/aj/api/chapter/update'
		, 'delete': '/aj/api/chapter/delete'
		, 'show': '/aj/api/chapter/show'
	}

	return {
		components : {
			bsInput: bs.input,
			uploadTime: require('uploadtime.vue'),
			uploadAudio: require('uploadaudio.vue'),

			previewChapter: require('preview/chapter.vue'),
			aside: bs.aside
		}
		, props : ['chapterindex', 'chapterdata', 'courseid']
		, data : function(){
			return {
				formdata: {
					course_id: ''
					, lesson_id: ''
					, name: ''
					, brief: ''
				}
				, audio_courseware: ''
				, audio_new: ''
				, audio_name: ''
				, audio_brief: ''
				, images: []
				, times: []
				, time_briefs: []
				, image_urls: []
				, images_courseware: []
				, images_entity: {}
				, old_images_courseware: []
				, audio_url: ''
				, id: ''

				, preview_show: false
			}
		}
		, methods : {
			openCourseWare: function(){
				window.location.href = '/manage/courseware/list/main?course_id=' + this.courseid
			}
			, saveCreate: function(){
				var mSelf = this

				var formdata = JSON.parse(JSON.stringify(mSelf.formdata))
				var url = api.create

				if(mSelf.id){
					formdata.id = mSelf.id
					url = api.update
				}

				var images = []
				for(var i in mSelf.images){
					if(mSelf.old_images_courseware.indexOf(mSelf.images[i]) == -1){
						images.push(mSelf.images[i] + '::' + (mSelf.times[i] || 0) + '::' + mSelf.time_briefs[i])
					}
				}
				formdata.images = images.join(',')
				if(!formdata.images) delete formdata.images


				if(mSelf.audio_new){
					if(!mSelf.audio_courseware){
						formdata.audio = mSelf.audio_new + '::' + mSelf.audio_brief
					}
				} else {
					delete formdata.audio
				}

				$.post(url, formdata, function(res) {
					if(res.status_code == 200){
						sweetAlert({ title: mSelf.id ? '保存成功' : '创建成功' }, function(){
							if(!mSelf.id){
								mSelf.id = res.data
								mSelf.chapterdata.status = 1
							}
						})
					}
				}, 'json')
			}
			, deleteItem: function(){
				var mSelf = this

				$.get(api.delete, { id: mSelf.id }, function(res){
					if(res.status_code == 200){
						sweetAlert({title: '删除成功'}, function(){
							mSelf.$dispatch('deleteChapter', mSelf.chapterindex)
						})
					} else {
						sweetAlert('删除失败', res.message, 'error')
					}
				}, 'json')
			}
			, getChapterIndex: function(index){
				var han = ['', "一", "二", "三", "四", "五", "六", "七", "八", "九"]
				var outOrder = ''
				var tmp = index / 10

				if(tmp >= 1){
					outOrder += (parseInt(tmp) > 1 ? han[parseInt(tmp)] : '') + '十'
				}
				if(index % 10){
					outOrder += han[index % 10]
				}

				return '第' + outOrder + '节'
			}

			, previewChapter: function(){
				this.preview_show = true
				this.$broadcast('previewShow', this.id)
			}
		}
		, created: function(){
			var mSelf = this
			var _chapter = mSelf.chapterdata.chapter

			for(var key in mSelf.formdata){
				if(_chapter[key]) mSelf.formdata[key] = _chapter[key]
			}

			if(_chapter.id) mSelf.id = _chapter.id

			$.each(_chapter.coursewares, function(i, courseware){
				if(courseware.entity_type == 2){
					mSelf.audio_courseware = courseware.id
					mSelf.audio_url = courseware.url
					mSelf.audio_name = courseware.name
					mSelf.audio_brief = courseware.brief
				} else {
					mSelf.image_urls.push(courseware.url)
					mSelf.images.push(courseware.id)
					mSelf.old_images_courseware.push(courseware.id)
					mSelf.times.push(courseware.epoch)
					mSelf.time_briefs.push(courseware.brief)
					mSelf.images_entity[courseware.id] = courseware.entity
				}
			})

		}
		, ready: function(){}
	}
</script>
