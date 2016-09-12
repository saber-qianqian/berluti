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
			help="多选（默认四个）"
			required
		></bs-input>
		<div class="ans_item" v-for="item in componentdata.answer" track-by="$index">
			<div class="input-group">
				<span class="input-group-addon">答案{{ $index + 1 }}</span>
				<input type="text" class="form-control" v-model="item">
				<div class="input-group-addon" @click="removeItem($index)">
					<i class="glyphicon glyphicon-remove-sign"></i>
				</div>
			</div>
		</div>
		<button class="add_btn btn btn-default" @click="addItem"><span class="glyphicon glyphicon-plus"></span> 添加选项</button>
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
				this.componentdata.answer.length = 4
			}
		}
	}
</script>
