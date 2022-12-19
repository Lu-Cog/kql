<template>
	<view>
		<view class="title">
			{{title}}
		</view>
		<view class="time">
			{{time}}
		</view>
		<view class="content" v-html="content">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				content:'',
				time:''
			};
		},
		onLoad(options) {
			this.title = options.title
			this.content = options.content
			this.time = options.time
		}
	}
</script>

<style lang="less">
.title{
	padding: 40rpx;
	text-align: center;
}
.time{
	padding: 0 40rpx 40rpx;
	text-align: center;
	font-size: 30rpx;
	color: #999;
}
.content{
	padding: 40rpx 60rpx;
	box-sizing: border-box;
	// text-indent: 2em;
}
</style>
