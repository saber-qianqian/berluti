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
			help="输入项（默认3个）"
			required
		></bs-input>
		<div class="ans_item" v-for="item in componentdata.answer" track-by="$index">
			<div class="input-group">
				<span class="input-group-addon">输入框数量</span>
				<input type="text" class="form-control" v-model="item">
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	var bs = require('core/open/strap/base').VueStrap
	return {
		components : {
			bsInput: bs.input
		}
		, props : ['componentdata', 'componentindex']
		, data : function(){
			return {}
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
				this.componentdata.answer.length = 1
				this.componentdata.answer[0] = this.componentdata.answer[0] || 3
			}
		}
	}
</script>
