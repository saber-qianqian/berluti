<style lang="less">
	.choice-box{
		.ovh;.mb(20px);

		.control-label{ .w(30px); }
		.input-group{ .w(300px);.ml(60px);.mb(10px); }
		.add_btn{ .ml(60px);}
	}
</style>

<template>
	<div class="choice-box">
		<bs-input
			:label="'Q' + componentindex"
			:value.sync="componentdata.name"
			help="拖拽（默认0-100）"
			required
		></bs-input>
		<div class="ans_item" v-for="item in componentdata.answer" track-by="$index">
			<div class="input-group">
				<span class="input-group-addon">{{ $index == 0 ? '最低值' : '最高值' }}</span>
				<input type="number" class="form-control" v-model="item">
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	require('core/open/sweet/alert')
	var bs = require('core/open/strap/base').VueStrap

	return {
		components : {
			bsInput: bs.input
		}
		, props : ['componentdata', 'componentindex']
		, data : function(){
			return {}
		}
		, watch: {
			'componentdata.answer': function(val){
				var mSelf = this

				if(+val[0] >= +val[1]){
					sweetAlert({ title: '最低值应小于最高值', type: 'warning' }, function(){
						mSelf.$set('componentdata.answer[0]', +mSelf.componentdata.answer[1] - 1)
					})
				}
			}
		}
		, methods : {
			addItem: function(){
				this.componentdata.answer.push('')
			}
			, removeItem: function(index){
				this.componentdata.answer.splice(index, 1)
			}
		}
		, created: function(){
			if(!this.componentdata.name){
				this.componentdata.answer.length = 2
				this.componentdata.answer[0] = this.componentdata.answer[0] || 0
				this.componentdata.answer[1] = this.componentdata.answer[1] || 100
			}
		}
	}
</script>
