<style lang="less">
	.preview-survey-item-box{
		.ovh;.f(20px);.pl(20px);

		label input{ .mr(10px); }
		input,
		textarea{ padding: 5px 8px;outline: none; }

		input{ border: none; border-bottom: 1px solid #999; }
		.w200{ .w(200px);.i_block; }
		.star{ .fc(#f66); }

		.min{ .left; }
		.max{ .right; }
		.drag_wrap{ .w(240px); }
	}
</style>

<template>
	<div class="preview-survey-item-box">
		<div v-if="type == 'choice'" v-for="item in data" track-by="$index">
			<label><input type="radio" name="choice">{{ item }}</label>
		</div>

		<div v-if="type == 'multi-choice'" v-for="item in data" track-by="$index">
			<label><input type="checkbox">{{ item }}</label>
		</div>

		<div v-if="type == 'star'" v-for="item in data" track-by="$index">
			<span class="w200">{{ item }}</span><span v-for="i in 5" class="star glyphicon glyphicon-star"></span>
		</div>

		<div v-if="type == 'drag'">
			<div class="drag_wrap">
				<div class="min">{{ data[0] }}</div>
				<div class="max">{{ data[1] }}</div>
				<input type="range" min="data[0]" max="data[1]">
			</div>
		</div>

		<div v-if="type == 'survey-input'" v-for="item in +data[0]" track-by="$index">
			{{ ($index+1) + '.' }}<input type="text">
		</div>

		<div v-if="type == 'survey-textarea'" v-for="item in data" track-by="$index">
			<textarea></textarea>
		</div>
	</div>
</template>

<script>
	return {
		props: ['type', 'data']
	}
</script>
