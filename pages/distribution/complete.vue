<template>
	<view class="com_body">
		<view class="title">
			<view class="top">
				餘氣撲滿
			</view>
			<view class="time">
				2021.04.19儲存餘氣
			</view>
			<view class="kg">
				1kg
			</view>
		</view>
		<view class="img">
			<image src="../../static/img/606.png" mode="widthFix"></image>
		</view>
		<view class="imgb">
			<image src="../../static/img/1602(1).png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.com_body {
		background: url(../../static/img/2.png) no-repeat;
		height: 100vh;
		background-size: 100% 100%;
	}

	.title {
		text-align: center;
		padding-top: 100rpx;

		.top {
			font-size: 56rpx;
			color: #C4C4C4;
			margin-bottom: 10rpx;
		}

		.time {
			color: #C4C4C4;
		}

		.kg {
			font-size: 56rpx;
			color: #66A4B3;
			padding: 20rpx 0;
		}
	}

	.img {
		text-align: center;
		margin: 50rpx 0;

		image {
			width: 180rpx;
			height: 180rpx;
		}
	}

	.imgb {
		text-align: center;

		image {
			width: 480rpx;
			height: 280rpx;
		}
	}
</style>
